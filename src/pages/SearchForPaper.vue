<template lang=''>
<div class="searchTotalWrapper">
  <v-toolbar
    color="purple"
    dark
    tabs
  >
  <v-text-field
    class="mx-3"
    flat
    label="Search"
    prepend-inner-icon="search"
    solo-inverted
    style="margin-top: 20px;"
  ></v-text-field>
  <v-tabs
    slot="extension"
    v-model="tabs"
    centered
    color="transparent"
    slider-color="white"
  >
    <v-tab>리크루팅</v-tab>
    <v-tab>설문조사</v-tab>
  </v-tabs>
  </v-toolbar>
  <v-tabs-items v-model="tabs">
      <v-tab-item>
        <div class="tabItemsWrapper">
          <my-page-paper-tab type="participated" v-for="(n, index) in 6" :key="index" :participatedId="index" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" title="스팍스 2018 봄 지원 질문지"></my-page-paper-tab>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="tabItemsWrapper">
          <my-page-paper-tab type="participated" v-for="(n, index) in 6" :key="index" :participatedId="index" deadline="2018-06-07 04:25" url="https://zabo.sparcs.org/zabo/96" title="스팍스 2018 봄 지원 질문지"></my-page-paper-tab>
        </div>
      </v-tab-item>
    </v-tabs-items>
</div>
</template>
<script>
import MyPagePaperTab from "@/components/MyPagePaperTab";

export default {
  data() {
    return {
      text: "hey!",
      tabs: ""
    };
  },
  components: {
    MyPagePaperTab
  },
  watch: {
    tabs() {
      console.log(this.tabs);
    }
  }
};
</script>
<style lang='scss' scoped>
.searchTotalWrapper {
  @include marginPage();
  top: 80px;
  .tabItemsWrapper {
    background-color: #ececec;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 20px;
    margin-bottom: 100px;
  }
}
</style>
