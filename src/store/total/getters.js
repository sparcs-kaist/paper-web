const getters = {
  loggedInState(state) {
    return state.loggedInState;
  },
  currentUser(state) {
    return state.currentUser;
  },
  participatedPapers(state) {
    return state.participatedPapers;
  },
  createdPapers(state) {
    return state.createdPapers;
  }
};

export default getters;
