<template lang=''>
<div class="totalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <span class="headingTitle">페이퍼 올리기 | </span>
      <span class="essential"> *필수 항목</span>
    </div>
    <div class="categoryWrapper">
      <span class="categoryHeading">카테고리 </span>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" >리크루팅</label>
      <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
      <label for="recruiting" class="label" >설문 조사</label>
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
      .headingTitle {
        font-size: $big-font-size;
        font-weight: $big-font-weight;
      }
      .essential {
        font-size: $normal-font-size;
        color: $essential-color;
        margin-left: 5px;
      }
    }
    .categoryWrapper {
      margin-left: 40px;
      .categoryHeading {
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
      }
      .radio {
        margin-left: 15px;
      }
      .label {
        font-size: $normal-font-size;
      }
    }
    &:first-child {
      align-items: center;
    }
  }
}
</style>
