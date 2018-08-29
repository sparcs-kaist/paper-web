<template lang=''>
<div id="participateIntro">
<div v-if="!loading && timeValid">
  <div v-if="currentTotalState == 'start'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">{{title}} |</span>
      </div>
      <div class="categoryWrapper">
        <span class="categoryHeading">카테고리 : </span>
        <span class="label">리크루팅</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <form-wrapper v-intro="'페이퍼의 날짜 기한(데드라인)입니다. 제출하신 질문지는 기한이 만료되기 전까지 마이페이지에서 수정이 가능합니다.'" v-intro-step="2" :disabled="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content="time" ></form-wrapper>
        <form-wrapper v-intro="'페이퍼의 설명입니다.'" v-intro-step="3" :disabled="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="페이퍼 설명 URL(자보 미니뷰)" placeholder="URL이 존재하지 않습니다." :content="url" ></form-wrapper>
        <mini-view v-intro="'페이퍼의 설명 링크 중 자보에 해당하는 URL이 있을 시 미니뷰가 표시됩니다.'" v-intro-step="4" :url="url"></mini-view>
        <button v-intro="'버튼을 누르시면 질문지를 작성하러 가실 수 있습니다.'" v-intro-step="5" @click="currentTotalState = 'end' " class="goNext">질문지 작성</button>
      </div>
    </div>
  </div>
  <div id="participateScreenshot" v-if="currentTotalState == 'end'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="currentTotalState = 'start'" class="arrowIcon">mdi-arrow-left</v-icon>질문지 답변 작성</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <paper-answer-form :disabled="false" v-for="(question, index) in questions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers.sync="answers[index]"></paper-answer-form>
      </div>
      <div v-intro-hint="'질문지 제출시 유의사항들입니다. 꼭 유의사항들을 숙지하시고 질문지를 제출해주시기 바랍니다.'" v-intro-hint-position="'top-right'" class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">유의 사항</span>
        </div>
        <div class="manageTabWrapper">
          <div class="singleManagement">제출하신 질문지는 데드라인이 지날때까지 수정 가능합니다.</div>
          <div class="singleManagement">페이퍼에 대한 합격 / 불합격 메일을 받고싶으시다면 마이페이지에서 메일을 수정하시거나 등록해주세요.</div>
        </div>
        <button @click="submitPaper" class="goNext">답변 제출하기</button>
      </div>
    </div>
  </div>
</div>
<div class="loadingPaper" v-if="loading">
  <v-progress-circular
    indeterminate
    color="primary"
    class="ListWrapper"
  ></v-progress-circular>
</div>
<div class="expiredPaper" v-if="!loading && !timeValid ">
  <span class="expiredSpan">페이퍼 참여 기한이 넘었습니다.</span>
  <span class="expiredSpan">페이퍼 관리자에게 문의해주십시요.</span>
  <span class="emailSpan">관리자 이메일 : {{email}}</span>
</div>
</div>
</template>
<script>
import FormWrapper from "@/components/FormWrapper";
import MiniView from "@/components/MiniView";
import PaperAnswerForm from "@/components/PaperAnswerForm";
import html2canvas from "html2canvas";
import axios from "@/axios-auth";

export default {
  data() {
    return {
      selectedCategory: "recruiting",
      title: "",
      explaination: "",
      time: "",
      url: "",
      currentTotalState: "start",
      questions: [],
      answers: [],
      loading: true,
      email: "",
      localOnBoardingState: false
    };
  },
  mounted() {
    this.localOnBoardingState = this.onBoardingState;
    axios({
      method: "get",
      url: `/api/papers/${this.$route.params.PaperId}/`
    }).then(res => {
      if (res.status == 200) {
        this.title = res.data.title;
        this.explaination = res.data.content;
        this.questions = res.data.questions;
        this.url = res.data.poster_url;
        this.email = res.data.author.email;
        this.time =
          res.data.deadline.split(" ")[0] +
          "T" +
          res.data.deadline.split(" ")[1];
        res.data.questions.map(question => {
          if (question.type == "C") {
            this.answers.push({
              selects: []
            });
          } else if (question.type == "O") {
            this.answers.push({
              content: ""
            });
          } else if (question.type == "R") {
            this.answers.push({
              selects: []
            });
          }
        });
        this.loading = false;
        setTimeout(() => {
          if (this.localOnBoardingState) {
            this.$intro("#participateIntro").start(); // start the guide
            this.$store.commit("END_ONBOARDING", "participate"); // end the guide
          }
        }, 200);
      }
    });
  },
  beforeDestroy() {
    this.$intro().hideHints();
  },
  components: {
    FormWrapper,
    MiniView,
    PaperAnswerForm
  },
  methods: {
    submitPaper() {
      axios({
        method: "post",
        url: "/api/participates/",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        data: {
          paper: this.$route.params.PaperId,
          answers: JSON.stringify(this.answers)
        }
      }).then(res => {
        if (res.status == 201) {
          this.$router.push({ name: "ParticipateSubmitted" });
        }
      });
    },
    addQuestion() {
      this.questions.push({
        title: "",
        options: [""]
      });
    }
  },
  computed: {
    timeValid() {
      var today = new Date();
      return this.time > today.toISOString().substring(0, 16);
    },
    onBoardingState() {
      return this.$store.getters.onBoardingState.participate;
    }
  },
  watch: {
    currentTotalState(val) {
      if (val == "end") {
        if (this.localOnBoardingState) {
          setTimeout(() => {
            this.$intro("#participateIntro").showHints(); // show hints
          }, 200);
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.totalWrapper {
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
      @include breakPoint("phone") {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .headingWrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .headingTitle {
          font-size: $big-font-size;
          font-weight: $big-font-weight;
          display: flex;
          align-items: center;
          .arrowIcon {
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .essential {
          font-size: $normal-font-size;
          color: $essential-color;
          margin-left: 5px;
        }
        @include breakPoint("phone") {
          .headingTitle {
            font-size: $h1-font-size;
            font-weight: $big-font-weight;
            .arrowIcon {
              font-size: 24px;
            }
          }
          margin-bottom: 12px;
        }
      }
      .categoryWrapper {
        @include breakPoint("desktop") {
          margin-left: 40px;
        }
        @include breakPoint("tablet") {
          margin-left: 30px;
        }
        .categoryHeading {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
        }
        .radio {
          margin-left: 15px;
        }
        .label {
          font-size: $normal-font-size;
        }
      }
    }
    &:last-child {
      margin-bottom: 68px;
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
        @include footerRegardingMargin();
        &:first-child {
          .addQuestion {
            @include largeButton(green);
            margin-top: 12px;
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
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            padding: 20px;
            .singleManagement {
              margin: 10px 0;
              font-size: $h1-font-size;
              font-weight: $big-font-weight;
              text-align: center;
              @include breakPoint("phone") {
                font-size: $h2-font-size;
              }
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
.loadingPaper {
  @include marginPage();
  bottom: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.expiredPaper {
  @include marginPage();
  bottom: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .expiredSpan {
    font-size: $biggest-font-size;
    font-weight: $big-font-weight;
    &:first-child {
      margin-bottom: 20px;
    }
  }
  .emailSpan {
    margin-top: 20px;
    font-size: $big-font-size;
    font-weight: $normal-font-weight;
  }
}
</style>
