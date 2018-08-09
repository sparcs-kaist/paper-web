<template lang=''>
<div class="totalWrapper">
  <div class="row">
    <div class="tabsWrapper">
      <div :class="selectedTab == 1 ? 'selectedTab tab' : 'tab'" @click="selectTab(1)"><span class="tabSpan">생성한 페이퍼</span></div>
      <div :class="selectedTab == 2 ? 'selectedTab tab' : 'tab'" @click="selectTab(2)"><span class="tabSpan"> 참여한 페이퍼</span></div>
    </div>
    <div v-if="createdPapers.length == 0 || createdPapers == []" v-show="selectedTab == 1" class="contentWrapper">
      <span>생성한 페이퍼가 없습니다.</span>
    </div>
    <div v-else v-show="selectedTab == 1" class="contentWrapper">
      <my-page-paper-tab type="created" v-for="(paper, index) in createdPapers" :key="index" :createdId="paper.id" :deadline="paper.deadline" :url="paper.preview_image_thumbnail" :title="paper.title"></my-page-paper-tab>
    </div>
    <div v-if="participatedPapers.length == 0 || participatedPapers == []" v-show="selectedTab == 2" class="contentWrapper">
      <span>참여한 페이퍼가 없습니다.</span>
    </div>
    <div v-else v-show="selectedTab == 2" class="contentWrapper">
      <my-page-paper-tab type="participated" v-for="(paper, index) in participatedPapers" :key="index" :participatedId="paper.id" :deadline="paper.paper.deadline" :url="paper.paper.preview_image_thumbnail" :title="paper.paper.title"></my-page-paper-tab>
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
    this.$store.dispatch("setCreatedPapers");
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
    },
    createdPapers() {
      return this.$store.getters.createdPapers;
    }
  }
};
</script>
<style lang='scss' scoped>
.totalWrapper {
  @include marginPage();
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  .row {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
      flex: 1;
      width: 100%;
      background-color: #ececec;
      margin-top: 25px;
      padding: 25px 20px;
      // max-height: 650px;
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
</style>
