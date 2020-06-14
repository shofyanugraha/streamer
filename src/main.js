/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import Vue from 'vue';
import Buefy from 'buefy';
import * as rules from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import id from 'vee-validate/dist/locale/id.json';

import VueChatScroll from 'vue-chat-scroll';
import APIService from '@/commons/api.service';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import DefaultLayout from './layouts/Default.vue';
import AuthLayout from './layouts/Auth.vue';
import './commons/fontawesome';

Vue.config.productionTip = false;

// loop over all rules
for (const rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: id.messages[rule], // add its message
  });
}

Vue.component('auth-layout', AuthLayout);
Vue.component('default-layout', DefaultLayout);

Vue.use(Buefy);
Vue.use(VueChatScroll);
Vue.use(VueClipboard);

APIService.init();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
