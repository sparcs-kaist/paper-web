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
    const {
      currentUser: { email }
    } = state;
    state.loggedInState = false;
    state.currentUser = {};
    localStorage.removeItem("token");
    window.location = `http://ssal.sparcs.org:16138/api/logout/?email=${email}`;
  },
  [types.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [types.SET_PARTICIPATED_PAPERS](state, payload) {
    state.participatedPapers = payload;
  },
  [types.SET_CREATED_PAPERS](state, payload) {
    state.createdPapers = payload;
  },
  [types.START_ONBOARDING](state, payload) {
    if (payload == "participate") {
      state.onBoarding.participate = true;
    } else if (payload == "menu") {
      state.onBoarding.menu = true;
    } else if (payload == "create") {
      state.onBoarding.create = true;
    }
  },
  [types.END_ONBOARDING](state, payload) {
    if (payload == "participate") {
      state.onBoarding.participate = false;
    } else if (payload == "menu") {
      state.onBoarding.menu = false;
    } else if (payload == "create") {
      state.onBoarding.create = false;
    }
  }
};

export default mutations;
