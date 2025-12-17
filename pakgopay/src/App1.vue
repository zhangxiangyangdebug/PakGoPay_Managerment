<script setup>
import Sidebar from "@/components/Sidebar1.vue";
import UserInfoBar from "@/components/TopBar1.vue";
import Content from "@/components/Content.vue";
</script>

<template>

  <el-container>
    <el-aside width="200px"><Sidebar/></el-aside>
    <el-container>
      <el-header>
        <UserInfoBar/>
      </el-header>
      <el-main>
        <Content></Content>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {heart, refreshAccessToken} from "@/api/interface/backendInterface.js";
  import router from "@/router/index.js";

  export default {
    name: 'app',
    methods: {
      logOut() {
        localStorage.removeItem("token" );
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        localStorage.removeItem("menu")
        router.push("/web/login");
      },
      changeCollapse() {
        this.collapse = !this.collapse;
      }
    },
    mounted() {
      heart().then(res => {
        if (res.status === 200) {
          if (res.data === 'refresh') {
            refreshAccessToken(localStorage.getItem("refreshToken")).then((response) => {
                if (response && response.data) {
                  localStorage.setItem("userName", response.data.userName);
                  localStorage.setItem("userId", response.data.userId);
                  localStorage.setItem("menu", response.data.menu);
                  localStorage.setItem("token", response.data.token);
                }
            })
          }else if(res.data === 'success') {
            router.push(localStorage.getItem("currentPath"));
          } else {
            router.push("/web/login");
          }
        }
      })
    },
    data() {
      return {
        collapse : false
      }
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
/*#app {
  !*position: fixed;*!
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
  !*top: 0.8%;*!
  !*left: 10.9%;*!
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
  top: 15%;
  margin-left: 13.5%;
  width: 88%;
  height: 75%;
  background-color: #F3F3F3;
}

.content-collapse {
  position: fixed;
  top: 15%;
  margin-left: 0;
  width: 100%;
  height: 75%;
  background-color: #F3F3F3;
}

.zhedie {
  position: fixed;
  color: red;
  margin-left: 12%;
  margin-top:0.2%;
  background-color: #20b978;
  bottom:12px;
}
.zhedie-zhedie {
  position: fixed;
  color: red;
  margin-left: 0;
  margin-top: 0.1%;
  background-color: #20b978;
  bottom:12px;
}*/


.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>