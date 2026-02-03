import { i18n } from '@/main.js';

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

export function getMerchantReportTitle(i18n) {
    const Merchant_Report_Title = [
        {key: "merchantName", title: i18n.$t('exportReportTitle.merchantName')},
        {key: "orderQuantity", title: i18n.$t('exportReportTitle.orderQuantity')},
        {key: "orderSuccessRate", title: i18n.$t('exportReportTitle.orderSuccessRate')},
        {key:"successQuantity", title: i18n.$t('exportReportTitle.successQuantity')},
        {key:"merchantFee", title: i18n.$t('exportReportTitle.merchantFee')},
        {key:"agent1Fee", title:i18n.$t('exportReportTitle.agent1Fee')},
        {key:"agent2Fee", title:i18n.$t('exportReportTitle.agent2Fee')},
        {key:"agent3Fee", title:i18n.$t('exportReportTitle.agent3Fee')},
        {key:"orderProfit", title:i18n.$t('exportReportTitle.orderProfit')},
        {key:"currency", title:i18n.$t('exportReportTitle.currency')},
        {key:"timeDate", title:i18n.$t('exportReportTitle.timeDate')},
    ]
    return Merchant_Report_Title
}

export function getChannelReportTitle(i18n) {
    const Channel_Report_Title = [
        {key:"channelName", title: i18n.$t('exportReportTitle.channelName')},
        {key:"orderQuantity", title: i18n.$t('exportReportTitle.orderQuantity')},
        {key:"orderSuccessRate", title: i18n.$t('exportReportTitle.orderSuccessRate')},
        {key:"failedQuantity", title: i18n.$t('exportReportTitle.failedQuantity')},
        {key:"successQuantity", title: i18n.$t('exportReportTitle.successQuantity')},
        {key:"merchantFee", title: i18n.$t('exportReportTitle.merchantFee')},
        {key:"orderProfit", title: i18n.$t('exportReportTitle.orderProfit')},
        {key:"currency", title: i18n.$t('exportReportTitle.currency')},
        {key:"timeDate", title: i18n.$t('exportReportTitle.timeDate')},
    ]
    return Channel_Report_Title
}

export function getAgentReportTitle(i18n) {
    const Agent_Report_Title = [
        {key:"agentName", title: i18n.$t('exportReportTitle.agentName')},
        {key:"orderQuantity", title: i18n.$t('exportReportTitle.orderQuantity')},
        {key:"orderSuccessRate", title: i18n.$t('exportReportTitle.orderSuccessRate')},
        {key:"failedQuantity", title: i18n.$t('exportReportTitle.failedQuantity')},
        {key:"successQuantity", title: i18n.$t('exportReportTitle.successQuantity')},
        {key:"commission", title: i18n.$t('exportReportTitle.commission')},
        {key:"currency", title: i18n.$t('exportReportTitle.currency')},
        {key:"timeDate", title: i18n.$t('exportReportTitle.timeDate')},
    ]
    return Agent_Report_Title
}

export function getCurrencyReportTitle(i18n) {
    const Currency_Report_Title = [
        {key: "currency", title: i18n.$t('exportReportTitle.currency')},
        {key: "orderQuantity", title: i18n.$t('exportReportTitle.orderQuantity')},
        {key: "orderSuccessRate", title: i18n.$t('exportReportTitle.orderSuccessRate')},
        {key: "failedQuantity", title: i18n.$t('exportReportTitle.failedQuantity')},
        {key: "successQuantity", title: i18n.$t('exportReportTitle.successQuantity')},
        {key: "merchantFee", title: i18n.$t('exportReportTitle.merchantFee')},
        {key: "orderProfit", title: i18n.$t('exportReportTitle.orderProfit')},
        {key:'orderBalance', title: i18n.$t('exportReportTitle.orderBalance')},
        {key:"timeDate", title: i18n.$t('exportReportTitle.timeDate')},
    ]
    return Currency_Report_Title
}

export function getPaymentReportTitle(i18n) {
    const Payment_Report_Title = [
        {key:"paymentName", title: i18n.$t('exportReportTitle.paymentName')},
        {key:"paymentNo", title: i18n.$t('exportReportTitle.paymentNo')},
        {key:"orderQuantity", title: i18n.$t('exportReportTitle.orderQuantity')},
        {key:"orderSuccessRate", title: i18n.$t('exportReportTitle.orderSuccessRate')},
        {key:"failedQuantity", title: i18n.$t('exportReportTitle.failedQuantity')},
        {key:"successQuantity", title: i18n.$t('exportReportTitle.successQuantity')},
        {key:"merchantFee", title: i18n.$t('exportReportTitle.merchantFee')},
        {key:"orderProfit", title: i18n.$t('exportReportTitle.orderProfit')},
        {key:"orderBalance", title: i18n.$t('exportReportTitle.orderBalance')},
        {key:"currency", title: i18n.$t('exportReportTitle.currency')},
        {key:"timeDate", title: i18n.$t('exportReportTitle.timeDate')},
    ]
    return Payment_Report_Title
}

export function getMerchantAccountTitle(i18n) {
    const Merchant_Account_Title = [
        {key: 'merchantName', title: i18n.$t('exportTitle.merchantAccount.merchantName')},
        {key: 'accountName', title: i18n.$t('exportTitle.merchantAccount.accountName')},
        {key: 'walletAddr', title: i18n.$t('exportTitle.merchantAccount.walletAddr')},
        {key: 'status', title: i18n.$t('exportTitle.merchantAccount.status')},
        {key: 'createTime', title: i18n.$t('exportTitle.merchantAccount.createTime')},
        {key: 'createBy', title: i18n.$t('exportTitle.merchantAccount.createBy')},
    ]
    return Merchant_Account_Title
}

export function getAgentInfoTitle(i18n) {
    const Agent_Info_Title = [
        {key: "agentName", title: i18n.$t('exportTitle.agentInfo.agentName')},
        {key: "agentAccountName", title: i18n.$t('exportTitle.agentInfo.agentAccountName')},
        {key: "channelInfos", title: i18n.$t('exportTitle.agentInfo.channelInfos')},
        {key: "parentAgentName", title: i18n.$t('exportTitle.agentInfo.parentAgentName')},
        {key: "parentAccountName", title: i18n.$t('exportTitle.agentInfo.parentAccountName')},
        {key: "parentChannelInfos", title: i18n.$t('exportTitle.agentInfo.parentChannelInfos')},
        {key: "level", title: i18n.$t('exportTitle.agentInfo.level')},
        {key: "status", title: i18n.$t('exportTitle.agentInfo.status')},
        {key: "payRate", title: i18n.$t('exportTitle.agentInfo.payRate')},
        {key: "payFixedFee", title: i18n.$t('exportTitle.agentInfo.payFixedFee')},
        {key: "payMinFee", title: i18n.$t('exportTitle.agentInfo.payMinFee')},
        {key: "payMaxFee", title: i18n.$t('exportTitle.agentInfo.payMaxFee')},
        {key: "collectionRate", title: i18n.$t('exportTitle.agentInfo.collectionRate')},
        {key: "collectionFixedFee", title: i18n.$t('exportTitle.agentInfo.collectionFixedFee')},
        {key: "collectionMaxFee", title: i18n.$t('exportTitle.agentInfo.collectionMaxFee')},
        {key: "collectionMinFee", title: i18n.$t('exportTitle.agentInfo.collectionMinFee')},
    ]
    return Agent_Info_Title
}

export function getAgentAccountTitle(i18n) {
    const Agent_Account_Title = [
        {key: "agentName", title: i18n.$t('exportTitle.agentAccount.agentName')},
        {key: "accountName", title: i18n.$t('exportTitle.agentAccount.accountName')},
        {key: "walletAddr", title: i18n.$t('exportTitle.agentAccount.walletAddr')},
        {key: "status", title: i18n.$t('exportTitle.agentAccount.status')},
        {key: "createTime", title: i18n.$t('exportTitle.agentAccount.createTime')},
        {key: "createBy", title: i18n.$t('exportTitle.agentAccount.createBy')},
    ]
    return Agent_Account_Title
}

export function getPaymentListTitle(i18n) {
    const Payment_List_Title = [
        {key: 'paymentNo', title: i18n.$t('exportTitle.paymentList.paymentNo')},
        {key: 'paymentName', title: i18n.$t('exportTitle.paymentList.paymentName')},
        {key: 'status', title: i18n.$t('exportTitle.paymentList.status')},
        {key: 'isThird', title: i18n.$t('exportTitle.paymentList.isThird')},
        {key: 'supportType', title: i18n.$t('exportTitle.paymentList.supportType')},
        {key: 'enableTimePeriod', title: i18n.$t('exportTitle.paymentList.enableTimePeriod')},
        {key: 'paymentType', title: i18n.$t('exportTitle.paymentList.paymentType')},
        {key: 'isCheckoutCounter', title: i18n.$t('exportTitle.paymentList.isCheckoutCounter')},
        {key: 'collectionDailyLimit', title: i18n.$t('exportTitle.paymentList.collectionDailyLimit')},
        {key: 'collectionMonthlyLimit', title: i18n.$t('exportTitle.paymentList.collectionMonthlyLimit')},
        {key: 'payDailyLimit', title: i18n.$t('exportTitle.paymentList.payDailyLimit')},
        {key: 'payMonthlyLimit', title: i18n.$t('exportTitle.paymentList.payMonthlyLimit')},
        {key: 'paymentRequestPayUrl', title: i18n.$t('exportTitle.paymentList.paymentRequestPayUrl')},
        {key: 'paymentRequestCollectionUrl', title: i18n.$t('exportTitle.paymentList.paymentRequestCollectionUrl')},
        {key: 'paymentCollectionRate', title: i18n.$t('exportTitle.paymentList.paymentCollectionRate')},
        {key: 'paymentPayRate', title: i18n.$t('exportTitle.paymentList.paymentPayRate')},
        {key: 'paymentCheckPayUrl', title: i18n.$t('exportTitle.paymentList.paymentCheckPayUrl')},
        {key: 'paymentPayRate', title: i18n.$t('exportTitle.paymentList.paymentPayRate')},
        {key: 'paymentCheckCollectionUrl', title: i18n.$t('exportTitle.paymentList.paymentCheckCollectionUrl')},
        {key: 'collectionCallbackAddr', title: i18n.$t('exportTitle.paymentList.collectionCallbackAddr')},
        {key: 'payCallbackAddr', title: i18n.$t('exportTitle.paymentList.payCallbackAddr')},
        {key: 'checkoutCounterUrl', title: i18n.$t('exportTitle.paymentList.checkoutCounterUrl')},
        {key: 'currency', title: i18n.$t('exportTitle.paymentList.currency')},
        {key: 'paymentMaxAmount', title: i18n.$t('exportTitle.paymentList.paymentMaxAmount')},
        {key: 'paymentMinAmount', title: i18n.$t('exportTitle.paymentList.paymentMinAmount')},
        {key: 'bankName', title: i18n.$t('exportTitle.paymentList.bankName')},
        {key: 'bankAccount', title: i18n.$t('exportTitle.paymentList.bankAccount')},
        {key: 'bankUserName', title: i18n.$t('exportTitle.paymentList.bankUserName')},
    ]
    return Payment_List_Title
}

export function getChannelListTitle(i18n) {
    const ChannelList_Title = [
        {key: 'channelName', title: i18n.$t('exportTitle.channelList.channelName')},
        {key: 'collectPayment', title: i18n.$t('exportTitle.channelList.collectPayment')},
        {key: 'payPayment', title: i18n.$t('exportTitle.channelList.payPayment')},
        {key: 'status', title: i18n.$t('exportTitle.channelList.status')},
        {key: 'currency', title: i18n.$t('exportTitle.channelList.currency')},
        {key: 'createTime', title: i18n.$t('exportTitle.channelList.createTime')},
    ]
    return ChannelList_Title
}

export function getFormateDate(ts) {
    const d = new Date(ts * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function getFormateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getFormateTimeByTimeBystamp(ts) {
    if (!ts || !ts.isNumber) {
        return '-';
    }
    let validTime = null
    try {
        const date = new Date(ts * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        validTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } catch (err) {
        return '-'
    }
    return validTime
}

export function getTimeFromTimestamp(timestamp) {
    if (!timestamp) {
        return '-';
    }
    try {
        const ms = normalizeTimestampToMs(timestamp);
        if (!ms) {
            return '-';
        }
        const offsetMinutes = getTimeZoneOffsetMinutes();
        const date = offsetMinutes === null ? new Date(ms) : new Date(ms + offsetMinutes * 60 * 1000);
        return formatDateTime(date, offsetMinutes !== null);
    } catch (e) {
        return '-';
    }
}

export function getDateFromTimestamp(timestamp) {
    try {
        const ms = normalizeTimestampToMs(timestamp);
        if (!ms) {
            return '-';
        }
        const offsetMinutes = getTimeZoneOffsetMinutes();
        const date = offsetMinutes === null ? new Date(ms) : new Date(ms + offsetMinutes * 60 * 1000);
        return formatDate(date, offsetMinutes !== null);
    } catch (e) {
        return '-';
    }
}

function normalizeTimestampToMs(timestamp) {
    const num = Number(timestamp);
    if (!Number.isFinite(num)) {
        return null;
    }
    return num > 1e12 ? num : num * 1000;
}

function getTimeZoneOffsetMinutes() {
    const timeZoneStr = localStorage.getItem('timeZone');
    if (!timeZoneStr) {
        return null;
    }
    const match = String(timeZoneStr).match(/UTC\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?/i);
    if (!match) {
        return null;
    }
    const sign = match[1] === '-' ? -1 : 1;
    const hours = parseInt(match[2], 10);
    const minutes = match[3] ? parseInt(match[3], 10) : 0;
    return sign * (hours * 60 + minutes);
}

function formatDateTime(date, useUTC) {
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = pad2((useUTC ? date.getUTCMonth() : date.getMonth()) + 1);
    const day = pad2(useUTC ? date.getUTCDate() : date.getDate());
    const hour = pad2(useUTC ? date.getUTCHours() : date.getHours());
    const minute = pad2(useUTC ? date.getUTCMinutes() : date.getMinutes());
    const second = pad2(useUTC ? date.getUTCSeconds() : date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function formatDate(date, useUTC) {
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = pad2((useUTC ? date.getUTCMonth() : date.getMonth()) + 1);
    const day = pad2(useUTC ? date.getUTCDate() : date.getDate());
    return `${year}-${month}-${day}`;
}

function pad2(num) {
    return String(num).padStart(2, '0');
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
    const container = document.querySelector('.' + loadingClassName);
    const target = container
        ? (container.querySelector('.el-table__body-wrapper') || container.querySelector('.el-table__body') || container)
        : undefined;
    const loadingInstance = that.$loading({
        lock: true,       // 设置进入加载
        text: i18n.global.t('common.loading'),           // 加载文字
        // spinner: 'el-icon-loading',
        // background: 'rgba(255, 255, 255, 0.7)',
        target: target // 指定加载动画覆盖的DOM节点
    })
    return loadingInstance
}

export function getTodayStartTimestamp() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.floor(now.getTime() / 1000);
}

export async function exportExcel(res, fileName, that) {
    const t = i18n?.global?.t ? i18n.global.t.bind(i18n.global) : (key) => key;

    if (res.status === 200) {
        if (res.data.type === 'application/json') {
            const blobData = res.data;
            const jsonData = JSON.parse(await blobData.text())
            if (jsonData.code !== 0) {
                that.$notify({
                    title: t('common.error'),
                    message: jsonData.message,
                    duration: 3000,
                    type: 'error',
                    position: 'bottom-right',
                })
            }
        } else {
            const blob = new Blob([res.data], {type: "application/vnd.ms-excel;charset=UTF-8"});
            console.log('blob---'+ blob.size)
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName)
            } else {
                const downLoadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob);
                downLoadElement.href = href;
                downLoadElement.download = fileName;
                document.body.appendChild(downLoadElement);
                downLoadElement.click();
                document.body.removeChild(downLoadElement);
                window.URL.revokeObjectURL(href);
            }
            that.$notify({
                title: t('common.success'),
                message: t('common.exportSuccess'),
                duration: 3000,
                type: 'success',
                position: 'bottom-right',
            })
        }
    } else {
        if (res.data.type === 'application/json') {
            const blobData = res.data;
            const jsonData = JSON.parse(await blobData.text())
            that.$notify({
                title: t('common.error'),
                message: jsonData.message,
                duration: 3000,
                type: 'error',
                position: 'bottom-right',
            })
        }

    }
    this.filterbox.orderType = '0'

}

export function getOrderStatus(orderStatus) {
    const t = i18n?.global?.t ? i18n.global.t.bind(i18n.global) : (key) => key;
    if (!orderStatus) {
        return '-'
    } else if (orderStatus === '0') {
        return t('orderCommon.status.pending')
    } else if (orderStatus === '1') {
        return t('orderCommon.status.processing')
    } else if (orderStatus === '2') {
        return t('orderCommon.status.success')
    } else if (orderStatus === '3') {
        return t('orderCommon.status.failed')
    } else if (orderStatus === '4') {
        return t('orderCommon.status.timeout')
    } else if (orderStatus === '5') {
        return t('orderCommon.status.cancelled')
    } else {
        return '-'
    }
}

export function getOrderStatusOptions() {
    const t = i18n?.global?.t ? i18n.global.t.bind(i18n.global) : (key) => key;
    const options = [
        {
            value: '0',
            label: t('orderCommon.status.pending')
        },
        {
            value: '1',
            label: t('orderCommon.status.processing')
        },
        {
            value: '2',
            label: t('orderCommon.status.success')
        },
        {
            value: '3',
            label: t('orderCommon.status.failed')
        },
        {
            value: '4',
            label: t('orderCommon.status.timeout')
        },
        {
            value: '5',
            label: t('orderCommon.status.cancelled')
        }
    ]
    return options
}

export function getCallBackStatus(callBackStatus) {
    const t = i18n?.global?.t ? i18n.global.t.bind(i18n.global) : (key) => key;
    if (!callBackStatus) {
        return '-'
    } else if (callBackStatus === '1') {
        return t('orderCommon.callback.success')
    } else if (callBackStatus === '2') {
        return t('orderCommon.callback.failed')
    } else if (callBackStatus === '3') {
        return t('orderCommon.callback.pending')
    } else {
        return '-'
    }
}
