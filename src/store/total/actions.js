import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const actions = {
  getMyInfo({ commit, dispatch, state }, payload) {},
  setParticipatedPapers({ commit, dispatch, state }, payload) {
    axios({
      url: "/api/participates/created/",
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then(res => {
      commit(types.SET_PARTICIPATED_PAPERS, res.data.data);
    });
  },
  setCreatedPapers({ commit, dispatch, state }, payload) {
    axios({
      url: "/api/papers/created/",
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    }).then(res => {
      commit(types.SET_CREATED_PAPERS, res.data.data);
    });
  },
  login({ commit, dispatch, state }, payload) {
    axios({
      url: "/api-token-verify/",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        token: payload
      }
    }).then(res => {
      if (res.status == 200) {
        commit(types.LOGIN, payload);
        commit(types.SET_CURRENT_USER, res.data.user);
      } else {
        commit(types.LOGOUT);
      }
    });
  }
};

export default actions;
