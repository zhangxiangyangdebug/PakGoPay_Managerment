<script>
import {getWsMessages, heart, logOut, markReadMessage, refreshAccessToken, menu} from "@/api/interface/backendInterface.js";
import router from "@/router/index.js";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { connectWebSocket, disconnectWebSocket } from "@/util/websocket.js"
import { getAsyncRoutes } from "@/router/asyncRouter.js";
import { buildFullTimeZoneOptions } from "@/util/timezoneOptions.js";

const showNewMessage = (message) => {
  this.$notify({
    title: this.$t('topbar.newMessage'),
    message: message.content,
    type: "info",
    duration: 0,
    position: "top-right",
  })
  this.speak(message)
}
export default {
  name: 'Topbar',
  components: {SvgIcon},
  props: [
      'collapse'
  ],
  emits: ["changeBar"],
  data() {
    return {
      messageCount: 0,
      messages: [],
      stomp: null,
      speech: null, //存储语音合成实例
      textToSpeak: '',
      collapse: false,
      username: "",
      userId: "",
      notifications: [],
      expandedNotificationId: null,
      selectedLang: 'zh-cn',
      selectedTimeZone: 'Asia/Shanghai',
      clearingNotifications: false,
      languageOptions: [],
      timeZoneOptions: []
    }
  },
  created() {
    this.username = localStorage.getItem("userName");
    const storedZone = localStorage.getItem("timeZone");
    this.timeZoneOptions = buildFullTimeZoneOptions();
    if (storedZone) {
      this.selectedTimeZone = storedZone;
    }
    if (!this.timeZoneOptions.some(item => item.value === this.selectedTimeZone)) {
      this.timeZoneOptions.unshift({ value: this.selectedTimeZone, label: this.selectedTimeZone });
    }
    const storedLang = localStorage.getItem("lang");
    this.selectedLang = storedLang || this.$i18n.locale || "zh-cn";
    this.$i18n.locale = this.selectedLang;
    this.refreshLanguageOptions();
  },
  mounted() {
    this.username = localStorage.getItem("userName")
    this.userId = localStorage.getItem("userId")
    if (this.username) {
      this.stomp = connectWebSocket(this.userId+'/newOrder', this.showNewMessage, null)
    }

    /*this.username = localStorage.getItem("userName");
    if (!this.username) {
      this.logOut()
    }*/
   /* this.heartBeat();*/
    this.fetchWsMessages()
  },
  beforeUnmount() {
    if (this.stomp) {
      disconnectWebSocket();
    }

  },
  methods: {
    logOut,
    async heartBeat() {
       console.log("heartBeat");
      await heart().then(res => {
        if(res.data === 'refresh') {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          localStorage.removeItem("menu");
          /*router.push("/web/login");*/
          // 返回refresh 需要调用refresh接口刷新token 无需重新登陆
          refreshAccessToken(localStorage.getItem("refreshToken")).then(response => {
            if (response.status === 200 && response.data) {
              if (response.data.code === 0) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", response.data.userName)
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("refreshToken", response.data.refreshToken)
              } else {
                router.push("/web/login")
              }
            }
          })
        }
      });
    },
    changeLanauage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.selectedLang = lang;
      this.refreshLanguageOptions();
    },
    refreshLanguageOptions() {
      this.languageOptions = [
        {
          value: 'en',
          label: this.$t('language.en'),
          flag: 'english'
        },
        {
          value: 'zh-cn',
          label: this.$t('language.zh'),
          flag: 'chinese'
        },
        {
          value: 'ms',
          label: this.$t('language.ms'),
          flag: 'singapore'
        }
      ]
    },
    handleTimeZoneChange(value) {
      const prev = localStorage.getItem("timeZone") || this.selectedTimeZone || "";
      localStorage.setItem("timeZone", value);
      window.__lastTimezoneChange = {
        prev,
        next: value,
        at: Date.now()
      };
      window.dispatchEvent(new CustomEvent("timezone-change", { detail: value }));
    },
    changeCollapse() {
      this.collapse = !this.collapse;
      this.$emit("changeBar", this.collapse);
    },
    speak() {
      if ('speechSynthesis' in window) {
        if (this.speech){
          window.speechSynthesis.cancel() //取消之前的语音
        }
        this.speech = new SpeechSynthesisUtterance(this.textToSpeak)
        //this.speech.lang = 'ja-JP'
        window.speechSynthesis.speak(this.speech)
      } else {
        alert(this.$t('topbar.speechUnsupported'))
      }
    },
    showNewMessage(message) {
      let messageData = JSON.parse(message)
      /*this.$notify({
        title: 'new message',
        dangerouslyUseHTMLString: true,
        customClass: 'noticeMessage',
        message: messageData.content,
        type: "info",
        duration: 5000,
        position: "bottom-right",
        onClick: () => {
          router.push({
            name: "CollectingOrder"
          })
        }
      })*/
      this.notifications.unshift({
        id: messageData.id,
        title: messageData.title,
        content: messageData.content,
        read: false,
        path: messageData.path,
        timestamp: messageData.timestamp
      })
      this.fetchWsMessages()
      this.textToSpeak = this.formatNotificationTitle({ title: messageData.title })
      this.playNotice()
      if (this.textToSpeak) {
        this.speak()
      }
    },
    fetchWsMessages() {
      getWsMessages().then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let data = JSON.parse(res.data.data)
          this.messageCount = data.messageCount
          this.notifications = data.messages
          if (!this.notifications.some(item => item.id === this.expandedNotificationId)) {
            this.expandedNotificationId = null
          }
        }
      })
    },
    async playNotice() {
      this.$refs.noticePlayer.muted=true
      this.$refs.noticePlayer.muted=false
      await this.$refs.noticePlayer.play()
    },
    async navigateToNotification(notification) {
      const targetPath = notification?.path
      if (targetPath) {
        await this.ensureRouteLoaded()
        const dayTimestamp = this.toDayStartTimestamp(notification?.timestamp)
        const notifyQuery = {
          orderNo: notification?.id,
          timestamp: dayTimestamp
        }
        if (router.hasRoute(targetPath)) {
          await router.push({
            name: targetPath,
            query: notifyQuery
          })
          return
        }
        if (String(targetPath).startsWith('/')) {
          await this.ensureRouteLoadedByPath(targetPath)
          const resolved = router.resolve({ path: targetPath })
          if (resolved?.matched?.length > 0) {
            await router.push({
              path: resolved.path,
              query: {
                ...resolved.query,
                ...notifyQuery
              }
            })
          }
        }
      }
    },
    async markNotificationRead(notificationId) {
      if (!notificationId) {
        return
      }
      await markReadMessage(notificationId).then(res => {
        if(res.status === 200 && res.data.code === 0) {
          this.messageCount = JSON.parse(res.data.data).messageCount
          this.notifications = JSON.parse(res.data.data).messages
        }
      })
    },
    toggleNotification(notification) {
      const currentId = notification?.id
      if (!currentId) {
        return
      }
      this.expandedNotificationId = this.expandedNotificationId === currentId ? null : currentId
    },
    async goNotification(notification) {
      await this.markNotificationRead(notification?.id)
      this.expandedNotificationId = null
      await this.navigateToNotification(notification)
    },
    async clearNotification(notification) {
      const notificationId = notification?.id
      if (!notificationId) {
        return
      }
      await this.markNotificationRead(notificationId)
      if (this.expandedNotificationId === notificationId) {
        this.expandedNotificationId = null
      }
    },
    async clearAllNotifications() {
      if (this.clearingNotifications || !this.notifications.length) {
        return
      }
      this.clearingNotifications = true
      const ids = this.notifications
        .map(item => item?.id)
        .filter(id => id !== null && id !== undefined && id !== '')
      if (ids.length) {
        await Promise.allSettled(ids.map(id => markReadMessage(id)))
      }
      this.expandedNotificationId = null
      await this.fetchWsMessages()
      this.clearingNotifications = false
    },
    resolveNotificationTypeLabel(rawTitle) {
      const key = String(rawTitle || '').toLowerCase()
      if (key === 'withdraw') {
        return this.$t('topbar.type.withdrawOrder')
      }
      if (key === 'withdraw_result') {
        return this.$t('topbar.type.withdrawReviewDone')
      }
      if (key === 'payout') {
        return this.$t('topbar.type.payoutTimeoutOrder')
      }
      if (key === 'collection') {
        return this.$t('topbar.type.collectionTimeoutOrder')
      }
      return this.$t('topbar.newMessage')
    },
    resolveNotificationPayload(notification) {
      const content = notification?.content
      let payload = {}
      if (content && typeof content === 'string') {
        const text = content.trim()
        if (text.startsWith('{') && text.endsWith('}')) {
          try {
            payload = JSON.parse(text)
          } catch (e) {
            payload = {}
          }
        }
      } else if (content && typeof content === 'object') {
        payload = content
      }
      const orderNo = payload.orderNo || payload.transactionNo || payload.id || notification?.id || notification?.content || '-'
      const amount = payload.orderAmount ?? payload.amount ?? notification?.amount ?? '-'
      return { orderNo, amount }
    },
    toDayStartTimestamp(rawTimestamp) {
      const ts = Number(rawTimestamp)
      if (!Number.isFinite(ts)) {
        return undefined
      }
      const normalized = String(Math.trunc(ts)).length === 10 ? ts * 1000 : ts
      const date = new Date(normalized)
      if (Number.isNaN(date.getTime())) {
        return undefined
      }
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
      return String(dayStart.getTime())
    },
    async ensureRouteLoadedByPath(targetPath) {
      if (!String(targetPath).startsWith('/')) {
        return
      }
      const resolved = router.resolve({ path: targetPath })
      if (resolved?.matched?.length > 0) {
        return
      }
      await this.ensureRouteLoaded()
    },
    async ensureRouteLoaded(routeName) {
      if (routeName && router.hasRoute(routeName)) {
        return
      }
      let menuJson = null
      const menuString = localStorage.getItem("menu")
      if (menuString) {
        try {
          menuJson = JSON.parse(menuString)
        } catch (error) {
          menuJson = null
        }
      }
      if (!menuJson) {
        const res = await menu()
        if (res.status === 200 && res.data.data) {
          menuJson = JSON.parse(res.data.data)
          localStorage.setItem("menu", JSON.stringify(menuJson))
        }
      }
      if (menuJson) {
        getAsyncRoutes(menuJson).forEach((route) => {
          router.addRoute(route)
        })
      }
    },
    unreadCount() {
      return this.messageCount
    },
    formatNotificationTitle(notification) {
      const rawTitle = String(notification?.title || '').toLowerCase()
      if (rawTitle === 'withdraw') {
        return this.$t('topbar.title.withdraw')
      }
      if (rawTitle === 'withdraw_result') {
        return this.$t('topbar.title.withdrawResult')
      }
      if (rawTitle === 'payout') {
        return this.$t('topbar.title.payout')
      }
      if (rawTitle === 'collection') {
        return this.$t('topbar.title.collection')
      }
      return notification?.title || this.$t('topbar.newMessage')
    },
    formatNotificationOrderNo(notification) {
      return this.resolveNotificationPayload(notification).orderNo
    },
    formatNotificationTime(timestamp) {
      return this.formatDateByTs(timestamp)
    },
    formatDateByTs(ts) {
      const ms = Number(String(Math.trunc(Number(ts))).length === 10 ? Number(ts) * 1000 : Number(ts))
      if (!Number.isFinite(ms)) {
        return '-'
      }
      const d = new Date(ms)
      if (Number.isNaN(d.getTime())) {
        return '-'
      }
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const hour = String(d.getHours()).padStart(2, '0')
      const minute = String(d.getMinutes()).padStart(2, '0')
      const second = String(d.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
    isNotificationExpanded(notification) {
      return notification?.id && this.expandedNotificationId === notification.id
    },
    viewDetail() {
      alert(this.$t('topbar.viewDetail'))
      router.push({
        name: 'AccountManagement'
      })
    }
  },
  watch: {
    "$i18n.locale"(val) {
      this.selectedLang = val;
      this.refreshLanguageOptions();
    }
  },
}
</script>

<template>
  <audio ref="noticePlayer" muted="true">
    <source type="audio/mp3" src="@/audio/notice.mp3">
  </audio>
  <button refs="startButton"></button>
  <div :class="[collapse? 'topbar-collapsed':'topbar']">
    <div v-if="!$route.meta.showBar" :class="[!collapse? 'zhedie':'zhedie-zhedie']" @click="changeCollapse()">
      <SvgIcon width="30px" height="30px" :name="!collapse ? 'shouqi' : 'zhankai'" style="cursor: pointer;margin:0;"/>
    </div>
    <!-- 顶部栏内容 -->
    <div class="userInfo" >
      <div style="margin-left: 10%;display: flex;flex-direction: row;align-items: center;width: auto;">
        <div style="display: flex; flex-direction: column">
          <SvgIcon name="language" style="width: 25px;height: 25px;width: 50px;margin: 0" />
          <div style="font-size: small;margin:0">{{$t('language')}}</div>
        </div>
        <el-select v-model="selectedLang"
                   size="small"
                   @change="changeLanauage"
                   style="border: none;width: 60px"
        >
          <el-option
              v-for="item in languageOptions"
              :key = "item.value"
              :value="item.value"
              :label="item.label"
          >
            <span class="lang-option">
              <SvgIcon :name="item.flag" :class="['lang-flag', { 'lang-flag-tall': item.value === 'ms' }]" />
              <span class="lang-label">{{ item.label }}</span>
            </span>
          </el-option>
        </el-select>
        <div style="display: flex; flex-direction: column; margin-left: 12px;">
          <SvgIcon name="clock" style="width: 22px;height: 22px;width: 50px;margin: 0" />
          <div class="timezone-label" style="font-size: small;margin:0">{{$t('timezone')}}</div>
        </div>
        <el-select
            v-model="selectedTimeZone"
            size="small"
            @change="handleTimeZoneChange"
            filterable
            style="border: none;width: 190px"
        >
          <el-option
              v-for="item in timeZoneOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
          />
        </el-select>
      </div>
      <div style="display: flex;justify-content: center;align-items: center;">
        <div v-if="username" style="display: flex; align-items: center;">
          <el-dropdown trigger="click" class="notice-dropdown" :hide-on-click="false">
            <span class="notice-trigger">
              <el-badge :value="unreadCount()" :hidden="unreadCount() === 0">
                <SvgIcon name="bell" style="width: 22px;height: 22px"/>
              </el-badge>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="notice-menu">
                <el-dropdown-item v-if="notifications.length === 0" disabled>
                  {{ $t('topbar.noMessages') }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="item in notifications"
                  :key="item.id"
                >
                  <div class="notice-item" :class="{ 'notice-unread': !item.read }">
                    <div class="notice-title-row">
                      <div class="notice-title" @click.stop="toggleNotification(item)">
                        {{ formatNotificationTitle(item) }}
                      </div>
                      <span class="notice-remove" @click.stop="clearNotification(item)">×</span>
                    </div>
                    <div v-if="isNotificationExpanded(item)" class="notice-detail">
                      <div class="notice-line">{{ $t('topbar.orderNo') }}{{ formatNotificationOrderNo(item) }}</div>
                      <div class="notice-line">{{ $t('topbar.orderCreateTime') }}{{ formatNotificationTime(item.timestamp) }}</div>
                      <div class="notice-actions">
                        <el-button type="primary" size="small" @click.stop="goNotification(item)">
                          {{ $t('topbar.goTo') }}
                        </el-button>
                      </div>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item v-if="notifications.length > 0" divided class="notice-clear-row">
                  <div class="notice-clear-all" @click.stop="clearAllNotifications">
                    {{ clearingNotifications ? $t('topbar.clearing') : $t('topbar.clearAll') }}
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-avatar style="font-size: 30px;background-color: #647387; color: black;">{{username.charAt(0)}}</el-avatar>
              {{username}}
              <el-dropdown trigger="click">
                <SvgIcon name="downBlack" style="width: 22px;height: 22px"/>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logOut">
                      <SvgIcon name="logout" style="height:22px"/>
                      {{$t('topbar.logout')}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

        </div>
        <div v-else>
          {{ $t('topbar.pleaseLogin') }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "@/assets/base.css";


.userInfo {
  height: 50px;
  right: 10px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-items: center;
  position: absolute;
  padding-right: 40px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.notice-dropdown {
  margin-right: 12px;
}

.notice-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.notice-menu {
  width: 260px;
  max-height: 260px;
  overflow-y: auto;
}

.notice-unread {
  font-weight: 600;
}
.notice-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.notice-title {
  font-size: 13px;
  line-height: 18px;
  cursor: pointer;
}
.notice-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.notice-remove {
  color: #909399;
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
  user-select: none;
}
.notice-remove:hover {
  color: #f56c6c;
}
.notice-line {
  font-size: 12px;
  line-height: 16px;
  color: #606266;
  word-break: break-all;
}
.notice-detail {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.notice-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
}
.notice-clear-row {
  justify-content: center;
}
.notice-clear-all {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #409EFF;
  cursor: pointer;
  user-select: none;
}
.lang-option {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}
.lang-flag {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
.lang-flag-tall {
  height: 32px;
}
.lang-label {
  line-height: 16px;
}
.timezone-label {
  white-space: nowrap;
}

.zhedie {
  position: fixed;
  margin-top:0;
  top: 0;
 /* background-color: #20b978;*/
}
.zhedie-zhedie {
  margin-top:0;
  top: 0;
  position: fixed;
/*  background-color: #20b978;*/
}
</style>
<style>
.noticeMessage {
  cursor: pointer;
}
</style>
