
import router from "./router";
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'
import service from "@/api/axios.js";
import GoogleLogin from 'vue3-google-login'
import ElementPlus from 'element-plus'
import {ElDialog} from "element-plus";
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'

// 导入语言包
import messages from './locales'

const storedLang = localStorage.getItem('lang');
const browserLang = (navigator.language || '').toLowerCase();
const resolvedBrowserLang = browserLang.startsWith('zh')
  ? 'zh-cn'
  : browserLang.startsWith('ms')
    ? 'ms'
    : 'en';
const initialLang = storedLang || resolvedBrowserLang || 'zh-cn';
if (!storedLang) {
  localStorage.setItem('lang', initialLang);
}
export const i18n = createI18n({
    locale: initialLang, //默认语言
    fallbackLocale: 'zh-cn',
    messages,
    globalInjection: true, //全局注入$t函数
});

// Ensure named interpolation still works even if runtime compiler is missing in production
const rawT = i18n.global.t.bind(i18n.global);
i18n.global.t = (key, params) => {
  const msg = rawT(key, params);
  if (!params || typeof msg !== 'string') return msg;
  return Object.keys(params).reduce((text, k) => {
    return text.replace(`{${k}}`, params[k]);
  }, msg);
};



let clientId = '554967085940-o3uql5embk68sm0ihlh466ho3qkqsv26.apps.googleusercontent.com'

const app = createApp(App)
app.component('SvgIcon', svgIcon)
app.config.globalProperties.$http = service
app.use(ElementPlus)
app.use(ElDialog)
app.use(GoogleLogin, {
    clientId: clientId,
})
app.use(router)
app.use(i18n)
app.mount('#app')
