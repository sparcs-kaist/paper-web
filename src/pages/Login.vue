<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <div id="vform">
        <router-link to="/">
          <img src="@/assets/logo.png" id="logo">
        </router-link>
        <transition name="slide-fade" mode="out-in">
          <div key="option" v-if="isZabologin === false" style="padding-left: 0px;">
            <v-btn depressed color="indigo darken-3" class="sso-login">
              sparcs sso로 로그인
            </v-btn>
          </div>
        </transition>
        <p class="copyright">
          Copyright 2018. All right reserved.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";

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
      axios({
        url: "http://ssal.sparcs.org:16138/api-token-auth/",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          email: this.email,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        console.log(res.data);
        this.$store.dispatch("login", res.data.token);
        // axios({
        //   url: "http://ssal.sparcs.org:16138/api/users/1/",
        //   method: "get",
        //   headers: {
        //     Authorization: localStorage.getItem("token")
        //   }
        // }).then(res => {
        //   this.$store.commit("SET_CURRENT_USER", res.data);
        // });
      });
      // this.$store.commit("START_AJAX");
      // axios
      //   .post("/api-token-auth/", {
      //     email: this.email,
      //     password: this.password
      //   })
      //   .then(response => {
      //     localStorage.setItem("token", `ZABO ${response.data.token}`);
      //   })
      //   .catch(err => {
      //     this.loginfailed = true;
      //     this.$store.commit("GOT_RESPONSE");
      //   })
      //   .then(() => {
      //     axios("api/users/myInfo/", {
      //       method: "GET",
      //       headers: {
      //         Authorization: localStorage.getItem("token")
      //       }
      //     })
      //       .then(response => {
      //         this.$store.commit("LOGIN", response.data);
      //       })
      //       .then(() => {
      //         this.$store.commit("GOT_RESPONSE");
      //       })
      //       .then(() => {
      //         this.$emit("logged-in");
      //         this.$store.dispatch("getNotifications");
      //       });
      //   });
    }
  }
};
</script>
<style lang='' scoped>
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
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/background.jpg");
  background-size: cover;
}
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
  box-shadow: 0px 15px 65px #1f1f1f;
}

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
}

#logo {
  height: 70px;
  margin-left: -20px;
  margin-bottom: 20px;
}

.sso-login {
  width: 300px;
  height: 80px;
  font-size: 14pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
  margin-left: 0px;
}

.zabo-login {
  width: 300px;
  height: 80px;
  font-size: 14pt;
  font-family: Nanumsquare;
  font-weight: 700;
  margin-left: 0px;
}

.zabologin-text {
  width: 300px;
  height: 30px;
  text-align: center;
  font-family: Nanumsquare;
  color: #12397d;
  font-size: 13pt;
  font-weight: 800;
  /* margin-top: -10px; */
  cursor: pointer;
}

.field {
  margin-top: 0px;
}

#login_button {
  width: 300px;
  height: 55px;
  margin-left: 0px;
  font-size: 13pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
}

.copyright {
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.slide-fade-enter-active {
  transition: all 0.1s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate(30px);
  opacity: 0;
}

.error-message {
  text-align: center;
  font-size: 10pt;
  color: red;
}
</style>
