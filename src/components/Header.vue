<template>
  <div class="totalWrapper">
    <div class="topLine"></div>
    <div class="headerWrapper">
      <div class="column">
        <img @click="mainPage" src="@/assets/logo.png" class="logo">
        <span v-intro="'이곳에서 새로운 페이퍼를 생성하실 수 있습니다.'" @click="selectTab('tab1')" :class="tab1 ? 'selectedTab' : 'tabs'">{{$t('페이퍼 생성하기')}}</span>
        <span v-intro="'이곳에서 새로운 페이퍼를 찾아보실 수 있습니다.'" v-intro-step="2" @click="selectTab('tab2')" :class="tab2 ? 'selectedTab' : 'tabs'">{{$t('페이퍼 찾아보기')}}</span>
      </div>
      <div v-if="currentUser.nickName == undefined" class="column">
        <span @click="profileModalState = !profileModalState" class="userName">nickName</span>
        <v-icon @click="profileModalState = !profileModalState" medium class="arrowIcon">arrow_drop_down</v-icon>
      </div>
      <div v-else class="column">
        <span @click="profileModalState = !profileModalState" class="userName">{{currentUser.nickName}}</span>
        <v-icon @click="profileModalState = !profileModalState" medium class="arrowIcon">arrow_drop_down</v-icon>
      </div>
      <div class="profileModalWrapper" v-show="profileModalState">
        <div v-intro="'페이퍼 서비스와 스팍스 SSO에서 로그아웃 됩니다.'" v-intro-step="3" @click="logout" class="singleTapWrapper">
          <v-icon class="profileIcons">power_settings_new</v-icon>
          <span class="profileSpan">{{$t('로그아웃')}}</span>
        </div>
        <div v-intro="'생성 또는 참여하신 페이퍼를 수정&메일링 등으로 관리하실 수 있습니다.'" v-intro-step="4" @click="profilePush" class="singleTapWrapper">
          <v-icon class="profileIcons">mdi-content-copy</v-icon>
          <span class="profileSpan">{{$t('페이퍼 관리')}}</span>
        </div>
      </div>
      <div v-show="profileModalState" class="profileTriangle"></div>
      <div v-show="profileModalState" class="profileTriangle profileTriangleBorder"></div>
    </div>
    <div class="mobileHeaderWrapper">
      <img @click="mainPage" src="@/assets/logo.png" class="logo">
      <v-icon v-show="dropdownState == false" @click="dropdownState = true">mdi-menu</v-icon>
      <v-icon v-show="dropdownState == true" @click="dropdownState = false">mdi-close</v-icon>
    </div>
    <div v-show="dropdownState" class="dropdownList">
      <div @click="selectTab('tab1')" class="dropdownContent">
        {{ $t('페이퍼 생성하기') }}
      </div>
      <div @click="selectTab('tab2')" class="dropdownContent">
        {{ $t('페이퍼 찾아보기') }}
      </div>
      <div @click="profilePush" class="dropdownContent">
        {{ $t('페이퍼 관리')}}
      </div>
      <div @click="logout" class="dropdownContent">
        {{ $t('로그아웃')}}
      </div>
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
      profileModalState: false,
      dropdownState: false
    };
  },
  props: {
    currentUserLoading: Boolean
  },
  created() {
    var val = this.$router.currentRoute.name;
    this.profileModalState = false;
    if (val == "CreatePaper") {
      this.tab1 = true;
      this.tab2 = false;
    } else if (val == "SearchForPaper") {
      this.tab2 = true;
      this.tab1 = false;
    } else {
      this.tab1 = false;
      this.tab2 = false;
    }
  },
  methods: {
    mainPage() {
      this.tab1 = false;
      this.tab2 = false;
      this.dropdownState = false;
      this.$router.push({ name: "MainPage" });
    },
    selectTab(tabName) {
      if (tabName == "tab1") {
        this.tab1 = true;
        this.tab2 = false;
        this.dropdownState = false;
        this.profileModalState = false;
        this.$router.push({ name: "CreatePaper" });
      } else {
        this.tab2 = true;
        this.tab1 = false;
        this.dropdownState = false;
        this.$router.push({ name: "SearchForPaper" });
      }
    },
    logout(event) {
      this.profileModalState = false;
      this.dropdownState = false;
      this.$store.commit("LOGOUT");
    },
    profilePush() {
      this.profileModalState = false;
      this.dropdownState = false;
      this.$router.push({ name: "MyPage" });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    onBoardingState() {
      return this.$store.getters.onBoardingState.menu;
    }
  },
  watch: {
    onBoardingState(val) {
      if (val) {
        setTimeout(() => {
          this.profileModalState = true;
          this.$intro().start(); // start the guide
          this.$store.commit("END_ONBOARDING", "menu"); // end the guide
        }, 200);
      }
    },
    "$router.currentRoute.name"(val) {
      this.profileModalState = false;
      if (val == "CreatePaper") {
        this.tab1 = true;
        this.tab2 = false;
      } else if (val == "SearchForPaper") {
        this.tab2 = true;
        this.tab1 = false;
      } else {
        this.tab1 = false;
        this.tab2 = false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.totalWrapper {
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
        margin-right: 20px;
        margin-left: 27px;
        cursor: pointer;
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
        margin-right: 27px;
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
          margin-right: 8px;
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
      border-bottom: 10px solid #fafafa;
      z-index: 301;
    }
    .profileTriangleBorder {
      top: 64px;
      border-bottom: 10px solid #e0e0e0;
      z-index: 2;
    }
  }
  .mobileHeaderWrapper {
    width: 100%;
    height: 59px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px;
    background-color: $transparent-white;
    .logo {
      height: 27px;
      cursor: pointer;
    }
  }
  .dropdownList {
    background-color: $transparent-white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 100;
    .dropdownContent {
      height: 45px;
      color: $font-black-dark;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: $normal-font-size;
      padding-left: 10px;
      cursor: pointer;
    }
  }
  @include breakPoint("phone") {
    .headerWrapper {
      display: none;
    }
  }
  @include breakPoint("tablet") {
    .mobileHeaderWrapper {
      display: none;
    }
    .dropdownList {
      display: none;
    }
  }
  @include breakPoint("desktop") {
    .mobileHeaderWrapper {
      display: none;
    }
    .dropdownList {
      display: none;
    }
  }
}
</style>