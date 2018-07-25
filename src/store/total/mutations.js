import * as types from "@/store/mutation-types";

const mutations = {
  [types.LOGIN](state, payload) {
    if (localStorage.getItem("token")) {
      state.loggedInState = true;
    }
  },
  [types.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  }
};

export default mutations;
