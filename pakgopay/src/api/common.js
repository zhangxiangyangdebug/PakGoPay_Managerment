export function isValidIP(ipList) {
    ipList.replaceAll(' ','')
    const ips = ipList.split(',')
    for (let i = 0; i < ips.length; i++) {
        let ip = ips[i]
        if (isValidIPv4(ip) || isValidIPv6(ip)) {
            return true;
        } else {
            return false;
        }
    }
}

export function getFormateDate(ts) {
    const d = new Date(ts * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function getTimeFromTimestamp(timestamp) {
    if (!timestamp) {
        return 'No data';
    }
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dayjs.unix(timestamp*1000).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
}
export function getDateFromTimestamp(timestamp) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dayjs.unix(timestamp*1000).tz(timeZone).format('YYYY-MM-DD');
}

function isValidIPv4(ip) {
    const IPV4_REGEX =
        /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
    return IPV4_REGEX.test(ip);
}

function isValidIPv6(ip) {
    const IPV6_REGEX =
        /^((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2}|(?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3}|(?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4}|(?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:))$/;
    return IPV6_REGEX.test(ip);
}

export function loadingBody(that, loadingClassName) {
    const loadingInstance = that.$loading({
        lock: true,       // 设置进入加载
        text: 'loading...',           // 加载文字
        // spinner: 'el-icon-loading',
        // background: 'rgba(255, 255, 255, 0.7)',
        target: document.querySelector('.'+loadingClassName).querySelector('.el-table__body') // 指定加载动画覆盖的DOM节点
    })
    return loadingInstance
}

export function getTodayStartTimestamp() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.floor(now.getTime() / 1000);
}
