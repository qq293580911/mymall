<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>

  <tab-control :titles="['流行','新款','精选']" 
              ref="tabControl1"
              class="tab-control"
              v-show="isTabFixed"
              @tabClick="tabClick"/>

  <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          :pull-up-load="true" 
          @scroll="contentScroll"
          @pullingUp="loadMore">
    <home-swiper :banners='banners' @swiperImageLoaded="swiperImageLoaded"/>
    <recommend-view :recommends='recommends'/>
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
                  ref="tabControl2"
                  :class="{fixed:isTabFixed}"
                  @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </scroll>

  <back-top @click.native="backTop" v-show="isShowBackTop"/>
</div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll';
// import BScroll from 'better-scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from "network/home"

import {debounce} from "common/utils";
import {backTopMixin } from "common/mixin"

export default {
  name: "Home",
  mixins:[backTopMixin],
  components:{
    // 公共类的组件
    NavBar,
    // BScroll,
    Scroll,
    TabControl,
    GoodsList,
    // 
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffSetTop: 0,
      isTabFixed: false,
      scroll:null
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('homeImageLoad',()=>{
      refresh()
    })
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    swiperImageLoaded(){
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    contentScroll(position){
      //1、判断backtop是否显示
      this.isShowBackTop = (-position.y)>1000
      //2、决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffSetTop
    },
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //1.请求多个数据
    getHomeMultidata(){ 
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      });
    },
    //2、请求商品数据
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
#home {
  /* vh -> viewport视口高度*/
  height: 100vh;
  position: relative;
}
.content{
  /*height: calc(100% - 50px);*/
  /*overflow: hidden;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}

</style>
