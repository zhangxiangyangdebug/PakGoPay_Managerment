<script setup>
import Sidebar from "@/components/Sidebar.vue";
import UserInfoBar from "@/components/TopBar.vue";
</script>

<template>
  <div id="app" :class="[!$route.meta.showBar ? 'layout' :'']">
    <UserInfoBar :class="[!$route.meta.showBar ? 'userInfo':'']" v-if="!$route.meta.showBar"/>
    <Sidebar class="sidebar" v-if="!$route.meta.showBar"/>
    <div :class="[!$route.meta.showBar ? 'content':'beforeContent']">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {heart, refreshAccessToken} from "@/api/interface/backendInterface.js";
  import router from "@/router/index.js";

  export default {
    name: 'app',
    methods: {
      logOut() {
        localStorage.removeItem("token" );
        router.push("/web/login");
      }
    },
    mounted() {
      heart();
    }
  }
</script>
<style scoped>
/*.content {
  display: flex;
  top:20vh;
  margin-left: 23vh; !* 根据侧边栏宽度调整 *!
  border: solid 10px red;
  margin-top: 30vh;
  height: 90vh;
}*/
#app {
  /*position: fixed;*/
  background-color: #F3F3F3;
  display: flex;
  width: 100%;
}
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 0;
}
.userInfo {
  color: black;
  padding-top: 0;
  padding-bottom: 5px;
  text-align: center;
  height: 7%;
  margin-bottom: 10px;
  top: 1%;
  left: 10.9%;
  position: fixed;
  background-color: white;
  flex-grow: 1;
}
.sidebar {
  position: fixed;
  top: 1%;
  left: 0.8%;
  padding: 0;
  height: 98%;
}
.beforeContent {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;
}
.content {
  position: fixed;
  top: 12%;
  width: 88.8%;
  left: 11.1%;
  height: 86%;
  background-color: #F3F3F3;
}

</style>