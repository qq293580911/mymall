// import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
// export const imageLoad = {
//   mounted() {
//     let refresh = debounce(this.$refs.scroll.refresh,100)
//     this.$bus.$on('imageLoad',()=>{
//       refresh()
//     })
//   }
// }

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}