<template lang=''>
  <div class="totalWrapper">
    <span class="replyWrapper">페이퍼를 성공적으로 생성하셨습니다.</span>
    <span class="urlWrapper">질문지 공유 URL : https://paper.sparcs.org/paper/participate/{{$route.params.paperId}}</span>
    <div class="tabWrapper">
      <span @click="routing('Main')" class="tabs">메인으로 돌아가기</span>
      <span @click="routing('MyPage')" class="tabs">마이페이지 가기</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    routing(str) {
      if (str == "Main") {
        this.$router.push({ name: "MainPage" });
      }
      if (str == "MyPage") {
        this.$router.push({ name: "MyPage" });
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.totalWrapper {
  @include marginPage();
  bottom: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include breakPoint("phone") {
    left: 5%;
    right: 5%;
  }
  @include breakPoint("tablet") {
    left: 5%;
    right: 5%;
  }
  .replyWrapper {
    font-size: $small-max-font-size;
    font-weight: $big-font-weight;
    text-align: center;
  }
  .urlWrapper {
    margin-top: 20px;
    font-size: $normal-font-size;
    text-align: center;
  }
  .tabWrapper {
    width: 100%;
    display: flex;
    margin-top: 30px;
    .tabs {
      flex: 1;
      font-size: $big-font-size;
      color: $font-black-light;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      &:first-child {
        text-align: right;
        padding-right: 10px;
      }
      &:last-child {
        text-align: left;
        padding-left: 10px;
      }
      &:hover {
        color: $font-black-dark;
      }
    }
  }
}
</style>