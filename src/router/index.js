import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import MyPage from "@/pages/MyPage.vue";
import CreateApply from "@/pages/CreateApply.vue";
import CreatedApplyDetail from "@/pages/CreatedApplyDetail.vue";
import ParticipatedApplyDetail from "@/pages/ParticipatedApplyDetail.vue";
import ParticipateApply from "@/pages/ParticipateApply.vue";
import SearchForApply from "@/pages/SearchForApply.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/user/profile",
      name: "MyPage",
      component: MyPage
    },
    {
      path: "/apply/create",
      name: "CreateApply",
      component: CreateApply
    },
    {
      path: "/apply/participate/:applyId",
      name: "ParticipateApply",
      component: ParticipateApply
    },
    {
      path: "/apply/search",
      name: "SearchForApply",
      component: SearchForApply
    },
    {
      path: "/user/created/:applyId",
      name: "CreatedApplyDetail",
      component: CreatedApplyDetail
    },
    {
      path: "/user/participated/:applyId",
      name: "ParticipatedApplyDetail",
      component: ParticipatedApplyDetail
    }
  ]
});
