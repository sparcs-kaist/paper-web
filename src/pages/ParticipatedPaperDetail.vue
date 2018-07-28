<template lang=''>
<div class="createdTotalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <v-icon class="arrowIcon">mdi-arrow-left</v-icon>
      <span class="headingTitle">스팍스 2018 봄 지원 설문지</span>
    </div>
    <div class="tabsWrapper">
      <div :class="selectedTab == 1 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
        <span class="singleTabSpan">응답</span>
        <span class="singleTabSpan">56</span>
      </div>
      <div :class="selectedTab == 2 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
        <span class="singleTabSpan">메일링</span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <div class="paperTabs">
        <span class="paperTab">개별 응답</span>
        <span class="paperTab">통계</span>
      </div>
      <div class="paperWrapper">
        <paper-answer-form v-for="(question, index) in questions" :key="index" :margin="true" :options.sync="question.options" :title.sync="question.title" :type="question.type" :choice.sync="question.choice"></paper-answer-form>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">상태 관리 창</span>
      </div>
      <div class="manageTabWrapper">
        <div class="singleUserWrapper">
          <img src="#" class="profileImage">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import PaperAnswerForm from "@/components/PaperAnswerForm";

export default {
  data() {
    return {
      selectedTab: 1,
      questions: [
        {
          title: "왜 이 동아리에 지원하셨나요?",
          options: [
            {
              id: 1,
              content: "심심해서"
            },
            {
              id: 2,
              content: "너무 멋있어서"
            }
          ],
          ismultiple: true,
          type: "checkbox",
          choice: []
        },
        {
          title: "왜 이 동아리에 지원하셨나요?",
          options: [
            {
              id: 1,
              content: "심심해서"
            },
            {
              id: 2,
              content: "너무 멋있어서"
            }
          ],
          ismultiple: false,
          type: "radio",
          choice: []
        }
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
.createdTotalWrapper {
  @include marginPage();
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    &:first-child {
      align-items: center;
      .headingWrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .arrowIcon {
          margin-right: 10px;
          cursor: pointer;
        }
        .headingTitle {
          font-size: $big-font-size;
          font-weight: $big-font-weight;
        }
      }
      .tabsWrapper {
        width: 230px;
        height: 40px;
        margin-left: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 3px solid #ececec;
        .singleTabWrapper {
          flex: 1;
          height: 40px;
          font-size: $h1-font-size;
          display: flex;
          justify-content: center;
          align-items: center;
          .singleTabSpan:nth-child(2) {
            color: white;
            background-color: $transparent-black-dark;
            padding: 5px 10px;
            margin-left: 8px;
            border-radius: 3px;
          }
        }
        .selectedTab {
          border-bottom: 3px solid $theme-color;
          color: $theme-color;
          font-weight: $big-font-weight;
          .singleTabSpan:nth-child(2) {
            background-color: $theme-color;
          }
        }
      }
    }
  }
}
</style>
