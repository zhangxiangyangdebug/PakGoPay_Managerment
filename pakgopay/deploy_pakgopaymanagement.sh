#!/usr/bin/env bash
set -euo pipefail

# ===== configurable =====
REMOTE_HOST="47.84.192.179"
REMOTE_USER="root"
REMOTE_SSH="${REMOTE_USER}@${REMOTE_HOST}"
SSH_OPTS="-o ControlMaster=auto -o ControlPersist=10m -o ControlPath=~/.ssh/cm-%r@%h:%p"
IMAGE_NAME="pakgopaymanagement:latest"
CONTAINER_NAME="pakgopaymanagement"
NGINX_CONTAINER="pakgopay-nginx"
PORT_MAP="127.0.0.1:5173:80"
VITE_MODE="${VITE_MODE:-dev}"
PLATFORM="${PLATFORM:-linux/amd64}"
# ========================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -f package.json ]; then
  echo "ERROR: package.json not found in $SCRIPT_DIR" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: docker not found" >&2
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1 || ! command -v scp >/dev/null 2>&1; then
  echo "ERROR: ssh/scp not found" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm not found" >&2
  exit 1
fi

# prompt for Turnstile site key
read -r -p "Enter VITE_TURNSTILE_SITE_KEY: " VITE_TURNSTILE_SITE_KEY
if [ -z "$VITE_TURNSTILE_SITE_KEY" ]; then
  echo "ERROR: VITE_TURNSTILE_SITE_KEY is required" >&2
  exit 1
fi

# 1) build dist locally
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
  npm install
fi
VITE_TURNSTILE_SITE_KEY="$VITE_TURNSTILE_SITE_KEY" npm run build -- --mode "$VITE_MODE"

if [ ! -d "$SCRIPT_DIR/dist" ]; then
  echo "ERROR: dist not found after build in $SCRIPT_DIR/dist" >&2
  exit 1
fi

# 2) build image (nginx runtime) and push to remote via docker load
#    Note: Dockerfile should copy dist into /usr/share/nginx/html
if ! docker buildx inspect >/dev/null 2>&1; then
  docker buildx create --use >/dev/null
fi

docker buildx build --platform "$PLATFORM" -t "$IMAGE_NAME" --load .

# Save locally then scp to avoid ssh pipe interruptions
IMAGE_TAR="/tmp/${IMAGE_NAME//[:\/]/_}.tar"
docker save -o "$IMAGE_TAR" "$IMAGE_NAME"
# Remove old image on remote before loading the new one
ssh $SSH_OPTS "$REMOTE_SSH" "docker image rm -f $IMAGE_NAME >/dev/null 2>&1 || true"
scp $SSH_OPTS "$IMAGE_TAR" "$REMOTE_SSH:/tmp/pakgopay_image.tar"
ssh $SSH_OPTS "$REMOTE_SSH" "docker load -i /tmp/pakgopay_image.tar && rm -f /tmp/pakgopay_image.tar"
rm -f "$IMAGE_TAR"

# 3) upload dist to nginx container path
ssh $SSH_OPTS "$REMOTE_SSH" "mkdir -p /tmp/pakgopay_dist && \
  docker exec $NGINX_CONTAINER sh -c 'mkdir -p /usr/share/nginx/html/dist'"
scp -r $SSH_OPTS "$SCRIPT_DIR/dist/." "$REMOTE_SSH:/tmp/pakgopay_dist/"
ssh $SSH_OPTS "$REMOTE_SSH" "docker exec $NGINX_CONTAINER sh -c 'rm -rf /usr/share/nginx/html/dist/*' && \
  docker cp /tmp/pakgopay_dist/. $NGINX_CONTAINER:/usr/share/nginx/html/dist/ && \
  rm -rf /tmp/pakgopay_dist"

# 4) stop existing container
ssh $SSH_OPTS "$REMOTE_SSH" "docker rm -f $CONTAINER_NAME >/dev/null 2>&1 || true"

# 5) run new container
ssh $SSH_OPTS "$REMOTE_SSH" "docker run -d --name $CONTAINER_NAME -p $PORT_MAP $IMAGE_NAME"

# 6) reload + restart nginx container
ssh $SSH_OPTS "$REMOTE_SSH" "docker exec $NGINX_CONTAINER nginx -s reload || true"
ssh $SSH_OPTS "$REMOTE_SSH" "docker restart $NGINX_CONTAINER"

echo "Done. VITE_MODE=$VITE_MODE PLATFORM=$PLATFORM"
