<template lang=''>
<div v-if="!loading" class="createdTotalWrapper">
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
        <paper-answer-form :disabled="true" v-for="(question, index) in questions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers.sync="finalAnswers[selectedUser][index]"></paper-answer-form>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">상태 관리 창</span>
      </div>
      <div class="manageTabWrapper">
        <div v-for="(participate, index) in participates" :key="index" @click="selectedUser = index" class="singleUserWrapper">
          <img :src="participate.author.profile_image" class="profileImage">
          <span :class="selectedUser == index ?'selectedUser nickName' : 'nickName'">{{participate.author.nickName}}</span>
        </div>
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
      loading: true
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
              justify-content: flex-start;
              // margin-bottom: ;
              min-width: 100px;
              height: 35px;
              width: 30%;
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
                margin-left: 8px;
                font-size: $normal-font-size;
                font-weight: $big-font-weight;
              }
              .selectedUser {
                color: $theme-color;
              }
            }
          }
        }
      }
    }
  }
}
</style>
