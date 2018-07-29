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
        <paper-answer-form :disabled="true" v-for="(question, index) in selectedQuestion" :key="index" :margin="true" :options="question.options" :title="question.title" :type="question.type" :choice="question.choice"></paper-answer-form>
      </div>
    </div>
    <div class="column">
      <div class="manageTitleWrapper">
        <span class="manageTitle">상태 관리 창</span>
      </div>
      <div class="manageTabWrapper">
        <div v-for="(user, index) in users" :key="index" @click="selectedUser = index" class="singleUserWrapper">
          <img src="@/assets/userProfile.jpg" class="profileImage">
          <span :class="selectedUser == index ?'selectedUser nickName' : 'nickName'">{{user.nickName}}</span>
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
      selectedUser: 0,
      selectedQuestion: [],
      users: [
        {
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
        },
        {
          nickName: "jara",
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
                  content: "테스트용으로"
                },
                {
                  id: 2,
                  content: "만든놈임."
                }
              ],
              ismultiple: false,
              type: "radio",
              choice: []
            }
          ]
        },
        {
          nickName: "joyb",
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
                  content: "테스트용으로"
                },
                {
                  id: 2,
                  content: "만든놈임."
                }
              ],
              ismultiple: false,
              type: "radio",
              choice: []
            }
          ]
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
