<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <div id="vform">
        <router-link to="/">
          <img src="@/assets/logo.png" id="logo">
        </router-link>
        <div key="option" v-if="isZabologin === false" style="padding-left: 0px;">
          <v-btn @click="login" depressed color="indigo darken-3" class="sso-login">
            sparcs sso로 로그인
          </v-btn>
        </div>
        <p class="copyright">
          Copyright 2018. All right reserved.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";
import { baseURL } from "@/variables.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      isZabologin: false,
      valid: true,
      emailRules: [
        v => !!v || "이메일을 입력해주세요.",
        v => /.+@.+/.test(v) || "유효한 이메일 형식이 아닙니다."
      ],
      passwordRules: [v => !!v || "비밀번호를 입력해주세요."],
      loginfailed: false
    };
  },
  methods: {
    zabologin() {
      this.isZabologin = !this.isZabologin;
    },
    login() {
      window.location = baseURL + "/api/login/";
    }
  }
};
</script>
<style lang='scss' scoped>
#background_div {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url("../assets/white_wood.jpg") no-repeat center center fixed;
  background-size: cover;
  #loginbox {
    width: 500px;
    height: 300px;
    /* transform: translateX(-50%); */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    background-color: white;
    @include smallBoxShadow();
    #vform {
      width: 300px;
      height: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      #logo {
        height: 70px;
        margin-left: -10px;
        margin-bottom: 20px;
      }
      .sso-login {
        min-width: 300px;
        height: 80px;
        font-size: 14pt;
        font-family: Nanumsquare;
        font-weight: 700;
        color: white;
        text-align: center;
      }
      .copyright {
        width: 100%;
        text-align: center;
        font-size: 12px;
        margin-top: 20px;
      }
    }
    @include breakPoint("phone") {
      width: 250px;
      height: 200px;
      #vform {
        width: 200px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        #logo {
          height: 40px;
          margin-left: -10px;
          margin-bottom: 10px;
        }
        .sso-login {
          min-width: 0;
          width: 100%;
          height: 40px;
          font-size: $h2-font-size;
          font-family: Nanumsquare;
          font-weight: $big-font-weight;
          color: white;
          margin-left: 0px;
        }
        .copyright {
          width: 100%;
          text-align: center;
          font-size: $small-font-weight;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
