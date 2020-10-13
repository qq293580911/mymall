<template>
  <div id="category-left">
    <scroll class="wrapper" ref="scroll" >
      <div
        class="left-tab-item"
        v-for="(item, index) in list"
        :key="index"
        @click="itemClick(index)"
        :class="{ active: currIndex == index }">
          <p>{{ item.title }}</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { getCategory, getCategoryInfo } from "network/category.js";
export default {
  name:'CategoryLeft',
  components:{
    Scroll
  },
  data(){
    return{
      currIndex: 0,
      currMaitKey: 0,
      list: []
    }
  },
  props: {
    
  },
  mounted(){
    //获取左边栏的信息
    this.getCategory();
  },
  methods:{
    async getCategory() {
      let res = await getCategory();
      if (res) {
        this.list = res.data.category.list;
        //刚进分类页面，相当于是点击了itemClick(0)
        this.itemClick(0);

        this.$nextTick(function(){
          this.$refs.scroll.refresh()
        })

      }
    },
    itemClick(index) {
      this.currIndex = index;
      if (this.list) {
        this.currMaitKey = this.list[index].maitKey;
        if (index < 4) {
          this.$parent.getCategoryInfo(this.currMaitKey);
        }
      }
    }
  }
}
</script>

<style scoped>
#category-left {
  width: 25%;
  background-color: #f6f6f6;
  overflow: hidden;
}
.wrapper{
  height: 100%;
  overflow: hidden;
}
.left-tab-item {
  height: 45px;
  line-height: 45px;
}
.left-tab-item p {
  width: 100%;
  text-align: center;
  color: rgb(100, 100, 100);

  display: inline-block;
  line-height: 0.8rem; /* line-height是用来控制border的,其父亲的line-height用来控制整体的行高，自己的用来控制元素的行高 */
  border-left: 0.2rem solid #f6f6f6;
}
.left-tab-item.active {
  background-color: white;
}
.left-tab-item.active p {
  color: var(--color-high-text);
  font-weight: 600;
  border-left: 0.2rem solid var(--color-high-text);
}
</style>