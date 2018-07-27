<template lang=''>
  <div class="paperTabWrapper">
    <img src="@/assets/userProfile.jpg" class="imageWrapper">
    <div class="imageTitle">{{title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    image: String,
    title: String
  }
}
</script>
<style lang='scss' scoped>
.paperTabWrapper {
  position: relative;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 30px;
  .imageWrapper {
    width: 100%;
    height: 250px;
  }
  .imageTitle {
    width: 100%;
    font-size: $normal-font-size;
    color: white;
    padding-left: 4px;
    margin-top: 8px;
  }
}
</style>
