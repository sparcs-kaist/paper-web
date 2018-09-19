<template lang=''>
  <div v-if="notDeleted" class="paperTabWrapper">
    <img @click="goToDetail" :src="url" class="imageWrapper">
    <div class="imageTitleWrapper">
      <span class="imageTitle">{{computedTitle}}</span>
      <span class="imageDeadline">{{deadline}}</span>
    </div>
    <div @click="modalState = !modalState" v-show="type != 'participate'" class="paperTabController">
      <v-icon color="grey darken-2">mdi-dots-vertical</v-icon>
    </div>
    <div v-show="modalState" v-if="type == 'participated'" class="tabModalWrapper">
      <div v-show="!deleteModalState" class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-square-edit-outline</v-icon>
        <router-link :to="`/user/participated/${participatedId}`" class="modalSpan">지원지 수정하기</router-link>
      </div>
      <div v-show="!deleteModalState" @click="deleteModalState = true" class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-delete</v-icon>
        <span class="modalSpan">지원 취소하기</span>
      </div>
      <div v-show="deleteModalState" class="singleModalWrapper deleteModal">
        <div class="modalSpan">정말로 취소하시겠습니까?</div>
        <div>
          <span class="modalSpan" @click="deleteParticipated">예</span>
          <span class="modalSpan" @click="deleteModalState = false">아니오</span>
        </div>
      </div>
    </div>
    <div v-show="modalState" v-else  class="tabModalWrapper">
      <div v-show="!deleteModalState" @click="deleteModalState = true" class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-delete</v-icon>
        <span class="modalSpan">페이퍼 삭제하기</span>
      </div>
      <div v-show="!deleteModalState" class="singleModalWrapper">
        <v-icon class="modalIcon">mdi-content-paste</v-icon>
        <router-link :to="`/user/created/manage/${createdId}`" class="modalSpan">페이퍼 관리하기</router-link>
      </div>
      <div v-show="deleteModalState" class="singleModalWrapper deleteModal">
        <div class="modalSpan">정말로 삭제하시겠습니까?</div>
        <div>
          <span class="modalSpan" @click="deleteCreatedPaper">예</span>
          <span class="modalSpan" @click="deleteModalState = false">아니오</span>
        </div>
      </div>
    </div>
    <div v-show="modalState" class="modalTabTriangle"></div>
    <div v-show="modalState" class="modalTabTriangle modalTabTriangleBorder"></div>
  </div>
  <div v-else>
  </div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  props: {
    image: String,
    title: String,
    deadline: String,
    url: String,
    createdId: Number,
    participatedId: Number,
    participateId: Number,
    type: String
  },
  data() {
    return {
      modalState: false,
      deleteModalState: false,
      notDeleted: true
    };
  },
  computed: {
    computedTitle() {
      return this.title.slice(0, 20) + "...";
    }
  },
  methods: {
    goToDetail() {
      if (this.type == "participated") {
        this.$router.push({
          name: "ParticipatedPaperDetail",
          params: { participatedId: this.participatedId }
        });
      }
      if (this.type == "created") {
        this.$router.push({
          name: "CreatedPaperInfo",
          params: { paperId: this.createdId }
        });
      }
      if (this.type == "participate") {
        this.$router.push({
          name: "ParticipatePaper",
          params: { PaperId: this.participateId }
        });
      }
    },
    deleteCreatedPaper() {
      if (this.type == "created") {
        axios({
          method: "delete",
          url: `/api/papers/${this.createdId}/`,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          if (res.status == 204) {
            this.deleteModalState = false;
            this.modalState = false;
            this.notDeleted = false;
          }
        });
      }
    },
    deleteParticipated() {
      if (this.type == "participated") {
        axios({
          method: "delete",
          url: `/api/participates/${this.participatedId}/`,
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res => {
          if (res.status == 204) {
            this.deleteModalState = false;
            this.modalState = false;
            this.notDeleted = false;
          }
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
    width: 220px;
    padding: 10px 0;
    .singleModalWrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      &:first-child {
        margin-bottom: 8px;
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
    .deleteModal {
      flex-direction: column;
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
