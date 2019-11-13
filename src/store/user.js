const initialState = {
  userInfo: {},
  isAuthorized: false,
};

const mutations = {
  updateUserInfo(state, payload) {
    state.userInfo = payload;
  },
  authorizeUser(state, value) {
    state.isAuthorized = value;
  },
};

const user = {
  namespaced: true,
  state: initialState,
  mutations,
};

export default user;
