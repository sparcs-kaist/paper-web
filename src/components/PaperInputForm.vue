<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <div class="formTitleWrapper">
      <div class="titleWrapper">
        <v-text-field class="formTitle" label="질문" outline @change.native="$emit('update:content', formTitle)" v-model="formTitle"></v-text-field>
        <v-icon @click="$emit('deleteQuestion')" large>mdi-delete-outline</v-icon>
      </div>
      <div class="tabsWrapper">
        <div @click="selectType('C')" class="singleTabWrapper">
          <v-icon :color="optionsType == 'C' ? 'purple darken-2' : ''">mdi-checkbox-marked-outline</v-icon>
          <span :class="optionsType == 'C' ? 'themeSpan' : ''">체크박스</span>
        </div>
        <div @click="selectType('R')"  class="singleTabWrapper">
          <v-icon :color="optionsType == 'R' ? 'purple darken-2' : ''">mdi-radiobox-marked</v-icon>
          <span :class="optionsType == 'R' ? 'themeSpan' : ''">객관식 질문</span>
        </div>
        <div @click="selectType('O')"  class="singleTabWrapper">
          <v-icon :color="optionsType == 'O' ? 'purple darken-2' : ''">mdi-text</v-icon>
          <span :class="optionsType == 'O' ? 'themeSpan' : ''">주관식</span>
        </div>
      </div>
    </div>
    <div v-for="(option, index) in inputChoices" :key="index" v-if="optionsType == 'R'" class="optionsWrapper">
      <v-icon>mdi-radiobox-blank</v-icon>
      <v-text-field single-line regular :label="'옵션' + `${index}`" @keyup.enter="addOption($event, index)" @change.native="$emit('update:choices', inputChoices)" v-model="inputChoices[index].option"></v-text-field>
      <v-icon @click="deleteOption(index)" medium>mdi-close-circle-outline</v-icon>
    </div>
    <div v-for="(option, index) in inputChoices" :key="index" v-if="optionsType == 'C'" class="optionsWrapper">
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-text-field @keyup.enter="addOption($event, index)" single-line regular :label="'옵션' + `${index}`" @change.native="$emit('update:choices', inputChoices)" v-model="inputChoices[index].option"></v-text-field>
      <v-icon @click="deleteOption(index)" medium>mdi-close-circle-outline</v-icon>
    </div>
    <textarea v-if="optionsType == 'O'" disabled class="textArea" placeholder="장문형 텍스트" />
  </div>
</template>
<script>
export default {
  props: {
    content: String,
    choices: Array,
    type: String,
    textarea: Boolean,
    margin: Boolean,
    required: Boolean,
    toggle: Boolean,
    isMultiple: Boolean,
    index: Number
  },
  data() {
    return {
      toggleState: false,
      optionsType: "",
      inputChoices: [],
      formTitle: "",
      is_multiple: false
    };
  },
  created() {
    this.optionsType = this.type;
    this.formTitle = this.content;
    this.inputChoices = this.choices;
    this.is_multiple = this.isMultiple;
  },
  methods: {
    selectType(name) {
      this.optionsType = name;
      switch (this.optionsType) {
        case "O":
          this.is_multiple = false;
        case "R":
          this.is_multiple = false;
        case "C":
          this.is_multiple = true;
      }
      if (this.optionsType == "O") {
        this.inputChoices = [{ option: "" }];
      }
      this.$emit("update:type", this.optionsType);
      this.$emit("update:isMultiple", this.is_multiple);
    },
    addOption(event, index) {
      if (this.inputChoices.length == index + 1) {
        this.inputChoices.push({ option: "" });
        setTimeout(() => {
          document
            .getElementsByClassName("formWrapper")
            [this.index + 4].getElementsByClassName("optionsWrapper")
            [
              document
                .getElementsByClassName("formWrapper")
                [this.index + 4].getElementsByClassName("optionsWrapper")
                .length - 1
            ].getElementsByTagName("input")[0]
            .focus();
        }, 50);
      } else {
        event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling
          .getElementsByTagName("input")[0]
          .focus();
      }
    },
    deleteOption(index) {
      let newInputChoices = [];
      for (let i = 0; i < this.inputChoices.length; i++) {
        if (i != index) {
          newInputChoices.push(this.inputChoices[i]);
        }
      }
      this.inputChoices = newInputChoices;
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 12px;
    .titleWrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .formTitle {
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
        width: 100%;
      }
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
      .singleTabWrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
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
    // margin-left: 10px;
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
  margin-top: 20px;
}
</style>