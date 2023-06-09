import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    }
  },
  actions: {
    logout({ commit }) {
      commit('setLoggedIn', false);
    },
  },
});

export default store;
