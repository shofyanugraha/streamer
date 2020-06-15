import Vue from 'vue';
import VueRouter from 'vue-router';
// Auth
import Register from '@/pages/Register/Register.vue';

import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import Player from '@/pages/Player/Player.vue';
import Assets from '@/pages/Player/Assets.vue';
import Setting from '@/pages/Setting/Setting.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/player/:id',
    name: 'player',
    component: Player,
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/assets/:id',
    name: 'assets',
    component: Assets,
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
      layout: 'default',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
