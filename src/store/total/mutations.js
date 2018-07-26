import * as types from "@/store/mutation-types";

const mutations = {
  [types.LOGIN](state, payload) {
    localStorage.setItem("token", "just added");
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
  }
};

export default mutations;
