<template lang=''>
<div>
  <div v-if="!loading" class="createdTotalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="$router.go(-1)" class="arrowIcon">mdi-arrow-left</v-icon>{{title}}</span>
      </div>
      <div class="tabsWrapper">
        <div @click="selectedTab = 1" :class="selectedTab == 1 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
          <span class="singleTabSpan">응답</span>
          <span v-if="participates.length != 0" class="singleTabSpan">{{computedAnswers.length}}</span>
          <span v-else class="singleTabSpan">0</span>
        </div>
        <div @click="selectedTab = 2" :class="selectedTab == 2 ? 'singleTabWrapper selectedTab' : 'singleTabWrapper'">
          <span class="singleTabSpan">메일링</span>
        </div>
      </div>
    </div>
    <div v-if="participates.length != 0 &&  selectedTab == 1" class="row">
      <div class="column">
        <div class="paperTabs">
          <span @click="selectedPaperTab = 1" :class="selectedPaperTab == 1 ? 'selectedPaperTab paperTab' : 'paperTab'" >개별 응답</span>
          <span @click="selectedPaperTab = 2" :class="selectedPaperTab == 2 ? 'selectedPaperTab paperTab' : 'paperTab'">통계</span>
        </div>
        <div v-show="selectedPaperTab == 1" class="paperWrapper">
          <paper-answer-form v-if="reRender == false && computedAnswers != undefined" :disabled="true" v-for="(question, index) in questions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers="computedAnswers[individualSelectedUser][index]"></paper-answer-form>
          <div class="noAnswers" v-else>답변이 존재하지 않습니다.</div>
        </div>
        <div v-show="selectedPaperTab == 2">
          <div class="noAnswers" v-if="computedAnswers == undefined">답변이 존재하지 않습니다.</div>
        </div>
        <chart v-for="(data, index) in finalChartData" :key="index" :datasets="data.datasets" :labels="data.labels" style="margin-top: 50px;" v-if="selectedPaperTab == 2 && computedAnswers != undefined"></chart>
      </div>
      <div class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">상태 관리 창</span>
        </div>
        <div v-if="reRender == false && participates != []" class="manageTabWrapper">
          <div v-for="(participate, index) in participates" :key="index" @click="selectIndividualSelectedUser(index)" class="singleUserWrapper">
            <span :class="individualSelectedUser == index ?'selectedUser nickName' : 'nickName'">{{participate.author.nickName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="participates.length == 0 && selectedTab == 1" class="row">
      <div class="column">
        <div class="paperTabs">
          <span @click="selectedPaperTab = 1" :class="selectedPaperTab == 1 ? 'selectedPaperTab paperTab' : 'paperTab'" >개별 응답</span>
          <span @click="selectedPaperTab = 2" :class="selectedPaperTab == 2 ? 'selectedPaperTab paperTab' : 'paperTab'">통계</span>
        </div>
        <div v-show="selectedPaperTab == 1" class="paperWrapper">
          <div class="noAnswers">답변이 존재하지 않습니다.</div>
        </div>
      </div>
      <div class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">상태 관리 창</span>
        </div>
        <div v-if="reRender == false && participates != []" class="manageTabWrapper">
          <span>답변이 존재하지 않습니다.</span>
        </div>
      </div>
    </div>
    <div v-if="participates.length != 0 && selectedTab == 2" class="row">
      <div class="column">
        <div class="singleMailTextWrapper">
          <input placeholder="합격자에게 보내는 메일" v-model="passedUsersTitle" class="mailTitle"/>
          <textarea
            placeholder="합격자에게 보내는 메일"
            v-model="passedUsersMail"
            class="mailText"
          ></textarea>
        </div>
        <div class="singleMailTextWrapper">
          <input placeholder="합격자에게 보내는 메일" v-model="failedUsersTitle" class="mailTitle"/>
          <textarea
            placeholder="불합격자에게 보내는 메일"
            v-model="failedUsersMail"
            class="mailText"
          ></textarea>
        </div>
      </div>
      <div class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">상태 관리 창</span>
        </div>
        <div class="manageTabWrapper">
          <div v-for="(participate, index) in participates" :key="index" class="singlePassWrapper">
            <span class="nickName">{{participate.author.nickName}}</span>
            <span @click="passList[index].type = 1" :class="passList[index].type == 1 ? 'passSpan greenPassSpan' : 'passSpan'">합격</span>
            <span @click="passList[index].type = 2" :class="passList[index].type == 2 ? 'passSpan redPassSpan' : 'passSpan'">불합격</span>
            <!-- <span @click="passList[index].type = 3" :class="passList[index].type == 3 ? 'passSpan normalPassSpan' : 'passSpan'">미정</span> -->
          </div>
        </div>
        <div class="MailTabWrapper">
          <button @click="sendMail('pass')" class="MailTab">합격자들에게 메일 보내기</button>
          <button @click="sendMail('fail')" class="MailTab">불합격자들에게 메일 보내기</button>
        </div>
      </div>
    </div>
    <div class="row" v-if="participates.length == 0 && selectedTab == 2">
      <div class="column">
        <div class="singleMailTextWrapper">
          <input placeholder="합격자에게 보내는 메일" v-model="passedUsersTitle" class="mailTitle"/>
          <textarea
            placeholder="합격자에게 보내는 메일"
            v-model="passedUsersMail"
            class="mailText"
          ></textarea>
        </div>
        <div class="singleMailTextWrapper">
          <input placeholder="합격자에게 보내는 메일" v-model="failedUsersTitle" class="mailTitle"/>
          <textarea
            placeholder="불합격자에게 보내는 메일"
            v-model="failedUsersMail"
            class="mailText"
          ></textarea>
        </div>
      </div>
      <div class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">상태 관리 창</span>
        </div>
        <div class="manageTabWrapper">
          <span>유저가 존재하지 않습니다.</span>
        </div>
        <div class="MailTabWrapper">
          <button @click="sendMail('pass')" class="MailTab">합격자들에게 메일 보내기</button>
          <button @click="sendMail('fail')" class="MailTab">불합격자들에게 메일 보내기</button>
        </div>
      </div>
    </div>
  </div>
  <div class="createdTotalWrapper" v-else>
    로딩!
  </div>
</div>
</template>
<script>
import PaperAnswerForm from "@/components/PaperAnswerForm";
import Chart from "@/components/Chart";
import axios from "@/axios-auth";

export default {
  data() {
    return {
      selectedTab: 1,
      selectedPaperTab: 1,
      individualSelectedUser: 0,
      participates: [],
      questions: [],
      title: "",
      answers: [],
      loading: true,
      passList: [],
      passedUsersMail: "",
      failedUsersMail: "",
      passedUsersTitle: "",
      failedUsersTitle: "",
      reRender: false
    };
  },
  components: {
    PaperAnswerForm,
    Chart
  },
  created() {
    axios({
      url: `/api/papers/${this.$route.params.paperId}/admin/`,
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then(res => {
      const { participates, questions, title } = res.data;
      this.participates = participates;
      this.questions = questions;
      this.title = title;
      if (this.participates.length != 0) {
        this.participates.map(participate => {
          this.passList.push({ type: 1 });
          this.answers.push(participate.answers);
        });
      }
      this.loading = false;
    });
  },
  methods: {
    selectIndividualSelectedUser(num) {
      this.individualSelectedUser = num;
      this.reRender = true;
      this.$nextTick(() => {
        this.reRender = false;
      });
    },
    sendMail(type) {
      let emailList = [];
      if (type == "pass" && this.participates.length != 0) {
        for (let i = 0; i < this.passList.length; i++) {
          if (this.passList[i].type == 1) {
            emailList.push(this.participates[i].author.email);
          }
        }
        axios({
          method: "post",
          url: "/api/mails/",
          headers: {
            Authorization: sessionStorage.getItem("token")
          },
          data: {
            sender_address: this.currentUser.email,
            receivers_address: JSON.stringify(emailList)
              .split("[")[1]
              .split("]")[0],
            subject: this.passedUsersTitle,
            message: this.passedUsersMail
          }
        }).then(res => {
          if (res.status == 201) {
            alert("메일이 정상적으로 보내졌습니다.");
            this.passedUsersTitle = "";
            this.passedUsersMail = "";
          } else {
            alert("메일을 보내는데 실패하였습니다.");
          }
        });
      }
      if (type == "fail" && this.participates.length != 0) {
        for (let i = 0; i < this.passList.length; i++) {
          if (this.passList[i].type == 2) {
            emailList.push(this.participates[i].author.email);
          }
        }
        axios({
          method: "post",
          url: "/api/mails/",
          headers: {
            Authorization: sessionStorage.getItem("token")
          },
          data: {
            sender_address: this.currentUser.email,
            receivers_address: JSON.stringify(emailList)
              .split("[")[1]
              .split("]")[0],
            subject: this.failedUsersTitle,
            message: this.failedUsersMail
          }
        }).then(res => {
          if (res.status == 201) {
            alert("메일이 정상적으로 보내졌습니다.");
            this.failedUsersTitle = "";
            this.failedUsersMail = "";
          } else {
            alert("메일을 보내는데 실패하였습니다.");
          }
        });
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    computedAnswers() {
      if (this.answers.length > 0 && this.participates.length != 0) {
        return this.answers.map(answerList => {
          return answerList.map(answer => {
            if (answer.question.type == "C") {
              if (answer.selects.length > 0) {
                return {
                  selects: answer.selects.map(select => {
                    return select.choice.id;
                  })
                };
              }
            }
            if (answer.question.type == "R") {
              if (answer.selects.length > 0) {
                return {
                  selects: answer.selects[0].choice.id
                };
              }
            }
            if (answer.question.type == "O") {
              return {
                content: answer.content
              };
            }
          });
        });
      } else {
        return undefined;
      }
    },
    finalChartData() {
      let data = [];
      let newQuestions = [];
      if (this.participates.length != 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].type != "O") {
            newQuestions.push(this.questions[i]);
          }
        }
        for (let j = 0; j < newQuestions.length; j++) {
          data.push({
            labels: newQuestions[j].choices.map(choice => choice.option),
            datasets: [
              {
                label: newQuestions[j].content,
                backgroundColor: "#f87979",
                pointBackgroundColor: "white",
                borderWidth: 1,
                pointBorderColor: "#249EBF",
                //Data to be represented on y-axis
                data: this.dataArray[j]
              }
            ]
          });
        }
      }
      return data;
    },
    dataArray() {
      // Array Iinitialize
      let Compare = [];
      if (this.participates.length != 0) {
        for (let k = 0; k < this.questions.length; k++) {
          if (this.questions[k].type != "O") {
            Compare.push({
              choiceIds: this.questions[k].choices.map(choice => choice.option),
              datasets: this.questions[k].choices.map(choice => 0)
            });
          }
        }
        // Compare = [{questionIds: [10,31,35], datasets: [0,0,0]}, ...]
        this.answers.map(answer => {
          for (let j = 0; j < answer.length; j++) {
            if (answer[j].question.type != "O") {
              for (let i = 0; i < answer[j].selects.length; i++) {
                Compare[j].datasets[
                  Compare[j].choiceIds.indexOf(
                    answer[j].selects[i].choice.option
                  )
                ] += 1;
              }
            }
          }
        });
        let finalArray = Compare.map(compare => {
          return compare.datasets;
        });
        return finalArray;
      } else {
        return undefined;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.createdTotalWrapper {
  @include marginPage();
  @include breakPoint("phone") {
    left: 5%;
    right: 5%;
  }
  @include breakPoint("tablet") {
    left: 5%;
    right: 5%;
  }
  @include breakPoint("desktop") {
    top: 100px;
  }
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
        @include breakPoint("phone") {
          .headingTitle {
            font-size: $normal-font-size;
            font-weight: $big-font-weight;
          }
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
          @include breakPoint("phone") {
            font-size: $normal-font-size;
          }
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
    .paperTabs {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 30px;
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
    .paperWrapper {
      .noAnswers {
        margin-top: 40px;
        // margin-left: 10px;
        font-size: $h1-font-size;
      }
    }
    .noAnswers {
      margin-top: 40px;
      margin-left: 10px;
      font-size: $h1-font-size;
    }
    &:last-child {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 80px;
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
        .singleMailTextWrapper {
          margin-top: 10px;
          font-size: $h2-font-size;
          .mailTitle {
            width: 100%;
            padding: 10px;
            border: 1px solid $green-color;
            border-radius: 5px;
            margin-bottom: 5px;
            font-family: "NanumSquare", sans-serif;
            &:focus {
              outline: none;
            }
          }
          .mailText {
            width: 100%;
            min-height: 200px;
            font-family: "NanumSquare", sans-serif;
            border: 1px solid $green-color;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
            resize: none;
            &:focus {
              outline: none;
            }
          }
          &:last-child {
            .mailTitle,
            .mailText {
              border: 1px solid $red-color;
            }
          }
        }
        .manageTitleWrapper {
          margin-top: 30px;
          margin-bottom: 20px;
          .manageTitle {
            font-size: $h1-font-size;
            font-weight: $big-font-weight;
          }
          @include breakPoint("phone") {
            margin-top: 0;
            .manageTitle {
              font-size: $normal-font-size;
            }
          }
        }
        .manageTabWrapper {
          @include modalTabCss();
          background-color: white;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 20px;
          .singleUserWrapper {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 35px;
            padding-right: 20px;
            cursor: pointer;
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
            font-size: $normal-font-size;
            @include breakPoint("phone") {
              width: 100%;
              font-size: $h2-font-size;
            }
            .nickName {
              margin-right: 8px;
              font-weight: $big-font-weight;
            }
            .passSpan {
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
</style>
