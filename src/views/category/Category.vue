<template>
  <div id="category">
    <nav-bar class="category-nav"><template #center>分类</template></nav-bar>
    <div class="main">
      <category-left ref="left"/>
      <category-right ref="right" :list-item="rightList"/>
    </div>
  </div>
</template>

<script>
import { getCategoryInfo } from "network/category.js";
import CategoryLeft from "./childComps/CategoryLeft.vue";
import CategoryRight from "./childComps/CategoryRight.vue";
import NavBar from "components/common/navbar/NavBar.vue";
  export default {
    name: "Category",
    components:{
      NavBar,
      CategoryLeft,
      CategoryRight
    },
    data() {
      return {
        rightList: [],
      }
    },
    created() {

    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
      async getCategoryInfo(maitKey) {
        let res = await getCategoryInfo(maitKey);
        if (res) {
          this.rightList = res.data.list;
        }
      }
    }
  }
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: white;
}
.main {
  display: flex;
  font-size: 0.6rem;
  height: calc(179vw - 44px - 49px);
}
</style>
