<template>
<div class="back-top" @click="backTop">
  <img src="@/assets/img/common/top.png" alt="">
</div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    backTop(){
      this.$emit('backTop')
    }
  }
}
</script>

<style scoped>
.back-top{
  position: fixed;
  bottom: 50px;
  right: 10px;
}
.back-top img{
  width: 43px;
  height: 43px;
}
</style>
