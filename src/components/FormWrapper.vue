<template lang=''>
  <div class="formWrapper" :class="margin && 'marginTop'">
    <span class="formTitle">
      {{title}}
    </span>
    <input v-if="!textarea" :type="type" @change="$emit('update:content', input)" v-model="input" :placeholder="placeholder" />
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
    margin: Boolean
  },
  data () {
    return {
      input: ""
    }
  },
  created () {
    this.input = this.content;
  }
}
</script>
<style lang='scss'>
.formWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  .formTitle {
    font-size: $h1-font-size;
    font-weight: $big-font-weight;
    margin-bottom: 12px;
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
