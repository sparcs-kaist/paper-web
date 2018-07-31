<template lang=''>
  <div class="paperTabWrapper">
    <img @click="goToDetail" :src="url" class="imageWrapper">
    <div class="imageTitleWrapper">
      <span class="imageTitle">{{computedTitle}}</span>
      <span class="imageDeadline">{{deadline}}</span>
    </div>
    <div @click="modalState = !modalState" class="paperTabController">
      <v-icon color="grey darken-2">mdi-dots-vertical</v-icon>
    </div>
    <div v-show="modalState" v-if="type == 'participated'" class="tabModalWrapper">
      <div class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-square-edit-outline</v-icon>
        <router-link :to="`/user/participated/${participatedId}`" class="modalSpan">지원지 수정하기</router-link>
      </div>
    </div>
    <div v-show="modalState" v-else  class="tabModalWrapper">
      <div class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-delete</v-icon>
        <span class="modalSpan">삭제하기</span>
      </div>
      <div class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-link-variant</v-icon>
        <router-link :to="`/user/created/${createdId}`" class="modalSpan">지원지 관리하기</router-link>
      </div>
    </div>
    <div v-show="modalState" class="modalTabTriangle"></div>
    <div v-show="modalState" class="modalTabTriangle modalTabTriangleBorder"></div>
  </div>
</template>
<script>
export default {
  props: {
    image: String,
    title: String,
    deadline: String,
    url: String,
    createdId: Number,
    participatedId: Number,
    type: String
  },
  data() {
    return {
      modalState: false
    };
  },
  computed: {
    computedTitle() {
      return this.title.slice(0, 16) + "...";
    }
  },
  methods: {
    goToDetail() {
      console.log("why!");
      if (this.type == "participated") {
        this.$router.push({
          name: "ParticipatedPaperDetail",
          params: { paperId: this.participatedId }
        });
      }
      if (this.type == "created") {
        this.$router.push({
          name: "CreatedPaperDetail",
          params: { paperId: this.createdId }
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.paperTabWrapper {
  @include smallBoxShadow();
  position: relative;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 30px;
  cursor: pointer;
  .imageWrapper {
    width: 100%;
    height: 160px;
  }
  .imageTitleWrapper {
    width: 100%;
    height: 60px;
    color: $font-black-dark;
    padding: 12px 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .imageTitle {
      font-size: $h2-font-size;
      font-weight: $normal-font-weight;
    }
    .imageDeadline {
      font-size: $small-font-size;
      font-weight: $big-font-weight;
      margin-top: 8px;
    }
  }
  .paperTabController {
    position: absolute;
    top: 175px;
    right: -2px;
  }
  .tabModalWrapper {
    @include modalTabCss();
    z-index: 50;
    position: absolute;
    top: 220px;
    right: -80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    padding: 10px 0;
    .singleModalWrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      .modalIcon {
        margin-right: 8px;
      }
      .modalSpan {
        font-size: $normal-font-size;
        font-weight: $normal-font-weight;
      }
      a {
        font-size: $normal-font-size;
        font-weight: $normal-font-weight;
        color: $font-black-dark;
      }
    }
  }
  .modalTabTriangle {
    position: absolute;
    width: 0;
    height: 0;
    top: 210px;
    right: 0px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 10px solid #fafafa;
    z-index: 301;
  }
  .modalTabTriangleBorder {
    top: 209px;
    border-bottom: 10px solid #e0e0e0;
    z-index: 2;
  }
}
</style>
