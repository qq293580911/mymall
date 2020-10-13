<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment :comment-info="comments" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailComment from './childComps/DetailComment'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from "components/content/goods/GoodsList"
import GoodsListItem from "components/content/goods/GoodsListItem"

import {debounce} from "common/utils";
import {backTopMixin } from "common/mixin"

import {mapActions} from 'vuex'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
  name:'Detail',
  mixins:[backTopMixin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      comments:{},
      recommends:[],
      //滚动与标题响应
      themeTopYs:[],
      getThemeTopYs:null,
      currentIndex:0
    }
  },
  created(){
    //1、保存传入的iid
    this.iid = this.$route.params.iid
    //2、根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      const data = res.result
      //3、获取顶部轮播图片
      this.topImages = data.itemInfo.topImages

      //4、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //5、获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //6、保存商品详情数据
      this.detailInfo = data.detailInfo

      //7、保存商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //8、保存评论信息
      this.comments = data.rate.list[0]
    })

    //获取推荐商品数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })

    //
    this.getThemeTopYs = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE);
    },100)
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('detailImageLoad',()=>{
      refresh()
    })
  },
  methods:{
    ...mapActions['addCart'],
    imageLoad(){
      this.$refs.scroll.refresh()
      //图片加载获取offsettop
      this.getThemeTopYs()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
    },
    contentScroll(position){
      const positionY = -position.y
      const length = this.themeTopYs.length
      for(let i=0;i<length;i++){
        if(this.currentIndex !== i && ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //1、判断backtop是否显示
      this.isShowBackTop = (-position.y)>1000
    },
    addCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.show(res,1500)
      })
      
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>