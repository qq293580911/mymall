<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpload:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click:true,
          probeType:this.probeType,
          pullUpLoad: this.pullUpload
        })

        //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })

        //监听上拉
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }else {
        this.scroll.refresh();
      };
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>