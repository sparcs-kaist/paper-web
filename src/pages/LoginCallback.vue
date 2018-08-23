<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    console.log(this.$route.params.token);
    if (sessionStorage.getItem("token")) {
      this.$router.push({ name: "MainPage" });
    } else {
      sessionStorage.setItem("token", "PAPER " + this.$route.params.token);
      window.location.reload();
    }
  }
};
</script>
<style lang=''>
</style>
