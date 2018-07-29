<template lang=''>
<div>
  <div v-show="currentTotalState == 'start'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">페이퍼 정보 |</span>
      </div>
      <div class="categoryWrapper">
        <span class="categoryHeading">카테고리 </span>
        <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
        <label for="recruiting" class="label" >리크루팅</label>
        <input name="recruiting" type="radio" class="radio" :value="selectedCategory"/>
        <label for="recruiting" class="label" >설문 조사</label>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="제목" placeholder="제목을 입력하세요." :content.sync="title" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content.sync="time" ></form-wrapper>
        <form-wrapper :disabled="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명(1500자 이내)" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content.sync="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <form-wrapper :disabled="true" :toggle="false" type="text" :margin="true" title="URL(자보, 아라)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content.sync="url" ></form-wrapper>
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
        <paper-answer-form v-for="(question, index) in questions" :key="index" :margin="true" :options.sync="question.options" :title.sync="question.title" :type="question.type" :choice.sync="question.choice"></paper-answer-form>
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
        <button @click="submitPaper" class="goNext">질문지 수정하기</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import FormWrapper from "@/components/FormWrapper";
import MiniView from "@/components/MiniView";
import PaperAnswerForm from "@/components/PaperAnswerForm";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      selectedCategory: "recruiting",
      title: "스팍스 리크루팅",
      explaination:
        "스팍스는 컴퓨터 동아리입니다. 스팍스는 컴퓨터 동아리입니다. 스팍스는 컴퓨터 동아리입니다.",
      time: "2018-01-01T01:03",
      url: "https://zabo.sparcs.org/zabo/98",
      currentTotalState: "start",
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
    FormWrapper,
    MiniView,
    PaperAnswerForm
  },
  methods: {
    submitPaper() {
      // this.$router.push({ name: "CreateSubmitted" })
      html2canvas(document.querySelector("#participateScreenshot")).then(
        canvas => {
          canvas.toBlob(
            function(blob) {
              console.log(
                new File([blob], `sbagi${Date.now()}`, {
                  type: blob.type,
                  lastModified: Date.now()
                })
              );
            },
            "image/jpeg",
            0.95
          );
        }
      );
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
      .column {
        @include footerRegardingMargin();
        &:first-child {
          flex: 3;
          margin-right: 80px;
          .addQuestion {
            @include largeButton(green);
            margin-top: 12px;
          }
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
