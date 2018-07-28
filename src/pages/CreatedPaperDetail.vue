<template lang=''>
<div class="createdTotalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <v-icon class="arrowIcon">mdi-arrow-left</v-icon>
      <span class="headingTitle">스팍스 2018 봄 지원 설문지</span>
    </div>
    <div class="tabsWrapper">
      <div @click="selectedTab = 1" :class="selectedTab == 1 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
        <span class="singleTabSpan">응답</span>
        <span class="singleTabSpan">56</span>
      </div>
      <div @click="selectedTab = 2" :class="selectedTab == 2 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
        <span class="singleTabSpan">메일링</span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <div class="paperTabs">
        <span @click="selectedPaperTab = 1" :class="selectedPaperTab == 1 ? 'selectedPaperTab paperTab' : 'paperTab'" >개별 응답</span>
        <span @click="selectedPaperTab = 2" :class="selectedPaperTab == 2 ? 'selectedPaperTab paperTab' : 'paperTab'">통계</span>
      </div>
      <div class="paperWrapper">
        <paper-answer-form :disabled="true" v-for="(question, index) in questions" :key="index" :margin="true" :options="question.options" :title="question.title" :type="question.type" :choice="question.choice"></paper-answer-form>
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
      selectedPaperTab: 1,
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
  },
  components: {
    PaperAnswerForm
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
          cursor: pointer;
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
    &:last-child {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .paperTabs {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 30px;
        margin-bottom: -20px;
        margin-left: 10px;
        .paperTab {
          color: $font-black-light;
          font-size: $h1-font-size;
          font-weight: $normal-font-weight;
          cursor: pointer;
          &:first-child {
            margin-right: 16px;
          }
        }
        .selectedPaperTab {
          color: $font-black-dark;
          font-weight: $big-font-weight;
        }
      }
      .column {
        &:first-child {
          flex: 3;
        }
        &:last-child {
          flex: 2;
        }
      }
    }
  }
}
</style>
