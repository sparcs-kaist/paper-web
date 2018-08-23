<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <div class="formTitleWrapper">
      <v-text-field class="formTitle" disabled label="질문" outline v-model="formTitle"></v-text-field>
    </div>
    <v-radio-group v-intro-hint="'라디오 버튼'" v-intro-hint-position="'top-right'" v-model="finalAnswer.selects" v-if="optionsType == 'R'" class="optionsWrapper">
      <v-radio color="black" :disabled="disabled" v-for="(option, index) in inputOptions" :key="index" style="height: 40px; margin: 0; padding: 0;" @click.native="$emit('update:answers', computedAnswers)" :label="option.option" :value="option.id"></v-radio>
    </v-radio-group>
    <div v-intro-hint="'체크박스'" v-intro-hint-position="'top-right'">
      <div v-for="(option, index) in inputOptions" :key="index" v-if="optionsType == 'C'" class="optionsWrapper">
        <v-checkbox color="black" :disabled="disabled" style="height: 40px; margin: 0; padding: 0;" @click.native="$emit('update:answers', computedAnswers)" v-model="finalAnswer.selects" :label="option.option" :value="option.id"></v-checkbox>
      </div>
    </div>
    <textarea v-intro-hint="'장문'" v-intro-hint-position="'top-right'" :disabled="disabled" v-if="optionsType == 'O'" @change="emit" class="textArea" placeholder="장문형 텍스트" v-model="finalAnswer.content"/>
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
    this.$emit("update:answers", this.computedAnswers);
    if (this.onBoardingState) {
      setTimeout(() => {
        this.$intro().showHints(); // show hints
      }, 200);
    }
  },
  computed: {
    onBoardingState() {
      return this.$store.getters.onBoardingState.participate;
    },
    computedAnswers() {
      if (this.type == "O") {
        return {
          content: this.finalAnswer.content
        };
      } else if (this.type == "R") {
        return {
          selects: [{ choice: this.finalAnswer.selects }]
        };
      } else if (this.type == "C") {
        if (this.finalAnswer.selects.length > 0) {
          return {
            selects: this.finalAnswer.selects.map(ans => {
              return {
                choice: ans
              };
            })
          };
        }
      }
    }
  },
  methods: {
    emit() {
      console.log(this.computedAnswers);
      this.$emit("update:answers", this.computedAnswers);
    },
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // margin-bottom: 12px;
    width: 100%;
    .formTitle {
      font-size: $normal-font-size;
      font-weight: $big-font-weight;
      width: 100%;
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
        &:first-child {
          margin-left: 0;
        }
        @include breakPoint("phone") {
          font-size: $small-font-size;
        }
        .optionSpan {
          color: $font-black-light;
          font-weight: $big-font-weight;
          // min-width: 78px;
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
    &:first-child {
      margin-left: 0;
    }
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
  @include breakPoint("phone") {
    margin-top: 10px;
  }
}
</style>