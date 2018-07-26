<template lang=''>
<div class="totalWrapper">
  <img src="@/assets/logo.png" class="logo">
  <div class="header">어플라이는 이러한 서비스입니다.</div>
  <div class="explaination">
    어플라이는 이러한 서비스임! <br/>
    어플라이는 이러이러해서 좋다! <br/>
    어플라이는 이러한 서비스임! <br/>
    어플라이는 이러이러해서 좋다! <br/>
    어플라이는 이러한 서비스임! <br/>
  </div>
</div>
</template>
<script>
export default {

}
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include pageDefault();
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: pink;
  .logo {
    margin-top: 50px;
    width: 400px;
  }
  .header {
    font-size: $biggest-font-size;
    margin: 20px 0 50px 0;
    text-align: center;
  }
  .explaination {
    font-size: $big-font-size;
    text-align: center;
  }
}
</style>
