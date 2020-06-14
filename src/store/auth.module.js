/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import APIService from '@/commons/api.service';
import { getToken, saveToken, destroyToken } from '@/commons/jwt.service';

const state = {
  user: {},
  isAuth: !!getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuth(state) {
    return state.isAuth;
  },
};

const actions = {
  login(context, credentials) {
    return new Promise((resolve) => {
      context.commit('setUser', credentials);
      resolve(credentials);
    }).catch((error) => {
      context.commit('error/setError', error.data.message, { root: true });
    });
  },
  logout(context) {
    context.commit('logout');
  },
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      APIService.post('users', { user: credentials })
        .then((data) => {
          context.commit('setUser', data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('error/setError', response.data.errors, { root: true });
          reject(response);
        });
    });
  },
  isLogin(context) {
    if (getToken()) {
      APIService.setHeader();
      APIService.get('users/me')
        .then(({ data }) => {
          const newData = {
            ...data,
            jwt: getToken(),
          };
          console.log(newData);
          context.commit('setUser', newData);
        })
        .catch(({ response }) => {
          context.commit('error/setError', response.data.errors, { root: true });
        });
    } else {
      context.commit('logout');
    }
  },
  updateUser(context, payload) {
    const {
      email, username, password, image, bio,
    } = payload;
    const user = {
      email,
      username,
      bio,
      image,
    };
    if (password) {
      user.password = password;
    }

    return APIService.put('user', user).then(({ data }) => {
      context.commit('setUser', data.user);
      return data;
    });
  },
};

const mutations = {
  setUser(state, user) {
    state.isAuth = true;
    state.user = user;
    state.errors = {};
    saveToken(state.user.jwt);
  },
  logout(state) {
    state.isAuth = false;
    state.user = {};
    state.errors = {};
    destroyToken();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
