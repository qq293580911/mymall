<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button 
        class="check-all-button"
        :is-checked="isSelectAll"
        @click.native="selectAllClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计¥:{{totalprice}}
    </div>
    <div class="calc" @click="goCalc">去结算:{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters} from 'vuex'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalprice(){
      return   this.cartList.filter(item=> item.isChecked
      ).reduce((previousValue,item)=>{
        return previousValue + item.count * item.price
      },0)
   },
   checkLength(){
     return this.cartList.filter( item=> item.isChecked).length
   },
   isSelectAll(){
     if(this.checkLength==0){
       return false
     }else{
       //1、使用filter
       //return !(this..cartList.filter(item => !item.isChecked).length)
       //2、使用find
       return !(this.cartList.find(item => !item.isChecked))
     }
   }
  },
  methods:{
    selectAllClick(){
      if(this.isSelectAll){//全部选中
        this.cartList.forEach(item=>item.isChecked=false)
      }else{
        this.cartList.forEach(item=>item.isChecked=true)
      }
    },
    goCalc(){
      if(!this.isSelectAll){
        this.$toast.show('还未选择商品')
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  background-color: #dbe5ec;
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
.check-all-button{
  width: 15px;
  height: 15px;
  line-height: 15px;
  margin-right:5px;
}
.check-all{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.total-price{
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
}
.calc{
  width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
}
</style>