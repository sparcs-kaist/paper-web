<template lang=''>
<div id="createIntro">
  <div v-show="currentTotalState == 'start'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">페이퍼 정보 | </span>
        <span class="essential"> *필수 항목</span>
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
        <form-wrapper v-intro="'페이퍼의 제목을 입력하는 란입니다.'" :required="true" :toggle="false" type="text" :margin="true" title="제목" placeholder="제목을 입력하세요." :content.sync="title" ></form-wrapper>
        <form-wrapper v-intro="'페이퍼의 날짜 기한(데드라인)을 입력하는 란입니다. 데드라인을 넘은 페이퍼는 자동으로 모집이 종료됩니다.'" v-intro-step="2" :required="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content.sync="time" ></form-wrapper>
        <form-wrapper v-intro="'페이퍼에 대한 설명을 1500자 이내로 적어주세요.'" v-intro-step="3" :required="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명(1500자 이내)" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content.sync="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <div v-intro="'페이퍼를 설명할 수 있는 URL을 넣어주세요. 자보의 URL을 넣으시면 해당하는 자보의 미니뷰가 생성됩니다.'" v-intro-step="4">
          <form-wrapper :required="false" :toggle="false" type="text" :margin="true" title="페이퍼 설명 URL(자보 미니뷰)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content.sync="url" ></form-wrapper>
          <mini-view :url="url"></mini-view>
        </div>
        <button v-if="StartFormValidation" @click="currentTotalState = 'end' " class="goNext">질문지 만들러 가기</button>
        <button v-intro="'모든 필수란을 채우셔야 질문지를 생성하실 수 있습니다.'" v-intro-step="5" v-else @click="notYetWarn" class="notYet">필수란들을 채워주세요</button>
      </div>
    </div>
  </div>
  <div id="createScreenshot" v-show="currentTotalState == 'end'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="currentTotalState = 'start'" class="arrowIcon">mdi-arrow-left</v-icon>질문지 작성</span>
      </div>
    </div>
    <div class="row">
      <div v-intro-hint="'버튼을 클릭하시면 새로운 질문들을 추가하실 수 있습니다.'" v-intro-hint-position="'top-right'" class="column">
        <paper-input-form v-if="!reRender" v-for="(question, index) in questions" :key="index" :index="index" :margin="true" @deleteQuestion="deleteQuestion(index)" :isMultiple.sync="question.is_multiple" :choices.sync="question.choices" :content.sync="question.content" :type.sync="question.type"></paper-input-form>
        <button @click="addQuestion" class="addQuestion">+ 질문 추가</button>
      </div>
      <div class="column">
        <div class="manageTitleWrapper">
          <span class="manageTitle">유의 사항</span>
        </div>
        <div v-intro-hint="'페이퍼 생성시 유의사항들입니다. 꼭 유의사항들을 숙지하시고 페이퍼를 생성해주시길 바랍니다.'" v-intro-hint-position="'top-right'" class="manageTabWrapper">
          <div class="singleManagement">한번 생성한 질문지는 수정할 수 없습니다.</div>
          <div class="singleManagement">원작자의 승낙 없이 복사/복제/변경 등의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.</div>
        </div>
        <button v-show="EndFormValidation" @click="submitPaper" class="goNext">질문지 생성하기</button>
        <button v-show="!EndFormValidation" @click="notYetWarn" class="notYet">모든 란을 채워주세요</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import FormWrapper from "@/components/FormWrapper";
import MiniView from "@/components/MiniView";
import PaperInputForm from "@/components/PaperInputForm";
import html2canvas from "html2canvas";
import axios from "@/axios-auth";

function getCanvasBlob(canvas) {
  return new Promise(function(resolve, reject) {
    canvas.toBlob(function(blob) {
      resolve(blob);
    });
  });
}

export default {
  data() {
    return {
      selectedCategory: "recruiting",
      title: "",
      explaination: "",
      time: "",
      url: "",
      currentTotalState: "start",
      questions: [
        // {
        //   content: "",
        //   choices: [
        //     {
        //       option: ""
        //     }
        //   ],
        //   type: "C",
        //   is_multiple: true
        // }
      ],
      reRender: false
    };
  },
  components: {
    FormWrapper,
    MiniView,
    PaperInputForm
  },
  mounted() {
    if (this.onBoardingState) {
      this.$intro("#createIntro").start(); // start the guide
    }
  },
  computed: {
    StartFormValidation() {
      if (this.title == "") {
        return false;
      }
      if (this.explaination == "") {
        return false;
      }
      if (this.time == "") {
        return false;
      }
      return true;
    },
    onBoardingState() {
      return this.$store.getters.onBoardingState.create;
    },
    EndFormValidation() {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].content == "") {
          return false;
        }
        if (this.questions[i].type != "O") {
          for (let j = 0; j < this.questions[i].choices.length; j++) {
            if (this.questions[i].choices[j].option == "") {
              return false;
            }
          }
        }
      }
      return true;
    }
  },
  beforeDestroy() {
    this.$intro().hideHints();
  },
  methods: {
    notYetWarn() {
      alert("필수 란을 채우셔야 제출하실 수 있습니다.");
    },
    deleteQuestion(index) {
      let newQuestions = [];
      for (let i = 0; i < this.questions.length; i++) {
        if (i != index) {
          newQuestions.push(this.questions[i]);
        }
      }
      this.questions = newQuestions;
      this.reRender = true;
      this.$nextTick(() => {
        this.reRender = false;
      });
    },
    submitPaper() {
      // this.$router.push({ name: "CreateSubmitted" })
      let file = null;
      let formData = new FormData();
      html2canvas(document.querySelector("#createScreenshot")).then(canvas => {
        var blob = getCanvasBlob(canvas);
        blob.then(blob => {
          file = new File([blob], `sbagi${Date.now()}`, {
            type: "image/jpeg",
            lastModified: Date.now()
          });
          formData.append("title", this.title);
          formData.append("content", this.explaination);
          formData.append("poster_url", this.url);
          formData.append("preview_image", file);
          formData.append("questions", JSON.stringify(this.questions));
          formData.append(
            "deadline",
            this.time.split("T")[0] + " " + this.time.split("T")[1]
          );
          axios({
            url: "/api/papers/",
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: sessionStorage.getItem("token")
            },
            data: formData
          }).then(res => {
            if (res.status == 201) {
              this.$router.push({
                name: "CreateSubmitted",
                params: { paperId: res.data.paper }
              });
            } else {
              console.warn("post is not been done! Error occured!");
            }
          });
        });
      });
    },
    addQuestion() {
      this.questions.push({
        content: "",
        choices: [{ option: "" }],
        type: "C",
        is_multiple: true
      });
    }
  },
  watch: {
    currentTotalState(val) {
      if (val == "end") {
        if (this.onBoardingState) {
          setTimeout(() => {
            this.$intro("#createIntro").showHints(); // show hints
            this.$store.commit("END_ONBOARDING", "create"); // end the guide
          }, 500);
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
    top: 90px;
    left: 5%;
    right: 5%;
  }
  @include breakPoint("tablet") {
    top: 90px;
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
      @include breakPoint("phone") {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      @include breakPoint("tablet") {
        align-items: center;
      }
      @include breakPoint("desktop") {
        align-items: center;
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
            font-size: $normal-font-size;
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
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin: 10px 0;
              font-size: $h1-font-size;
              text-align: center;
              @include breakPoint("phone") {
                font-size: $h2-font-size;
              }
              font-weight: $big-font-weight;
            }
          }
          .goNext {
            @include largeButton(theme);
            margin-top: 12px;
          }
          .notYet {
            @include largeButton(red);
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>
