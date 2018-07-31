import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const actions = {
  getMyInfo({ commit, dispatch, state }, payload) {},
  setParticipatedPapers({ commit, dispatch, state }, payload) {
    axios({
      url: "/api/papers/",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      commit(types.SET_PARTICIPATED_PAPERS, res.data.data);
    });
  }
};

export default actions;
