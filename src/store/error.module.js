/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  isError: false,
  errors: [],
};

const getters = {
  currentError(state) {
    return state.errors;
  },
  isError(state) {
    return state.isError;
  },
};

const actions = {
  setError(context, error) {
    context.commit('setError', error);
  },
  clearError(context) {
    context.commit('clearError');
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
    state.isError = true;
  },
  clearError(state) {
    state.isError = false;
    state.errors = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
