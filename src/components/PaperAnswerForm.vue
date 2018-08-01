<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <div class="formTitleWrapper">
      <v-text-field class="formTitle" disabled single-line label="제목" outline style="font-size: 18px; max-height: 50px;" v-model="formTitle"></v-text-field>
      <div class="tabsWrapper">
        <div class="singleTabWrapper">
          <v-icon :color="optionsType == 'C' ? 'purple darken-2' : 'grey darken-1'">mdi-checkbox-marked-outline</v-icon>
          <span :class="optionsType == 'C' ? 'themeSpan optionSpan' : 'optionSpan'">체크박스</span>
        </div>
        <div class="singleTabWrapper">
          <v-icon :color="optionsType == 'R' ? 'purple darken-2' : 'grey darken-1'">mdi-radiobox-marked</v-icon>
          <span :class="optionsType == 'R' ? 'themeSpan optionSpan' : 'optionSpan'">객관식 질문</span>
        </div>
        <div class="singleTabWrapper">
          <v-icon :color="optionsType == 'O' ? 'purple darken-2' : 'grey darken-1'">mdi-text</v-icon>
          <span :class="optionsType == 'O' ? 'themeSpan optionSpan' : 'optionSpan'">주관식</span>
        </div>
      </div>
    </div>
    <v-radio-group v-model="finalAnswer.selects" v-if="optionsType == 'R'" class="optionsWrapper">
      <v-radio color="black" :disabled="disabled" v-for="(option, index) in inputOptions" :key="index" style="height: 40px; margin: 0; padding: 0;" @click.native="$emit('update:answers', computedAnswers)" :label="option.option" :value="option.id"></v-radio>
    </v-radio-group>
    <div v-for="(option, index) in inputOptions" :key="index" v-if="optionsType == 'C'" class="optionsWrapper">
      <v-checkbox color="black" :disabled="disabled" style="height: 40px; margin: 0; padding: 0;" @click.native="$emit('update:answers', computedAnswers)" v-model="finalAnswer.selects" :label="option.option" :value="option.id"></v-checkbox>
    </div>
    <textarea :disabled="disabled" v-if="optionsType == 'O'" @change.native="$emit('update:answers', computedAnswers)" class="textArea" placeholder="장문형 텍스트" v-model="finalAnswer.content"/>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    choices: Array,
    type: String,
    textarea: Boolean,
    margin: Boolean,
    required: Boolean,
    toggle: Boolean,
    disabled: Boolean,
    answers: Object
  },
  data() {
    return {
      toggleState: false,
      optionsType: "",
      inputOptions: [],
      formTitle: "",
      finalAnswer: null
    };
  },
  created() {
    this.optionsType = this.type;
    this.formTitle = this.title;
    this.inputOptions = this.choices;
    this.finalAnswer = this.answers;
    console.log(this.answers);
  },
  computed: {
    computedAnswers () {
      console.log(this.finalAnswer);
      if (this.type == "O") {
        return {
            content: this.finalAnswer.content
          }
      } else if (this.type == "R") {
        return {
            selects: this.finalAnswer.selects.map(ans => {
                return {
                  choice: ans
                }
              })
          }
      } else if (this.type == "C") {
        return {
            selects: this.finalAnswer.selects.map(ans => {
                return {
                  choice: ans
                }
              })
          }
      }
    }
  },
  methods: {
    addOption(event, index) {
      if (this.inputOptions.length == index + 1) {
        this.inputOptions.push("");
        setTimeout(() => {
          document
            .getElementsByClassName("optionsWrapper")
            [
              document.getElementsByClassName("optionsWrapper").length - 1
            ].getElementsByTagName("input")[0]
            .focus();
        }, 50);
      } else {
        event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling
          .getElementsByTagName("input")[0]
          .focus();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.formWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  .formTitleWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    .formTitle {
      font-size: $big-font-size;
      font-weight: $big-font-weight;
    }
    .requiredSpan {
      margin-left: 10px;
      margin-right: 20px;
      font-size: $h2-font-size;
      color: $essential-color;
    }
    .tabsWrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-height: 50px;
      .singleTabWrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 20px;
        &:nth-child(2) {
          margin-left: 5px;
        }
        .optionSpan {
          color: $font-black-light;
          font-weight: $big-font-weight;
          min-width: 78px;
        }
        .themeSpan {
          color: $theme-color;
          font-weight: $big-font-weight;
        }
      }
    }
  }
  .optionsWrapper {
    width: 100%;
    display: flex;
    margin-left: 10px;
    i {
      margin-right: 10px;
    }
  }
  .textArea {
    @include boxBorder(yes);
    width: 100%;
    padding: 8px 10px;
    font-size: $normal-font-size;
    font-weight: $normal-font-weight;
    resize: none;
    outline: none;
    height: 150px;
  }
  input {
    @include boxBorder(yes);
    width: 100%;
    padding: 8px 10px;
    font-size: $normal-font-size;
    outline: none;
  }
}
.marginTop {
  margin-top: 30px;
}
</style>