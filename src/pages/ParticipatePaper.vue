<template lang=''>
<div v-if="!loading">
  <div v-show="currentTotalState == 'start'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">페이퍼 정보 |</span>
      </div>
      <div class="categoryWrapper">
        <span class="categoryHeading">카테고리 </span>
        <input name="recruiting" type="radio" class="radio" value="recruiting" v-model="selectedCategory"/>
        <label for="recruiting" class="label" >리크루팅</label>
        <input disabled name="survey" type="radio" class="radio" value="survey" v-model="selectedCategory"/>
        <label for="survey" class="label" >설문 조사</label>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="제목" placeholder="제목을 입력하세요." :content="title" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content="time" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명(1500자 이내)" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="페이퍼 설명 URL(자보 미니뷰)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content="url" ></form-wrapper>
        <mini-view :url="url"></mini-view>
        <button @click="currentTotalState = 'end' " class="goNext">질문지 작성하러 가기</button>
      </div>
    </div>
  </div>
  <div id="participateScreenshot" v-show="currentTotalState == 'end'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="currentTotalState = 'start'" class="arrowIcon">mdi-arrow-left</v-icon>질문지 답변 작성</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <paper-answer-form v-for="(question, index) in questions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers.sync="answers[index]"></paper-answer-form>
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
        <button @click="submitPaper" class="goNext">답변 제출하기</button>
      </div>
    </div>
  </div>
</div>
<div v-else>
  <v-progress-circular
    indeterminate
    color="primary"
    class="ListWrapper"
  ></v-progress-circular>
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
      url: "https://zabo.sparcs.org/zabo/98",
      currentTotalState: "start",
      questions: [],
      answers: [],
      loading: true
    };
  },
  mounted() {
    axios({
      method: "get",
      url: `/api/papers/${this.$route.params.PaperId}/`
    }).then(res => {
      console.log(res.data.title);
      // if (res.status == 200) {
      this.title = res.data.title;
      this.explaination = res.data.content;
      this.questions = res.data.questions;
      // this.url = res.url;
      this.time =
        res.data.deadline.split(" ")[0] + "T" + res.data.deadline.split(" ")[1];
      res.data.questions.map(question => {
        console.log(this.answers)
        console.log(question)
        if (question.type == "C") {
          this.answers.push({
              selects: []
            })
        } else if (question.type == "O") {
          this.answers.push({
              content: ""
            })
        } else if (question.type == "R") {
          this.answers.push({
              selects: []
            })
        }
      })
      console.log(this.answers)
      this.loading = false;
      // }
    });
  },
  components: {
    FormWrapper,
    MiniView,
    PaperAnswerForm
  },
  methods: {
    submitPaper() {
      axios({
        method: 'post',
        url: '/api/participates/',
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        data: {
          paper: this.$route.params.PaperId,
          answers: JSON.stringify(this.answers)
        }
      }).then(res => {
        if (res.status == 201) {
          this.$router.push({ name: "CreateSubmitted" })
        }
      })
    },
    addQuestion() {
      this.questions.push({
        title: "",
        options: [""]
      });
      console.log(this.questions);
    }
  }
};
</script>
<style lang='scss' scoped>
.totalWrapper {
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
      }
      .categoryWrapper {
        margin-left: 20px;
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
