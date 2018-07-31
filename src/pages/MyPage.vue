<template lang=''>
<div class="totalWrapper">
  <div v-if="currentUser.nickName == undefined" class="row">
    <img class="profileImage" src="@/assets/userProfile.jpg" >
    <div class="nickName">SPARCS</div>
    <div class="bio">SPARCS는 교양분관에 있는 웹 개발 동아리입니다.</div>
  </div>
  <div v-else class="row">
    <img class="profileImage" :src="currentUser.profile_image" >
    <div class="nickName">{{currentUser.nickName}}</div>
    <div class="bio">{{currentUser.email}}</div>
  </div>
  <div v-if="participatedPapers.length == 0 || participatedPapers == []" class="row">
    <div class="tabsWrapper">
      <div :class="selectedTab == 1 ? 'selectedTab tab' : 'tab'" @click="selectTab(1)"><span class="tabSpan">생성한 어플라이</span></div>
      <div :class="selectedTab == 2 ? 'selectedTab tab' : 'tab'" @click="selectTab(2)"><span class="tabSpan"> 참여한 어플라이</span></div>
    </div>
    <div v-show="selectedTab == 1" class="contentWrapper">
      <my-page-paper-tab type="created" v-for="(n, index) in 6" :key="index" :createdId="index" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" title="스팍스 2018 봄 지원 질문지"></my-page-paper-tab>
    </div>
    <div v-show="selectedTab == 2" class="contentWrapper">
      <my-page-paper-tab type="participated" v-for="(n, index) in 6" :key="index" :participatedId="index" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" title="스팍스 2018 봄 지원 질문지"></my-page-paper-tab>
    </div>
  </div>
  <div v-else class="row">
    <div class="tabsWrapper">
      <div :class="selectedTab == 1 ? 'selectedTab tab' : 'tab'" @click="selectTab(1)"><span class="tabSpan">생성한 어플라이</span></div>
      <div :class="selectedTab == 2 ? 'selectedTab tab' : 'tab'" @click="selectTab(2)"><span class="tabSpan"> 참여한 어플라이</span></div>
    </div>
    <div v-show="selectedTab == 1" class="contentWrapper">
      <my-page-paper-tab type="created" v-for="(paper, index) in participatedPapers" :key="index" :createdId="paper.id" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" :title="paper.title"></my-page-paper-tab>
    </div>
    <div v-show="selectedTab == 2" class="contentWrapper">
      <my-page-paper-tab type="participated" v-for="(paper, index) in participatedPapers" :key="index" :participatedId="paper.id" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" :title="paper.title"></my-page-paper-tab>
    </div>
  </div>
</div>
</template>
<script>
import MyPagePaperTab from "@/components/MyPagePaperTab";

export default {
  components: {
    MyPagePaperTab
  },
  data() {
    return {
      selectedTab: 1
    };
  },
  created() {
    this.$store.dispatch("setParticipatedPapers");
  },
  methods: {
    selectTab(num) {
      this.selectedTab = num;
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    participatedPapers() {
      return this.$store.getters.participatedPapers;
    }
  }
};
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
      @include footerRegardingMargin();
      .tabsWrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        .tab {
          flex: 1;
          .tabSpan {
            font-size: $big-font-size;
            cursor: pointer;
          }
          &:first-child {
            text-align: right;
            margin-right: 15px;
          }
          &:last-child {
            text-align: left;
            margin-left: 15px;
          }
        }
        .selectedTab {
          font-weight: $big-font-weight;
          color: $theme-color;
        }
      }
      .contentWrapper {
        width: 100%;
        background-color: #ececec;
        margin-top: 25px;
        padding: 25px 20px;
        max-height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        @include scrollBarDark(small);
      }
    }
  }
}
</style>
