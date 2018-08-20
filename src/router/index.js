import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import MyPage from "@/pages/MyPage.vue";
import LoginCallback from "@/pages/LoginCallback.vue";
import CreatePaper from "@/pages/CreatePaper.vue";
import CreateSubmitted from "@/pages/CreateSubmitted.vue";
import CreatedPaperDetail from "@/pages/CreatedPaperDetail.vue";
import CreatedPaperInfo from "@/pages/CreatedPaperInfo.vue";
import ParticipatedPaperDetail from "@/pages/ParticipatedPaperDetail.vue";
import ParticipateSubmitted from "@/pages/ParticipateSubmitted.vue";
import ParticipatePaper from "@/pages/ParticipatePaper.vue";
import ParticipatedPaperEdit from "@/pages/ParticipatedPaperEdit.vue";
import SearchForPaper from "@/pages/SearchForPaper.vue";
import Credit from "@/pages/Credit.vue";
import License from "@/pages/License.vue";
import CodeOfConduct from "@/pages/CodeOfConduct.vue";
import NotFound from "@/pages/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
      path: "/login/:token",
      name: "LoginCallback",
      component: LoginCallback
    },
    {
      path: "/paper/participate/submitted",
      name: "ParticipateSubmitted",
      component: ParticipateSubmitted
    },
    {
      path: "/paper/create/submitted/:paperId",
      name: "CreateSubmitted",
      component: CreateSubmitted
    },
    {
      path: "/paper/search",
      name: "SearchForPaper",
      component: SearchForPaper
    },
    {
      path: "/user/created/manage/:paperId",
      name: "CreatedPaperDetail",
      component: CreatedPaperDetail
    },
    {
      path: "/user/created/info/:paperId",
      name: "CreatedPaperInfo",
      component: CreatedPaperInfo
    },
    {
      path: "/user/participated/:participatedId",
      name: "ParticipatedPaperDetail",
      component: ParticipatedPaperDetail
    },
    {
      path: "/user/participated/edited",
      name: "ParticipatedPaperEdit",
      component: ParticipatedPaperEdit
    },
    {
      path: "/credit",
      name: "Credit",
      component: Credit
    },
    {
      path: "/codeofconduct",
      name: "CodeOfConduct",
      component: CodeOfConduct
    },
    {
      path: "/license",
      name: "License",
      component: License
    },
    {
      path: "/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
