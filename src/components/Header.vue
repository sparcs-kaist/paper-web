<template>
  <div class="totalWrapper">
    <div class="topLine"></div>
    <div class="headerWrapper">
      <div class="column">
        <img @click="mainPage" src="@/assets/logo.png" class="logo">
        <span @click="selectTab('tab1')" :class="tab1 ? 'selectedTab' : 'tabs'">{{$t('페이퍼 생성하기')}}</span>
        <span @click="selectTab('tab2')" :class="tab2 ? 'selectedTab' : 'tabs'">{{$t('페이퍼 찾아보기')}}</span>
      </div>
      <div class="column">
        <img @click="profileModalState = !profileModalState" src="@/assets/userProfile.jpg" class="profileImage">
        <span @click="profileModalState = !profileModalState" class="userName">userName</span>
        <v-icon @click="profileModalState = !profileModalState" medium class="arrowIcon">arrow_drop_down</v-icon>
      </div>
      <div class="profileModalWrapper" v-show="profileModalState">
        <div @click="logout" class="singleTapWrapper">
          <v-icon medium class="profileIcons">power_settings_new</v-icon>
          <span class="profileSpan">{{$t('로그아웃')}}</span>
        </div>
        <div @click="profilePush" class="singleTapWrapper">
          <v-icon medium class="profileIcons">person</v-icon>
          <span class="profileSpan">{{$t('프로필 관리')}}</span>
        </div>
      </div>
      <div v-show="profileModalState" class="profileTriangle"></div>
      <div v-show="profileModalState" class="profileTriangle profileTriangleBorder"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      tab1: false,
      tab2: false,
      selectedTab: "",
      profileModalState: false
    };
  },
  props: {},
  methods: {
    mainPage() {
      this.tab1 = false;
      this.tab2 = false;
      this.$router.push({ name: "MainPage" });
    },
    selectTab(tabName) {
      if (tabName == "tab1") {
        this.tab1 = true;
        this.tab2 = false;
        this.$router.push({ name: "CreatePaper" });
      } else {
        this.tab2 = true;
        this.tab1 = false;
        this.$router.push({ name: "SearchForPaper" });
      }
    },
    logout() {
      this.$store.commit("LOGOUT");
      this.profileModalState = false;
    },
    profilePush() {
      this.$router.push({ name: "MyPage" });
      this.profileModalState = false;
    }
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
    background-color: $theme-color;
  }
  .headerWrapper {
    width: 100%;
    height: 59px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    background-color: $transparent-white;
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
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
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
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
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
        cursor: pointer;
        &:hover {
          @include smallBoxShadow();
        }
      }
      .userName {
        font-size: $normal-font-size;
        font-weight: $normal-font-weight;
        margin-left: 10px;
        cursor: pointer;
      }
      .arrowIcon {
        cursor: pointer;
      }
    }
    .profileModalWrapper {
      position: absolute;
      top: 74px;
      right: 24px;
      @include modalTabCss();
      display: flex;
      flex-direction: column;
      z-index: 300;
      padding: 0px 5px;
      .singleTapWrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        font-size: $normal-font-size;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.87);
        &:first-child {
          border-bottom: 1px solid #ececec;
        }
        .profileIcons {
          margin-right: 4px;
        }
        .profileSpan {
          font-size: $normal-font-size;
        }
      }
    }
    .profileTriangle {
      position: absolute;
      width: 0;
      height: 0;
      top: 65px;
      right: 40px;
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 10px solid white;
      z-index: 301;
    }
    .profileTriangleBorder {
      top: 64px;
      border-bottom: 10px solid #e0e0e0;
      z-index: 2;
    }
  }
}
</style>