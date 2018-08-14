<template lang=''>
  <div class="totalWrapper">
    <span class="errorCode">404</span>
    <span class="contentWrapper">페이지를 찾을 수 없습니다.</span>
    <router-link to="/">
      <span class="routing">메인 화면으로 돌아가기</span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.totalWrapper {
  @include marginPage();
  bottom: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 2em;
  .errorCode {
    font-size: $small-max-font-size;
    margin-bottom: 30px;
  }
  .contentWrapper {
    font-size: $small-max-font-size;
    margin-bottom: 20px;
  }
  .routing {
    color: $theme-color;
    font-size: $big-font-size;
  }
  @include breakPoint('phone') {
    left: 5%;
    right: 5%;
    .contentWrapper {
      font-size: $biggest-font-size;
    }
  }
  @include breakPoint('tablet') {
    left: 5%;
    right: 5%;
    .contentWrapper {
      font-size: $biggest-font-size;
    }
  }
}
</style>
