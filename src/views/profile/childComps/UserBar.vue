<template>
  <div class="user-bar">
    <div class="link-BG">
      <a href="转到个人用户界面">
        <div class="avatar">
          <img :src="uImg" class="avatar-img" />
          <img src="~assets/img/profile/vipnum_72x72.png" class="vip-sign" />
        </div>
      </a>
      <p class="user-name">{{ uBaseInfo.uname }}</p>
      <a href="转到会员地址">
        <div class="vip-link"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'UserBar',
  props: {
    //uBaseInfo里包括了uid,uname,uavatar
    uBaseInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    uImg() {
      if (this.uBaseInfo.uavatar != "") {
        console.log(this.uBaseInfo.uavatar); //"assets/img/profile/avatar.svg"
        return require("@/" + this.uBaseInfo.uavatar);
        //return require("assets/img/profile/avatar.svg");
      }
    }
  }
}
</script>

<style scoped>
.user-bar {
  height: 12.5rem;
  background: url("~assets/img/profile/userBG_750x229.png") 0 0 no-repeat;
  background-size: 100% 6rem;
  /* 子元素的margin-top会导致父元素位置改变，用下面2个任意一个都可以解决 */
  overflow: hidden;
  /* border: 0.04rem solid gray; */
  position: relative;
}
.link-BG {
  width: 90%;
  height: 7.5rem;
  margin: 3rem auto 0rem;

  background-color: #fff;

  border-radius: 0.5rem;
}
.avatar {
  width: 5rem;
  height: 5rem;
  border: 0.04rem solid gray;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #fff;

  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  text-align: center;
}

.avatar .avatar-img {
  width: 100%;
  height: 100%;
}
.avatar .vip-sign {
  width: 2rem;
  height: 2rem;

  position: absolute;
  bottom: 0;
  right: 0;
}

.user-name {
  font-size: 0.75rem;
  font-weight: 600;

  padding-top: 4.5rem;
  /* padding-bottom: 0.2rem; */
  text-align: center;
}
.vip-link {
  background: url("~assets/img/profile/vip_1404x216.png") 0 0 no-repeat;
  width: 100%;
  height: 4rem;
  background-size: 100% 100%;

  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
</style>