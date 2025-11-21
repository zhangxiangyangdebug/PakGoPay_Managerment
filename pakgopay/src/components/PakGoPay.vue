<template>

  <div>
    <Sidebar></Sidebar>
  </div>
  <h1 @click="logOut">退出</h1>
  <router-view></router-view>
</template>
<script>
import router from "@/router/index.js";
import {heart} from "@/api/interface/backendInterface.js";
import Sidebar from "@/views/Sidebar.vue";
export default {
  name: 'NagiveBar',
  components: {Sidebar},
  data() {
  },
  mounted() {
     this.heartBeat()
  },
  methods: {
    async heartBeat() {
       await heart().then(res => {
         if(res.data !== 'success') {
           localStorage.removeItem("token");
           router.push(res.data);
         }
       });
    },
    logOut() {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }
}
</script>