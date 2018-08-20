<template lang=''>
  <div class="totalWrapper">
    <div class="contentWrapper">Credit</div>
    <div class="content">
<div class="singleWrapper">
<div class="singleTitle">Project Manager</div>
<div class="singleContent">이문영</div>
<div class="singleContent">(2018.03 ~ )</div>
</div>
<div class="singleWrapper">
<div class="singleTitle">Designer</div>
<div class="singleContent">고지훈</div>
</div>
<div class="singleWrapper">
<div class="singleTitle">Developer</div>
<div class="singleContent">이문영</div>
<div class="singleContent">고지훈</div>
</div>
<div class="singleWrapper">
<div class="singleTitle">Special Thanks To</div>
<div class="singleContent">김윤서</div>
<div class="singleContent">정진우</div>
</div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.totalWrapper {
  @include footerTabs();
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  .contentWrapper {
    font-size: $big-font-size;
    margin-bottom: 20px;
    font-weight: $big-font-weight;
  }
  .content {
    text-align: center;
    .contentTitle {
      font-size: $h1-font-size;
      margin-bottom: 10px;
      font-weight: $big-font-weight;
    }
    .singleWrapper {
      margin-bottom: 20px;
      .singleTitle {
        font-size: $h1-font-size;
        margin-bottom: 5px;
        color: $red-color;
        font-weight: $big-font-weight;
      }
      .singleContent {
        font-size: $normal-font-size;
      }
    }
  }
}
</style>
