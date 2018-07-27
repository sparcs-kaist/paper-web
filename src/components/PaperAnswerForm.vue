<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <div class="formTitleWrapper">
      <v-text-field class="formTitle" single-line label="제목" outline style="font-size: 18px; height: 55px;" @change.native="$emit('update:title', formTitle)" v-model="formTitle"></v-text-field>
      <div class="tabsWrapper">
        <div class="singleTabWrapper">
          <v-icon :color="optionsType == 'checkbox' ? 'purple darken-2' : ''">mdi-checkbox-marked-outline</v-icon>
          <span :class="optionsType == 'checkbox' ? 'themeSpan' : ''">체크박스</span>
        </div>
        <div  class="singleTabWrapper">
          <v-icon :color="optionsType == 'radio' ? 'purple darken-2' : ''">mdi-radiobox-marked</v-icon>
          <span :class="optionsType == 'radio' ? 'themeSpan' : ''">객관식 질문</span>
        </div>
        <div class="singleTabWrapper">
          <v-icon :color="optionsType == 'longtext' ? 'purple darken-2' : ''">mdi-text</v-icon>
          <span :class="optionsType == 'longtext' ? 'themeSpan' : ''">주관식</span>
        </div>
      </div>
    </div>
    <v-radio-group v-if="optionsType == 'radio'" class="optionsWrapper">
      <v-radio v-for="(option, index) in inputOptions" :key="index" style="height: 50px; margin: 0;" @click.native="$emit('update:options', inputOptions)" :label="inputOptions[index].content" :value="inputOptions[index].content"></v-radio>
    </v-radio-group>
    <div v-for="(option, index) in inputOptions" :key="index" v-if="optionsType == 'checkbox'" class="optionsWrapper">
      <v-checkbox style="height: 50px; margin: 0;" @click.native="$emit('update:options', inputOptions)" v-model="inputOptions.choice" :label="inputOptions[index].content" :value="inputOptions[index].content"></v-checkbox>
    </div>
    <textarea v-if="optionsType == 'longtext'" disabled class="textArea" placeholder="장문형 텍스트" :value="inputOptions[0]"/>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    options: Array,
    type: String,
    textarea: Boolean,
    margin: Boolean,
    required: Boolean,
    toggle: Boolean,
  },
  data () {
    return {
      toggleState: false,
      optionsType: "",
      inputOptions: [],
      formTitle: ""
    }
  },
  created () {
    console.log(this.optionsType)
    this.optionsType = this.type;
    this.formTitle = this.title;
    this.inputOptions = this.options;
  },
  methods: {
    selectType (name) {
      this.optionsType = name;
    },
    addOption (event, index) {
      if (this.inputOptions.length == index + 1) {
        this.inputOptions.push("")
        setTimeout(() => { document.getElementsByClassName("optionsWrapper")[document.getElementsByClassName("optionsWrapper").length - 1].getElementsByTagName('input')[0].focus() }, 50);
      } else {
        event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName('input')[0].focus()
      }
    }
  }
}
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
    margin-bottom: 12px;
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
      .singleTabWrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 20px;
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
    font-weight: $small-font-weight;
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
  margin-top: 35px;
}
</style>