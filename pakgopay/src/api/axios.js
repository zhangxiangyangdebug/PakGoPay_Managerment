import axios from 'axios'
import { ElNotification } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import router from "@/router/index.js";
import { i18n } from '@/main.js';
const service = axios.create({
    //baseURL: '/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'text/plain'
    }
});

const refreshClient = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'text/plain'
    }
});

let isRefreshing = false;
let refreshQueue = [];
let lastRateLimitNotifyAt = 0;
const RATE_LIMIT_NOTIFY_COOLDOWN_MS = 3000;

function buildRateLimitedData(url) {
    if (!url) return JSON.stringify({});
    if (url.includes('/CurrencyTypeManagement/currencyTypeInfo')) {
        return JSON.stringify({ currencyTypeDTOList: [] });
    }
    return JSON.stringify({});
}

function notifyRateLimitedOnce(message) {
    const t = i18n?.global?.t ? i18n.global.t.bind(i18n.global) : (key) => key;
    const content = message || t('common.rateLimitMessage');
    const now = Date.now();
    if (now - lastRateLimitNotifyAt < RATE_LIMIT_NOTIFY_COOLDOWN_MS) {
        return;
    }
    lastRateLimitNotifyAt = now;
    ElNotification({
        title: 'warn',
        message: content,
        closeIcon: CloseBold,
        type: 'warning',
        position: 'bottom-right',
        offset: 20
    });
}

function processRefreshQueue(error, token) {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    refreshQueue = [];
}

function isLoginRoute() {
    const currentPath = router.currentRoute?.value?.path;
    const currentMeta = router.currentRoute?.value?.meta;
    if (currentPath === "/web/login" || currentMeta?.showBar) {
        return true;
    }
    return window.location?.pathname === "/web/login";
}

function clearAuthAndRedirect() {
    localStorage.removeItem("token");
    localStorage.removeItem("menu")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
    localStorage.removeItem("currentPath")
    localStorage.removeItem("roleName")
    router.push("/web/login");
}

service.interceptors.request.use(config => {
    return config;
}, error => {
    console.info("some error happened when request interceptors", error)
    return Promise.reject(error);
})

service.interceptors.response.use(response => {
    if (response?.status === 200 && (response?.data?.rateLimited === true || response?.data?.code === 429) && !response?.data?.rateLimitedNotified) {
        notifyRateLimitedOnce();
    }
    return response;
}, error => {
    if (error.response && error.response.status === 429) {
        notifyRateLimitedOnce();
        const fallbackData = buildRateLimitedData(error.config?.url);
        return Promise.resolve({
            status: 200,
            data: {
                code: 0,
                rateLimited: true,
                rateLimitedNotified: true,
                message: i18n?.global?.t ? i18n.global.t('common.rateLimitMessage') : '请求过于频繁，请稍后重试',
                data: fallbackData
            }
        });
    }
    if (error.response && error.response.status === 401) {
        if (error.config && error.config.skip401Handler) {
            return Promise.reject(error);
        }
        if (isLoginRoute()) {
            return Promise.reject(error);
        }
        if (error.config && error.config._retry) {
            return Promise.reject(error);
        }
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            ElNotification({
                title: 'warn',
                message: 'login expired, please login again',
                closeIcon: CloseBold,
                type: 'error',
                position: 'bottom-right',
                offset: 500
            })
            clearAuthAndRedirect();
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            }).then((token) => {
                const retryConfig = { ...error.config };
                retryConfig.headers = retryConfig.headers || {};
                retryConfig.headers.Authorization = `Bearer ${token}`;
                return service(retryConfig);
            });
        }

        isRefreshing = true;
        error.config._retry = true;
        return refreshClient.get('/api/pakGoPay/server/Login/refreshToken', {
            params: { freshToken: refreshToken }
        }).then((res) => {
            if (res?.data === 'refresh' || res?.data?.code !== 0) {
                ElNotification({
                    title: 'warn',
                    message: 'login expired, please login again',
                    closeIcon: CloseBold,
                    type: 'error',
                    position: 'bottom-right',
                    offset: 500
                })
                clearAuthAndRedirect();
                processRefreshQueue(error, null);
                return Promise.reject(error);
            }

            if (res?.data?.code === 0) {
                const token = res?.data?.token || res?.data?.data?.token;
                const newRefreshToken = res?.data?.refreshToken || res?.data?.data?.refreshToken;
                if (token) {
                    localStorage.setItem("token", token);
                }
                if (newRefreshToken) {
                    localStorage.setItem("refreshToken", newRefreshToken);
                }
                processRefreshQueue(null, token);
                const retryConfig = { ...error.config };
                retryConfig.headers = retryConfig.headers || {};
                retryConfig.headers.Authorization = `Bearer ${token}`;
                return service(retryConfig);
            }

            return Promise.reject(error);
        }).catch((err) => {
            ElNotification({
                title: 'warn',
                message: 'login expired, please login again',
                closeIcon: CloseBold,
                type: 'error',
                position: 'bottom-right',
                offset: 500
            })
            clearAuthAndRedirect();
            processRefreshQueue(err, null);
            return Promise.reject(err);
        }).finally(() => {
            isRefreshing = false;
        });
    }
    return Promise.reject(error);
})

export default service;
