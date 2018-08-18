<template lang=''>
<div id="participateIntro">
<div v-if="!loading">
  <div class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="$router.go(-1)" class="arrowIcon">mdi-arrow-left</v-icon>{{title}} |</span>
      </div>
      <div class="categoryWrapper">
        <span class="categoryHeading">카테고리 : </span>
        <span class="label">리크루팅</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="참여 링크" placeholder="참여 링크" :content="`https://paper.sparcs.org/paper/participate/${$route.params.paperId}`" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content="time" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="페이퍼 설명 URL(자보 미니뷰)" placeholder="URL이 존재하지 않습니다." :content="url" ></form-wrapper>
        <mini-view :url="url"></mini-view>
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
      url: `/api/papers/${this.$route.params.paperId}/`
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.title = res.data.title;
        this.explaination = res.data.content;
        this.questions = res.data.questions;
        this.url = res.data.url;
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
  computed: {
    onBoardingState() {
      return this.$store.getters.onBoardingState.participate;
    }
  },
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
