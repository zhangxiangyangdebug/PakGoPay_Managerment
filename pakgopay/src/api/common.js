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
        {key: 'merchantName', title: '商户名称'},
        {key: 'accountName', title: '商户账号'},
        {key: 'walletAddr', title: '提现账号'},
        {key: 'status', title: '账号状态'},
        {key: 'createTime', title: '录入时间'},
        {key: 'createBy', title: '创建人'},
    ]
    return Merchant_Account_Title
}

export function getAgentInfoTitle(i18n) {
    const Agent_Info_Title = [
        {key: "agentName", title: "代理名称"},
        {key: "agentAccountName", title: "代理账号"},
        {key: "channelInfos", title: "代理渠道信息"},
        {key: "parentAgentName", title: "上级代理名称"},
        {key: "parentAccountName", title: "上级代理账号"},
        {key: "parentChannelInfos", title: "上级代理渠道信息"},
        {key: "level", title: "代理层级"},
        {key: "status", title: "代理状态"},
        {key: "payRate", title: "代付百分比费率"},
        {key: "payFixedFee", title: "代付固定费用"},
        {key: "payMinFee", title: "代付单笔最小金额"},
        {key: "payMaxFee", title: "单笔最大金额"},
        {key: "collectionRate", title: "代收百分比费率"},
        {key: "collectionFixedFee", title: "代收固定费用"},
        {key: "collectionMaxFee", title: "代收单笔最大费用"},
        {key: "collectionMinFee", title: "代收单笔最小金额"},
    ]
    return Agent_Info_Title
}

export function getAgentAccountTitle(i18n) {
    const Agent_Account_Title = [
        {key: "agentName", title: '代理名称'},
        {key: "accountName", title: '代理账号'},
        {key: "walletAddr", title: '代理提现账户'},
        {key: "status", title: '状态'},
        {key: "createTime", title: '创建时间'},
        {key: "createBy", title: '创建人'},
    ]
    return Agent_Account_Title
}

export function getPaymentListTitle(i18n) {
    const Payment_List_Title = [
        {key: 'paymentNo', title: '通道编号'},
        {key: 'paymentName', title: '通道名称'},
        {key: 'status', title: '通道状态'},
        {key: 'isThird', title: '是否支持三方支付'},
        {key: 'supportType', title: '支付类型'},
        {key: 'enableTimePeriod', title: '可用时间'},
        {key: 'paymentType', title: '通道类型'},
        {key: 'isCheckoutCounter', title: '是否支持收银台'},
        {key: 'collectionDailyLimit', title: '代收单日限额'},
        {key: 'collectionMonthlyLimit', title: '代收月限额'},
        {key: 'payDailyLimit', title: '代付日限额'},
        {key: 'payMonthlyLimit', title: '代付月限额'},
        {key: 'paymentRequestPayUrl', title: '代付api地址'},
        {key: 'paymentRequestCollectionUrl', title: '代收api地址'},
        {key: 'paymentCollectionRate', title: '通道代收费率'},
        {key: 'paymentPayRate', title: '通道代付费率'},
        {key: 'paymentCheckPayUrl', title: '代付订单校验地址'},
        {key: 'paymentPayRate', title: '通道代付费率'},
        {key: 'paymentCheckCollectionUrl', title: '代收订单校验地址'},
        {key: 'collectionCallbackAddr', title: '代收回调地址'},
        {key: 'payCallbackAddr', title: '代付回调地址'},
        {key: 'checkoutCounterUrl', title: '收银台地址'},
        {key: 'currency', title: '币种'},
        {key: 'paymentMaxAmount', title: '最大金额'},
        {key: 'paymentMinAmount', title: '最小金额'},
        {key: 'bankName', title: '银行名称'},
        {key: 'bankAccount', title: '银行账号'},
        {key: 'bankUserName', title: '银行用户名'},
    ]
    return Payment_List_Title
}

export function getChannelListTitle(i18n) {
    const ChannelList_Title = [
        {key: 'channelName', title: '渠道名称'},
        {key: 'collectPayment', title: '代收通道列表'},
        {key: 'payPayment', title: '代付通道列表'},
        {key: 'status', title: '状态'},
        {key: 'currency', title: '币种'},
        {key: 'createTime', title: '创建时间'},
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
        text: 'loading...',           // 加载文字
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

    if (res.status === 200) {
        if (res.data.type === 'application/json') {
            const blobData = res.data;
            const jsonData = JSON.parse(await blobData.text())
            if (jsonData.code !== 0) {
                that.$notify({
                    title: 'Failed',
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
                title: 'Success',
                message: 'export data success',
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
                title: 'Error',
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
    if (!orderStatus) {
        return '-'
    } else if (orderStatus === '0') {
        return '待处理'
    } else if (orderStatus === '1') {
        return '处理中'
    } else if (orderStatus === '2') {
        return '成功'
    } else if (orderStatus === '3') {
        return '失败'
    } else if (orderStatus === '4') {
        return '超时'
    } else if (orderStatus === '5') {
        return '已取消'
    } else {
        return '-'
    }
}

export function getOrderStatusOptions() {
    const options = [
        {
            value: '0',
            label: '待处理'
        },
        {
            value: '1',
            label: '处理中'
        },
        {
            value: '2',
            label: '成功'
        },
        {
            value: '3',
            label: '失败'
        },
        {
            value: '4',
            label: '超时'
        },
        {
            value: '5',
            label: '已取消'
        }
    ]
    return options
}

export function getCallBackStatus(callBackStatus) {
    if (!callBackStatus) {
        return '-'
    } else if (callBackStatus === '1') {
        return '已回调'
    } else if (callBackStatus === '2') {
        return '回调失败'
    } else if (callBackStatus === '3') {
        return '待回调'
    } else {
        return '-'
    }
}
