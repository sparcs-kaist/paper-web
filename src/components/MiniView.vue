<template>
  <div class="viewWrapper">
    <div v-if="miniview" class="yesMiniView">
      <span class="miniViewSpan">미니뷰 띄워주기!</span>
    </div>
    <div v-else class="noMiniView">
      <span>
        페이퍼에 해당하는 자보나 아라의 게시물의 URL을<br /> 올려주시면 자동으로 미니뷰가 생성됩니다.
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: String
  },
  computed: {
    miniview () {
      var expUrl = /^http[s]?\:\/\//i;
      return expUrl.test(this.url)
    }
  },
}
</script>
<style lang="scss" scoped>
.yesMiniView{
  margin-top: 12px;
  @include smallBoxShadow();
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  .miniViewSpan {
    font-size: $big-font-size;
  }
}
.noMiniView {
  margin-top: 12px;
  @include smallBoxShadow();
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  .miniViewSpan {
    font-size: $big-font-size;
  }
}
</style>