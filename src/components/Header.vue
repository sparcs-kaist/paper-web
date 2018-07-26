<template>
  <div class="totalWrapper">
    <div class="topLine"></div>
    <div class="headerWrapper">
      <div class="column">
        <img @click="mainPage" src="@/assets/logo.png" class="logo">
        <span @click="selectTab('tab1')" :class="tab1 ? 'selectedTab' : 'tabs'">어플라이 생성하기</span>
        <span @click="selectTab('tab2')" :class="tab2 ? 'selectedTab' : 'tabs'">어플라이 찾아보기</span>
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
    return {
      tab1: false,
      tab2: false,
      selectedTab: ""
    }
  },
  props: {
  },
  methods: {
    mainPage () {
      this.tab1 = false;
      this.tab2 = false;
      this.$router.push({ name: "MainPage" })
    },
    selectTab (tabName) {
      if (tabName == 'tab1') {
        this.tab1 = true;
        this.tab2 = false;
        this.$router.push({ name: "CreateApply" })
      } else {
        this.tab2 = true;
        this.tab1 = false;
        this.$router.push({ name: "SearchForApply" })
      }
    }
  },
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
    background-color: #673ab7;
  }
  .headerWrapper {
    width: 100%;
    height: 59px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    background-color: rgba(255, 255, 255, 0.9);
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
      .tabs {
        color: rgba(0, 0, 0, 0.54);
        font-size: 18px;
        font-weight: 700;
        margin-left: 24px;
        margin-top: 5px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &:hover {
          color: rgba(0, 0, 0, 87);
        }
      }
      .selectedTab {
        color: rgba(0, 0, 0, 0.87);
        font-size: 18px;
        font-weight: 700;
        margin-left: 24px;
        margin-top: 5px;
        cursor: pointer;
      }
      .logo {
        height: 37px;
        cursor: pointer;
        margin-right: 20px;
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