<template>
  <div class="totalWrapper">
    <div class="topLine"></div>
    <div class="headerWrapper">
      <div class="column">
        <img @click="mainPage" src="@/assets/logo.png" class="logo">
        <router-link to="/create">어플라이 생성하기</router-link>
        <router-link to="/participate">어플라이 참여하기</router-link>
      </div>
      <div class="column">
        <img src="@/assets/userProfile.jpg" class="profileImage">
        <span class="userName">userName</span>
        <v-icon medium sclass="arrowIcon">arrow_drop_down</v-icon>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  components: {
  },
  data () {
  },
  props: {
  },
  methods: {
    mainPage () {
      this.$router.push({ name: "" })
    }
  },
  computed: {
  }
};
</script>

<style lang='scss' scoped>
.totalWrapper {
  min-height: 64px;
  max-height: 64px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .topLine {
    height: 5px;
    width: 100%;
    background-color: #393f5a;
  }
  .headerWrapper {
    width: 100%;
    height: 59px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    .column {
      height: 59px;
      display: flex;
      align-items: center;
      &:first-child {
        justify-content: flex-start;
      }
      &:last-child {
        justify-content: flex-end;
      }
      a {
        color: rgba(0, 0, 0, 0.87);
        font-size: 15px;
      }
      .logo {
        height: 37px;
      }
      .profileImage {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      .userName {
        font-size: 18px;
        font-weight: 400;
        margin-left: 10px;
      }
    }
  }
}
</style>