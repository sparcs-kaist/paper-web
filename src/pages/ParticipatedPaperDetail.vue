<template lang=''>
<div class="createdTotalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <v-icon class="arrowIcon">mdi-arrow-left</v-icon>
      <span class="headingTitle">스팍스 2018 봄 지원 설문지</span>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <div class="paperWrapper">
        <paper-answer-form v-for="(question, index) in questions" :key="index" :margin="true" :options.sync="question.options" :title.sync="question.title" :type="question.type" :choice.sync="question.choice"></paper-answer-form>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">유의 사항</span>
      </div>
      <div class="manageTabWrapper">
        <div class="singleManagement">다음과 같은 유의사항이 있습니다.</div>
        <div class="singleManagement">다음과 같은 유의사항이 있습니다.</div>
        <div class="singleManagement">다음과 같은 유의사항이 있습니다.</div>
      </div>
      <button @click="submitPaper" class="goNext">질문지 생성하기</button>
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
      selectedUser: 0,
      selectedQuestion: [],
      nickName: "sbagi",
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
  },
  created() {
    this.selectedQuestion = this.users[this.selectedUser].questions;
  },
  watch: {
    selectedUser(val) {
      this.selectedQuestion = this.users[this.selectedUser].questions;
    },
    selectedQuestion() {
      console.log(this.selectedQuestion);
    }
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
    }
    &:last-child {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .column {
        &:first-child {
          flex: 3;
        }
        &:last-child {
          flex: 2;
          .manageTitleWrapper {
            margin-top: 30px;
            margin-bottom: 20px;
            .manageTitle {
              font-size: $h1-font-size;
              font-weight: $big-font-weight;
            }
          }
          .manageTabWrapper {
            @include modalTabCss();
            background-color: white;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            padding: 20px;
            .singleManagement {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin: 10px 0;
              font-size: $h1-font-size;
              font-weight: $big-font-weight;
            }
          }
          .goNext {
            @include largeButton(theme);
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>
