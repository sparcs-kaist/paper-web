<template lang=''>
  <footer class="footerWrapper">
    <div class="column">
      <div class="imageWrapper">
        <img src="@/assets/sparcslogo.png" class="image"/>
      </div>
      <div class="tapWrapper">
        <router-link to="/credit"><span class="tap">Credit</span></router-link>
        <router-link to="/license"><span class="tap">License</span></router-link>
        <router-link to="/codeofconduct"><span class="tap">Code of Conduct</span></router-link>
      </div>
    </div>
    <div class="column">
      <span @click="messageModal = !messageModal" style="cursor: pointer;">Contact : staff@sparcs.org</span>
      <div v-if="messageModal" class="messageWrapper">
        <div class="messageInput" v-if="!loading && !end">
          <input v-model="subject" class="messageTitle" placeholder="제목"/>
          <textarea v-model="message" class="messageContent" placeholder="내용"/>
          <button @click="submit" class="messageButton">제출</button>
        </div>
        <div v-if="loading" class="loadingWrapper">
          <v-progress-circular
            indeterminate
            color="primary"
            class="loading"
          ></v-progress-circular>
        </div>
        <div class="submitted" v-if="!loading && end">
          정상적으로 건의사항 접수가 완료되었습니다.
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      messageModal: false,
      subject: "",
      message: "",
      loading: false,
      end: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      axios({
        method: "post",
        url: "/api/mails/report/",
        data: {
          subject: this.subject,
          message: this.message
        },
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status == 201) {
          this.loading = false;
          this.end = true;
          setTimeout(() => {
            this.messageModal = false;
            this.end = false;
            this.subject = "";
            this.message = "";
          }, 3000);
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.footerWrapper {
  display: flex;
  position: fixed;
  height: 68px;
  width: 100%;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: $transparent-white;
}
.column {
  width: 50%;
  display: flex;
  padding-left: 27px;
  align-items: center;
  &:first-child {
    justify-content: flex-start;
    font-size: 1em;
    font-weight: 400;
  }
  &:last-child {
    justify-content: flex-end;
    font-size: 0.75em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
    padding-right: 27px;
    position: relative;
    .messageWrapper {
      position: absolute;
      background-color: white;
      @include smallBoxShadow();
      bottom: 40px;
      right: 25px;
      width: 250px;
      padding: 10px;
      font-size: $small-font-size;
      font-weight: $normal-font-weight;
      .messageInput {
        width: 100%;
        .messageTitle {
          width: 100%;
          height: 30px;
          margin-bottom: 5px;
          background-color: $light-gray;
          padding: 8px;
          &:focus {
            outline: none;
          }
        }
        .messageContent {
          width: 100%;
          height: 80px;
          background-color: $light-gray;
          padding: 8px;
          resize: none;
          &:focus {
            outline: none;
          }
          margin-bottom: 5px;
        }
        .messageButton {
          width: 100%;
          padding: 5px;
          background-color: $theme-color;
          color: white;
        }
      }
      .loadingWrapper {
        width: 100%;
        justify-content: center;
        align-items: center;
        .loading {
          width: 100%;
          align-items: center;
          justify-content: center;
        }
      }
      .submitted {
        font-size: $normal-font-size;
        text-align: center;
      }
    }
  }
}
.tap {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 27px;
  @include breakPoint("phone") {
    display: none;
  }
}
.image {
  height: 23px;
  margin-top: 2px;
}
</style>
