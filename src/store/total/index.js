import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    loggedInState: false,
    currentUser: {}
  },
  actions,
  mutations,
  getters
};
