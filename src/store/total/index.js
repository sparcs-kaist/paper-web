import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    loggedInState: false,
    currentUser: {},
    participatedPapers: [],
    createdPapers: [],
    onBoarding: {
      menu: false,
      participate: false,
      create: false,
    }
  },
  actions,
  mutations,
  getters
};
