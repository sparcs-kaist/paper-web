import Vue from "vue";
import Router from "vue-router";
import PrivateMain from "@/pages/PrivateMain.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "PrivateMain",
      component: PrivateMain
    }
  ]
});
