# 使用 nginx 作为基础镜像
FROM nginx:alpine

# 删除默认的 nginx 静态文件
#RUN rm -rf /usr/share/nginx/html/*

# 将打包好的 dist 文件夹拷贝到 nginx 静态目录
COPY dist/ nginx2:/usr/share/nginx/html/

# 拷贝自定义 nginx 配置（可选，如果需要路由支持）
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]