<template>
  <div id="box_item">
    <a :href="itemInfo.link" class="item">
      <img :src="itemInfo.img" alt="" />
    </a>
    <div class="item_text">
      {{ itemInfo.text }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
#box_item {
  width: 40px;
  height: 40px;
  margin: 5px;
}
.item img {
  margin: 0 auto;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}
.item_text {
  text-align: center;
  /* font-size: 1rem; */
  line-height: 1.5rem;
}
</style>
