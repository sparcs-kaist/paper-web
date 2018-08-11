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
    v-model="searchTerm"
    @keyup.enter="search"
  ></v-text-field>
  <v-tabs
    slot="extension"
    v-model="tabs"
    centered
    color="transparent"
    slider-color="white"
  >
    <v-tab>리크루팅</v-tab>
  </v-tabs>
  </v-toolbar>
  <v-tabs-items v-model="tabs">
    <v-tab-item>
      <div class="tabItemsWrapper">
        <my-page-paper-tab v-if="papers != [] && !loading" type="participate" v-for="(paper, index) in papers" :key="index" :participateId="paper.id" :deadline="paper.deadline" :url="paper.preview_image_thumbnail" :title="paper.title"></my-page-paper-tab>
      </div>
    </v-tab-item>
  </v-tabs-items>
</div>
</template>
<script>
import MyPagePaperTab from "@/components/MyPagePaperTab";
import axios from '@/axios-auth';

export default {
  data() {
    return {
      text: "hey!",
      tabs: "",
      searchTerm: "",
      papers: [],
      loading: false
    };
  },
  components: {
    MyPagePaperTab
  },
  methods: {
    search () {
      this.loading = true;
      axios.get(`/api/papers/?search=${this.searchTerm}`)
        .then(res => {
          this.papers = res.data.data;
          this.loading = false;
        })
    }
  }
};
</script>
<style lang='scss' scoped>
.searchTotalWrapper {
  @include marginPage();
  @include breakPoint('phone') {
    left: 5%;
    right: 5%;
  }
  @include breakPoint('tablet') {
    left: 5%;
    right: 5%;
  }
  @include breakPoint('desktop') {
    top: 80px;
  }
  .tabItemsWrapper {
    background-color: #ececec;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 20px;
    margin-bottom: 100px;
    max-height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    @include scrollBarDark(small);
    @include breakPoint('phone') {
      justify-content: center;
    }
  }
}
</style>
