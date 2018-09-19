<template lang=''>
  <v-dialog v-model="dialog" fullscreen hide-overlay>
    <v-card flat class="searchTotalWrapper">
      <v-toolbar
        color="purple"
        dark
        tabs
      >
        <v-btn icon @click="closeModal">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-text-field
          class="mx-3"
          flat
          label="Search"
          prepend-inner-icon="search"
          solo-inverted
          style="margin-top: 20px;"
          v-model="searchTerm"
          @keyup.enter="search"
        />
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
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            />
            <my-page-paper-tab v-else-if="papers.length !== 0" type="participate" v-for="(paper, index) in papers" :key="index" :participateId="paper.id" :deadline="paper.deadline" :url="paper.preview_image_thumbnail" :title="paper.title" />
            <div v-else-if="!initial" class="doesNotExist">
              <span>{{$t('페이퍼가 존재하지 않습니다.')}}</span>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>
<script>
import MyPagePaperTab from "@/components/MyPagePaperTab";
import axios from "@/axios-auth";

export default {
  props: ['dialog'],
  data() {
    return {
      text: "hey!",
      tabs: "",
      searchTerm: "",
      papers: [],
      loading: false,
      initial: true
    };
  },
  components: {
    MyPagePaperTab
  },
  methods: {
    closeModal() {
      this.$emit('closeSearchModal');
    },
    search() {
      this.initial = false;
      if (this.searchTerm != "") {
        this.loading = true;
        axios.get(`/api/papers/?search=${this.searchTerm}`).then(res => {
          this.papers = res.data.data;
          this.loading = false;
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.searchTotalWrapper {
  .tabItemsWrapper {
    background-color: #fff;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px 20px;
    @include scrollBarDark(small);
    @include breakPoint("phone") {
      justify-content: space-around;
    }
    .doesNotExist {
      width: 100%;
      height: 100px;
      font-size: $big-font-size;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @include breakPoint('phone') {
      .doesNotExist{
        font-size: $h2-font-size;
      }
    }
  }
}
</style>
