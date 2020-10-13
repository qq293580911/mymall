<template>
  <div class="category-right">
    <scroll class="wrapper" ref="scroll">
      <div class="tab-item" v-for="(item, index) in listItem" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" />
          <p class="item-text">{{ item.title }}</p>
        </a>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name:'CategoryRight',
  components:{
    Scroll
  },
  props:{
    listItem:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods:{
    imgLoad(){
      this.count++;
      if (this.count >= this.listItem.length) {
        this.$refs.scroll.refresh();
        this.count = 0;
      }
    }
  }
}
</script>

<style scoped>
.category-right {
  flex: 1;
  overflow: hidden;
}
.wrapper {
  height: 100%;
  overflow: hidden;
}
.tab-item {
  display: inline-block;
  width: 5rem;
  margin: 0.3rem 0.25rem;
}
.tab-item a {
  display: block;
}
.tab-item img {
  width: 100%;
}
.item-text {
  margin-top: 0.3rem;
  text-align: center;
}
</style>