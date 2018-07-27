<template lang=''>
<div class="totalWrapper">
  <div class="row">
    <img class="profileImage" src="@/assets/userProfile.jpg" >
    <div class="nickName">SPARCS</div>
    <div class="bio">SPARCS는 교양분관에 있는 웹 개발 동아리입니다.</div>
  </div>
  <div class="row">
    <div class="tabsWrapper">
      <div class="tab">생성한 어플라이</div>
      <div class="tab">참여한 어플라이</div>
    </div>
    <div class="contentWrapper">
      <my-page-paper-tab v-for="(n, index) in 6" :key="index" title="스팍스 2018 봄 지원 질문지"></my-page-paper-tab>
    </div>
  </div>
</div>
</template>
<script>
import MyPagePaperTab from '@/components/MyPagePaperTab';

export default {
  components: {
    MyPagePaperTab
  }
}
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include marginPage();
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 80px;
  .row {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    &:first-child {
      margin-bottom: 40px;
      .profileImage {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 15px;
      }
      .nickName {
        font-size: $biggest-font-size;
        font-weight: $big-font-weight;
        margin-bottom: 15px;
      }
      .bio {
        font-size: $normal-font-size;
      }
    }
    &:last-child {
      .tabsWrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        .tab {
          flex: 1;
          font-size: $big-font-size;
          &:first-child {
            text-align: right;
            margin-right: 15px;
          }
          &:last-child {
            text-align: left;
            margin-left: 15px;
          }
        }
      }
      .contentWrapper {
        width: 100%;
        background-color: gray;
        margin-top: 25px;
        padding: 25px 0;
        max-height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
