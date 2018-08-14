// IE Support
import 'babel-polyfill';

import Vue from "vue";

import Vuetify from "vuetify";
import vuexI18n from "vuex-i18n";

import translationEn from "./lang/en.json";
import translationKr from "./lang/kr.json";

import store from "./store";
import App from "./App";
import router from "./router";

import "@mdi/font/css/materialdesignicons.css";

import 'intro.js/introjs.css';

import VueIntro from 'vue-introjs'

var introJS = require('intro.js').introJs
introJS().start()

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "mdi"
});

Vue.use(vuexI18n.plugin, store, {
  moduleName: "i18n",
  onTranslationNotFound(locale, key) {
    console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
  }
});

// Intro.js global binding
Vue.use(VueIntro)

Vue.i18n.add("en", translationEn);
Vue.i18n.add("kr", translationKr);

Vue.i18n.set("kr");

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
