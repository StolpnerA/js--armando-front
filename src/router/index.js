import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import { getUserInfo } from '@/helpers/api';

Vue.use(VueRouter);

async function getUserFromServer(token, next) {
  const user = await getUserInfo(token).catch(() => {
    store.commit('user/updateUserInfo', {});
    store.commit('user/authorizeUser', false);
    localStorage.removeItem('userJwt');
    next({ name: 'home' });
  });
  if (!user) return;
  store.commit('user/updateUserInfo', user);
  store.commit('user/authorizeUser', true);
  next();
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '@/views/Tasks.vue'),
    beforeEnter(to, from, next) {
      if (store.state.user.isAuthorized) {
        next();
      } else {
        next({ name: 'home' });
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.userJwt;
  if (token && !store.state.user.isAuthorized) {
    getUserFromServer(token, next);
  } else {
    next();
  }
});

export default router;
