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
  },
  onBoardingState (state) {
    return state.onBoarding;
  }
};

export default getters;
