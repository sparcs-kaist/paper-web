<template lang=''>
<div class="totalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <span class="title">페이퍼 올리기 | </span>
      <span class="essential">*필수 항목</span>
    </div>
    <div class="categoryWrapper">
      <span class="categoryHeading">카테고리</span>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" value="리크루팅"/>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" value="설문 조사"/>
    </div>
  </div>
  <div class="row">

  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      selectedCategory: ""
    }
  }
}
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include marginPage();
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .headingWrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .title {
        font-size: $biggest-font-size;
        font-weight: $big-font-weight;
      }
      .essential {
        font-size: $small-font-size;
        color: $essential-color;
      }
    }
  }
}
</style>
