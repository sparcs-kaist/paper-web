<template lang=''>
  <div class="totalWrapper">
    <span class="replyWrapper">페이퍼를 성공적으로 제출하셨습니다.</span>
    <div class="tabWrapper">
      <span class="tabs">메인으로 돌아가기</span>
      <span class="tabs">마이페이지 가기</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.totalWrapper {
  @include marginPage();
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .replyWrapper {
    font-size: $max-font-size;
    font-weight: $big-font-weight;
    text-align: center;
  }
  .tabWrapper {
    width: 100%;
    display: flex;
    margin-top: 30px;
    .tabs {
      flex: 1;
      font-size: $big-font-size;
      &:first-child {
        text-align: right;
        padding-right: 10px;
      }
      &:last-child {
        text-align: left;
        padding-left: 10px;
      }
    }
  }
}
</style>