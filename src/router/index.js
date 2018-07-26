import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import MyPage from "@/pages/MyPage.vue";
import CreatePaper from "@/pages/CreatePaper.vue";
import CreatedPaperDetail from "@/pages/CreatedPaperDetail.vue";
import ParticipatedPaperDetail from "@/pages/ParticipatedPaperDetail.vue";
import ParticipatePaper from "@/pages/ParticipatePaper.vue";
import SearchForPaper from "@/pages/SearchForPaper.vue";

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
      path: "/paper/create",
      name: "CreatePaper",
      component: CreatePaper
    },
    {
      path: "/paper/participate/:PaperId",
      name: "ParticipatePaper",
      component: ParticipatePaper
    },
    {
      path: "/paper/search",
      name: "SearchForPaper",
      component: SearchForPaper
    },
    {
      path: "/user/created/:paperId",
      name: "CreatedPaperDetail",
      component: CreatedPaperDetail
    },
    {
      path: "/user/participated/:paperId",
      name: "ParticipatedPaperDetail",
      component: ParticipatedPaperDetail
    }
  ]
});
