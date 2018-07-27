<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <div class="formTitleWrapper">
      <span class="formTitle">{{title}}<span class="requiredSpan" v-show="required">*</span></span>
        <v-switch @click.native="clearInput" v-if="toggle" color="success" style="padding: 0;margin-top: 0px; max-height: 20px; " label="포함하기" v-model="toggleState"></v-switch>
    </div>
    <input :disabled="!toggleState" v-if="!textarea" :type="type" @change="$emit('update:content', input)" v-model="input" :placeholder="placeholder" />
    <textarea maxlength="1500" v-model="input" class="textArea" @change="$emit('update:content', input)" :placeholder="placeholder" v-else />
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    placeholder: String,
    content: String,
    type: String,
    textarea: Boolean,
    margin: Boolean,
    required: Boolean,
    toggle: Boolean,
  },
  data () {
    return {
      input: "",
      toggleState: false
    }
  },
  created () {
    this.input = this.content;
  },
  methods: {
    clearInput () {
      if (!this.toggleState) {
        this.input = "";
        this.$emit('update:content', this.input)
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
    font-size: $h1-font-size;
    font-weight: $big-font-weight;
    min-width: 180px;
    }
    .requiredSpan {
      margin-left: 10px;
      margin-right: 20px;
      font-size: $h2-font-size;
      color: $essential-color;
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
    height: 400px;
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
