<template>
  <div id="app">
    <div v-if="loggedInState" class="private">
      <Header :currentUserLoading="currentUserLoading" />
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
      <!-- <Footer /> -->
    </div>
    <div v-if="!loggedInState" class="public">
      <login v-if="$router.currentRoute.name != 'LoginCallback'"></login>
      <router-view v-else :key="$route.name + ($route.params.id || '')"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/pages/Login";
import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

export default {
  name: "App",
  components: {
    Header,
    Login,
    Footer
  },
  data() {
    return {
      currentUserLoading: true
    };
  },
  created() {
    console.log(this.$router.currentRoute);
    if (sessionStorage.getItem("token")) {
      this.$store.dispatch("login", sessionStorage.getItem("token").slice(6));
    }
  },
  methods: {},
  computed: {
    loggedInState() {
      return this.$store.getters.loggedInState;
    }
  }
};
</script>

<style lang="scss">
@import "~vuetify-scss";

@import "./config/_variables.scss";
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
.v-input--switch {
  &__track,
  &__thumb {
    background-color: #bbbbbb;
    pointer-events: none;
    transition: inherit;
  }

  &__track {
    border-radius: 0.5rem;
    height: 0.875rem;
    left: 0.125rem;
    opacity: 0.6;
    position: absolute;
    right: 0.125rem;
    top: calc(50% - 7px);
  }

  &__thumb {
    @include elevation(4);
    border-radius: 50%;
    height: 1.25rem;
    position: relative;
    top: calc(50% - 10px);
    width: 1.25rem;
  }

  .v-input--selection-controls__input {
    width: 2.375rem;
  }

  .v-input--selection-controls__ripple {
    left: -0.875rem;
    top: calc(50% - 24px);
  }

  &.v-input--is-dirty {
    .v-input--selection-controls__ripple,
    .v-input--switch__thumb {
      transform: translate(1rem, 0);
    }
    .v-input--switch__thumb,
    .v-input--switch__track {
      background-color: $theme-color;
    }
    .v-label {
      font-weight: $big-font-weight;
      color: $theme-color;
    }
  }
}

html,
body,
div,
span,
applet,
object,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  font-family: "NanumSquare", sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  margin: 0;
  @include breakPoint("phone") {
    @include scrollBarDark(small);
  }
  @include breakPoint("tablet") {
    @include scrollBarDark(small);
  }
  @include breakPoint("desktop") {
    @include scrollBarDark(big);
  }
}
p {
  line-height: 1.6;
}
a {
  text-decoration: none;
}
#app {
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
