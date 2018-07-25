<template>
  <div class="totalWrapper">
    <div class="topLine"></div>
    <div class="headerWrapper">
      <div class="column">
        <img src="@/assets/logo.png" class="logo">
      </div>
      <div class="column">
        <img src="@/assets/userProfile.jpg" class="profileImage">
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
    background-color: blue;
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
      .logo {
        height: 37px;
      }
      .profileImage {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
}
</style>