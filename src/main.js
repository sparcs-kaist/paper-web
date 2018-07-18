// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import Vuetify from 'vuetify';
import vuexI18n from 'vuex-i18n';

import 'vuetify/dist/vuetify.min.css';

import translationEn from './lang/en.json';
import translationKr from './lang/kr.json';

import store from './store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use(vuexI18n.plugin, store, {
  moduleName: 'i18n',
  onTranslationNotFound(locale, key) {
    console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
  },
});

Vue.i18n.add('en', translationEn);
Vue.i18n.add('kr', translationKr);

Vue.i18n.set('kr');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
