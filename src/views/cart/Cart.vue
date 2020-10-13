<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <slot slot="center">购物车({{cartLength}})</slot>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
.cart{
  height: 179vw;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
