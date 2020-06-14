import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth.module';
import error from './error.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    error,
  },
  plugins: [
    createPersistedState({
      paths: ['auth', 'cart'],
    }),
  ],
});
