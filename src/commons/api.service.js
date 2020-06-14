import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { getToken } from '@/commons/jwt.service';
import { API as API_URL } from '@/commons/config';

const APIService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    // Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
  },

  setHeader() {
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch((error) => {
      throw new Error(`[RWV] APIService ${error}`);
    });
  },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] APIService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params).catch((error) => {
      throw error.response;
    });
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] APIService ${error}`);
    });
  },
};

export default APIService;
