<template lang=''>
<div>
  <div v-show="currentTotalState == 'start'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">페이퍼 정보 | </span>
        <span class="essential"> *필수 항목</span>
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
        <form-wrapper :required="true" :toggle="false" type="text" :margin="true" title="제목" placeholder="제목을 입력하세요." :content.sync="title" ></form-wrapper>
        <form-wrapper :required="true" :toggle="false" type="datetime-local" :margin="true" title="날짜 기한(Deadline)" placeholder="제목을 입력하세요." :content.sync="time" ></form-wrapper>
        <form-wrapper :required="true" :toggle="false" type="text" :textarea="true" :margin="true" title="페이퍼 설명(1500자 이내)" placeholder="이 어플라이에 대한 설명을 입력해주세요." :content.sync="explaination" ></form-wrapper>
      </div>
      <div class="column">
        <form-wrapper :required="true" :toggle="true" type="text" :margin="true" title="URL(자보, 아라)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content.sync="url" ></form-wrapper>
        <mini-view :url="url"></mini-view>
        <button @click="currentTotalState = 'end' " class="goNext">질문지 만들러 가기</button>
      </div>
    </div>
  </div>
  <div v-show="currentTotalState == 'end'" class="totalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle"><v-icon @click="currentTotalState = 'start'" class="arrowIcon">mdi-arrow-left</v-icon>질문지 작성</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <paper-input-form v-for="(question, index) in questions" :key="index" :margin="true" :options.sync="question.options" :title.sync="question.title" :type="question.type"></paper-input-form>
        <button @click="addQuestion" class="addQuestion">+ 질문 추가</button>
      </div>
      <div class="column">
        <form-wrapper :toggle="true" type="text" :margin="true" title="URL(자보, 아라)" placeholder="ex) https://zabo.sparcs.org/zabo/24" :content.sync="url" ></form-wrapper>
        <button @click="submitPaper" class="goNext">질문지 생성하기</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import FormWrapper from '@/components/FormWrapper';
import MiniView from '@/components/MiniView';
import PaperInputForm from '@/components/PaperInputForm';

export default {
  data () {
    return {
      selectedCategory: "",
      title: "",
      explaination: "",
      time: "",
      url: "",
      currentTotalState: "start",
      questions: [
        {
          title: '',
          options: [''],
          type: ''
        }
      ],
    }
  },
  components: {
    FormWrapper,
    MiniView,
    PaperInputForm
  },
  methods: {
    submitPaper () {
      this.$router.push({ name: "CreateSubmitted" })
    },
    addQuestion () {
      this.questions.push({
        title: '',
        options: [''],
      })
      console.log(this.questions);
    }
  },
}
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
        margin-left: 40px;
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
        margin-bottom: 100px;
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
