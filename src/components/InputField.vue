<template lang=''>
  <input type="text" @change="$emit('update:content', this.input)" :placeholder="placeholder" />
</template>
<script>
export default {
  data () {
    return {
      input: ""
    }
  },
  props: {
    placeholder: String,
    content: String
  },
  created () {
    this.input = this.content;
  },
}
</script>
<style lang='scss' scoped>
input {
  width: 100%;
  padding: 5px 10px;
  font-size: 15px;
}
</style>
