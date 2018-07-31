const getters = {
  loggedInState(state) {
    return state.loggedInState;
  },
  currentUser(state) {
    return state.currentUser;
  },
  participatedPapers(state) {
    return state.participatedPapers;
  }
};

export default getters;
