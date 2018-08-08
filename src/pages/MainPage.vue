<template lang=''>
<div class="totalWrapper">
  <div class="header"><img src="@/assets/logo.png" class="logo">는 카이스트 리크루팅 및 설문조사 서비스입니다.</div>
  <div class="explaination">
    페이퍼 이용방법을 보고싶으시다면 아래 버튼을 눌러주세요.
  </div>
  <button class="onBoardingButton">
    페이퍼 설명 보러가기
  </button>
</div>
</template>
<script>
export default {};
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include pageDefault();
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: pink;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url("../assets/white_wood.jpg") no-repeat center center fixed;
  background-size: cover;
  .logo {
    margin-bottom: 10px;
    margin-right: 8px;
    width: 130px;
  }
  .header {
    font-size: $small-max-font-size;
    margin: 20px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .explaination {
    font-size: $big-font-size;
    text-align: center;
  }
  .onBoardingButton {
    @include largeButton(theme);
    width: 50%;
    margin-top: 20px;
  }
}
</style>
