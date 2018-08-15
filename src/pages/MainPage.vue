<template lang=''>
<div class="totalWrapper">
  <div class="header"><span class="theme">페이퍼</span>는 카이스트 리크루팅 및 설문조사 서비스입니다.</div>
  <div class="explaination">
    페이퍼 이용방법을 보고싶으시다면 아래 버튼을 눌러주세요.
  </div>
  <button @click="menuOnboarding" class="onBoardingButton">
    메뉴 설명 보러가기
  </button>
  <button @click="createOnboarding" class="onBoardingButton">
    페이퍼 생성하는법 보러가기
  </button>
  <button @click="participateOnboarding" class="onBoardingButton">
    페이퍼 참여하는법 보러가기
  </button>
</div>
</template>
<script>
export default {
  methods: {
    menuOnboarding () {
      this.$store.commit("START_ONBOARDING", 'menu');
    },
    createOnboarding () {
      this.$store.commit("START_ONBOARDING", 'create');
      this.$router.push({name: "CreatePaper"})
    },
    participateOnboarding () {
      this.$store.commit("START_ONBOARDING", 'participate');
      this.$router.push({name: "ParticipatePaper", params: {PaperId: 38}})
    },
  },
  mounted () {
    this.$store.commit("END_ONBOARDING", 'participate');
    this.$store.commit("END_ONBOARDING", 'create');
    this.$store.commit("END_ONBOARDING", 'menu');
  }
};
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include pageDefault();
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: pink;
  background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url("../assets/white_wood.jpg") no-repeat center center fixed;
  background-size: cover;
  .header {
    font-size: $small-max-font-size;
    margin: 20px 0 20px 0;
    text-align: center;
    .theme {
      color: $theme-color;
      font-weight: $big-font-weight;
    }
  }
  .explaination {
    font-size: $big-font-size;
    text-align: center;
    margin-bottom: 30px;
  }
  .onBoardingButton {
    @include largeButton(theme);
    width: 50%;
    margin-top: 20px;
    border-radius: 2px;
  }
  @include breakPoint('phone') {
    .header {
      font-size: $big-font-size;
    }
    .explaination {
      font-size: $normal-font-size;
    }
    .onBoardingButton {
      width: 80%;
      font-size: $h2-font-size;
    }
  }
  @include breakPoint('tablet') {
    .onBoardingButton {
      width: 80%;
      font-size: $h2-font-size;
    }
  }
}
</style>
