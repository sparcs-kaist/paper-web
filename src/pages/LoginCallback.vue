<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    if (localStorage.getItem("token")) {
      window.location.href = localStorage.getItem("currentPage");
      localStorage.removeItem("currentPage");
    } else {
      localStorage.setItem("token", "PAPER " + this.$route.params.token);
      window.location.reload();
    }
  }
};
</script>
<style lang=''>
</style>
