<template lang=''>
<div class="createdTotalWrapper">
  <div class="row">
    <div class="headingWrapper">
      <span class="headingTitle">스팍스 2018 봄 지원 설문지</span>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <div v-if="!loading" class="paperWrapper">
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
</template>
<script>
import PaperAnswerForm from "@/components/PaperAnswerForm";
import axios from "@/axios-auth";

export default {
  data() {
    return {
      paperId: null,
      nickName: "sbagi",
      answers: [
        {
          id: 39,
          question: {
            type: "C",
            content: "niaosvnosd",
            is_multiple: true
          },
          selects: [
            {
              choice: {
                id: 73,
                option: "adsvasb",
                _order: 3,
                question: 32
              }
            },
            {
              choice: {
                id: 72,
                option: "asdvion",
                _order: 2,
                question: 32
              }
            }
          ],
          content: null
        },
        {
          id: 40,
          question: {
            type: "O",
            content: "adfbadfbadfb",
            is_multiple: true
          },
          selects: [],
          content: "asdvsadv"
        }
      ],
      finalAnswers: [],
      loading: true
    };
  },
  computed: {
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
    },
    finalQuestions() {
      return this.answers.map(answer => {
        return {
          content: answer.question.content,
          type: answer.question.type,
          is_multiple: answer.question.is_multiple,
          choices: answer.selects.map(select => {
            return select.choice;
          })
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
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.answers = res.data.answers;
      this.finalAnswers = this.computedAnswers;
      this.paperId = res.data.paper.id;
      this.loading = false;
    });
  },
  mounted() {
    console.log(
      this.finalAnswers,
      this.finalQuestions,
      this.computedAnswers,
      this.paperId
    );
  },
  methods: {
    submitPaper() {
      axios({
        method: "put",
        url: `/api/participates/${this.$route.params.participatedId}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        data: {
          paper: this.paperId,
          answers: JSON.stringify(this.finalAnswers)
        }
      }).then(res => console.log(res));
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
    }
    &:last-child {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
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
</style>
