<template>
  <div class="profile" v-if="uBaseInfo != null">
    <user-bar :uBaseInfo="uBaseInfo"></user-bar>
    <order-bar :uid="uBaseInfo.uid"></order-bar>
    <option-bar :uid="uBaseInfo.uid"></option-bar>
    <br/>
    <div class="login-out" @click="quitClick">退出账号</div>
  </div>
  <div v-else>
    <h2>没有该用户数据</h2>
  </div>
</template>

<script>
  import UserBar from "./childComps/UserBar.vue";
  import OrderBar from "./childComps/OrderBar.vue";
  import OptionBar from "./childComps/OptionBar.vue";

  // import { postQuitLogin } from "network/login.js";
  import { getProfileInfo } from "network/profile.js";
  export default {
    name: "Profile",
    components:{
      UserBar,
      OrderBar,
      OptionBar
    },
    data() {
      return {
        uBaseInfo: {
          //通过uid到达用户的个人界面
          uid: "",
          uname: "",
          uavatar: ""
        }
      };
    },
    methods:{
      quitClick() {
        //1. 让服务器记录当前的token的第三条字段signature
        this.quitLogin();
        //2. 清除当前的storage
        removeToken();
        //3. 路由跳转到登录界面
        this.$router.replace("/login");
      },
      async quitLogin() {
        let allToken = getToken();
        let res = await postQuitLogin(getUid(), allToken);
        if (res) {
          //成功记录了uinfor里的 token
          console.log("成功记录");
        } else {
          console.log("记录失败");
        }
      },
      async getProfileInfo(uid) {
        let res = await getProfileInfo(uid);
        if (!res.success) {
          this.uBaseInfo = null;
        } else {
          this.uBaseInfo.uavatar = res.data.uImg;
          this.uBaseInfo.uname = res.data.name;
        }
      }
    }
  }
</script>

<style scoped>
.profile {
  font-size: 0.68rem;
  background-color: rgba(190, 190, 190, 0.2);
  height: 100vh;
  overflow: hidden;
}
.login-out {
  position: relative;
  font-size: 0.8rem;
  color: white;
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  background-color: var(--color-high-text);
  border-radius: 0.2rem;
  text-align: center;
}
</style>
