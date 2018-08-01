<template lang=''>
<div v-if="!loading" class="createdTotalWrapper">
  <div class="row">
    <div class="headingWrapper">
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
  <div v-show="selectedTab == 1" class="row">
    <div class="column">
      <div class="paperTabs">
        <span @click="selectedPaperTab = 1" :class="selectedPaperTab == 1 ? 'selectedPaperTab paperTab' : 'paperTab'" >개별 응답</span>
        <span @click="selectedPaperTab = 2" :class="selectedPaperTab == 2 ? 'selectedPaperTab paperTab' : 'paperTab'">통계</span>
      </div>
      <div class="paperWrapper">
        <paper-answer-form :disabled="true" v-for="(question, index) in questions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers.sync="finalAnswers[selectedUser][index]"></paper-answer-form>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">상태 관리 창</span>
      </div>
      <div class="manageTabWrapper">
        <div v-for="(participate, index) in participates" :key="index" @click="selectedUser = index" class="singleUserWrapper">
          <span :class="selectedUser == index ?'selectedUser nickName' : 'nickName'">{{participate.author.nickName}}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-show="selectedTab == 2" class="row">
    <div class="column">
      <div class="singleMailTextWrapper">
        <v-textarea
          label="합격자에게 보내는 메일"
          outline
          auto-grow
          :value="passedUsersMail"
          class="mailText"
          color="green"
        ></v-textarea>
      </div>
      <div class="singleMailTextWrapper">
        <v-textarea
          label="불합격자에게 보내는 메일"
          outline
          auto-grow
          :value="failedUsersMail"
          class="mailText"
          color="red"
        ></v-textarea>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">상태 관리 창</span>
      </div>
      <div class="manageTabWrapper">
        <div v-for="(participate, index) in participates" :key="index" @click="selectedUser = index" class="singlePassWrapper">
          <span :class="selectedUser == index ?'selectedUser nickName' : 'nickName'">{{participate.author.nickName}}</span>
          <span @click="passList[index].type = 1" :class="passList[index].type == 1 ? 'passSpan greenPassSpan' : 'passSpan'">합격</span>
          <span @click="passList[index].type = 2" :class="passList[index].type == 2 ? 'passSpan redPassSpan' : 'passSpan'">불합격</span>
          <span @click="passList[index].type = 3" :class="passList[index].type == 3 ? 'passSpan normalPassSpan' : 'passSpan'">미정</span>
        </div>
      </div>
      <div class="MailTabWrapper">
        <button class="MailTab">합격자들에게 메일 보내기</button>
        <button class="MailTab">불합격자들에게 메일 보내기</button>
      </div>
    </div>
  </div>
</div>
<div v-else>
  로딩!
</div>
</template>
<script>
import PaperAnswerForm from "@/components/PaperAnswerForm";
import axios from "@/axios-auth";

export default {
  data() {
    return {
      selectedTab: 1,
      selectedPaperTab: 1,
      selectedUser: 0,
      participates: [],
      questions: [],
      title: "",
      answers: [],
      finalAnswers: [],
      loading: true,
      passList: [],
      passedUsersMail: "",
      failedUsersMail: ""
    };
  },
  components: {
    PaperAnswerForm
  },
  created() {
    axios({
      url: `/api/papers/${this.$route.params.paperId}/admin/`,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { participates, questions, title } = res.data;
      console.log(res.data, participates, questions, title);
      this.participates = participates;
      this.questions = questions;
      this.title = title;
      this.participates.map(participate => {
        this.passList.push({type: 1})
        this.answers.push(participate.answers);
      });
      this.finalAnswers = this.computedAnswers;
      this.loading = false;
    });
  },
  computed: {
    computedAnswers() {
      return this.answers.map(answerList => {
        return answerList.map(answer => {
          if (answer.question.type == "C") {
            return {
              selects: answer.selects.map(select => {
                return select.choice.id;
              })
            };
          }
          if (answer.question.type == "R") {
            return {
              selects: answer.selects.map(select => {
                return select.choice.id;
              })
            };
          }
          if (answer.question.type == "O") {
            return {
              content: answer.content
            };
          }
        });
      });
      return this.answers.map(answer => {
        if (answer.question.type == "C") {
          return {
            selects: answer.selects.map(select => {
              return select.choice.id;
            })
          };
        }
        if (answer.question.type == "R") {
          return {
            selects: answer.selects.map(select => {
              return select.choice.id;
            })
          };
        }
        if (answer.question.type == "O") {
          return {
            content: answer.content
          };
        }
      });
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
    &:last-child, &:nth-child(2) {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 60px;
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
      @include breakPoint("phone") {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .column {
          width: 100%;
        }
      }
      @include breakPoint("tablet") {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .column {
          width: 100%;
        }
      }
      @include breakPoint("desktop") {
        .column {
          &:first-child {
            margin-right: 80px;
            flex: 3;
          }
          &:last-child {
            flex: 2;
          }
        }
      }
      .column {
        &:first-child {
          .singleMailTextWrapper {
            margin-top: 10px;
            .mailText {
              font-family: "NanumSquare", sans-serif;
            }
          }
        }
        &:last-child {
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
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 20px;
            .singleUserWrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 100px;
              height: 35px;
              width: 25%;
              cursor: pointer;
              &:hover {
                .profileImage {
                  @include smallBoxShadow();
                }
              }
              .profileImage {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                transition: all 0.3s ease-in-out;
              }
              .nickName {
                font-size: $normal-font-size;
                font-weight: $big-font-weight;
              }
              .selectedUser {
                color: $theme-color;
              }
            }
            .singlePassWrapper {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              min-width: 100px;
              height: 35px;
              width: 45%;
              .nickName {
                margin-right: 8px;
                font-size: $normal-font-size;
                font-weight: $big-font-weight;
              }
              .passSpan {
                font-size: $normal-font-size;
                font-weight: $normal-font-weight;
                cursor: pointer;
                margin-right: 4px;
                &:last-child {
                  margin-right: 0;
                }
              }
              .greenPassSpan {
                font-weight: $big-font-weight;
                color: $green-color;
              }
              .redPassSpan {
                font-weight: $big-font-weight;
                color: $red-color;
              }
              .normalPassSpan {
                font-weight: $big-font-weight;
                color: $font-black-dark;
              }
            }
          }
          .MailTabWrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            .MailTab {
              @include largeButton(green);
              margin-top: 12px;
              text-align: center;
              &:last-child {
                @include largeButton(red);
              }
            }
          }
        }
      }
    }
  }
}
</style>
