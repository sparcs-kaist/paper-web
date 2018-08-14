<template lang=''>
<div>
  <div v-if="!loading && timeValid" class="createdTotalWrapper">
    <div class="row">
      <div class="headingWrapper">
        <span class="headingTitle">{{title}}</span>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="paperWrapper">
          <paper-answer-form :disabled="false" v-for="(question, index) in finalQuestions" :key="index" :margin="true" :choices="question.choices" :title="question.content" :type="question.type" :answers.sync="finalAnswers[index]"></paper-answer-form>
        </div>
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
import PaperAnswerForm from "@/components/PaperAnswerForm";
import axios from "@/axios-auth";

export default {
  data() {
    return {
      paperId: null,
      nickName: "sbagi",
      answers: [],
      finalAnswers: [],
      loading: true,
      title: "",
      time: "",
      email: ""
    };
  },
  computed: {
    timeValid() {
      var today = new Date();
      console.log(this.time, today.toISOString().substring(0, 16));
      return this.time > today.toISOString().substring(0, 16);
    },
    computedAnswers() {
      return this.answers.map(answer => {
        if (answer.question.type == "C") {
          return {
            selects: answer.selects.map(select => {
              return select.choice.id;
            })
          };
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
    },
    finalQuestions() {
      return this.answers.map(answer => {
        return {
          content: answer.question.content,
          type: answer.question.type,
          is_multiple: answer.question.is_multiple,
          choices: answer.question.choices
        };
      });
    }
  },
  components: {
    PaperAnswerForm
  },
  created() {
    axios({
      method: "get",
      url: `/api/participates/${this.$route.params.participatedId}/`,
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.answers = res.data.answers;
      this.finalAnswers = this.computedAnswers;
      this.paperId = res.data.paper.id;
      this.title = res.data.paper.title;
      this.time = res.data.paper.deadline.split(' ')[0] + "T" + res.data.paper.deadline.split(' ')[0];
      this.email = res.data.author.email;
      this.loading = false;
    });
  },
  methods: {
    submitPaper() {
      console.log(this.finalAnswers);
      axios({
        method: "put",
        url: `/api/participates/${this.$route.params.participatedId}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        data: {
          paper: `${this.paperId}`,
          answers: JSON.stringify(this.finalAnswers)
        }
      }).then(res => {
        if (res.status == 200) {
          this.$router.push({ name: "ParticipatedPaperEdit" });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.createdTotalWrapper {
  @include marginPage();
  @include breakPoint('phone') {
    left: 5%;
    right: 5%;
  }
  @include breakPoint('tablet') {
    left: 5%;
    right: 5%;
  }
  @include breakPoint('desktop') {
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
        @include breakPoint('phone'){
          .headingTitle {
            font-size: $normal-font-size;
            font-weight: $big-font-weight;
          }
        }
      }
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
