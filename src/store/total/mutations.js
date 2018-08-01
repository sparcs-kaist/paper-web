import * as types from "@/store/mutation-types";

const mutations = {
  [types.LOGIN](state, token) {
    if (token) {
      localStorage.setItem("token", "PAPER " + token);
    }
    if (localStorage.getItem("token")) {
      state.loggedInState = true;
    }
  },
  [types.LOGOUT](state, payload) {
    localStorage.removeItem("token");
    state.loggedInState = false;
  },
  [types.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [types.SET_PARTICIPATED_PAPERS](state, payload) {
    state.participatedPapers = payload;
  }
};

export default mutations;
