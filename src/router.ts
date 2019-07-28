import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import SetupCharacterView from '@/views/SetupCharacter.vue';
import SetupStashView from '@/views/SetupStash.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!store.state.user.logged) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/setup-character',
      component: SetupCharacterView,
      beforeEnter: (to, from, next) => {
        if (!store.state.user.logged) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/setup-stash',
      component: SetupStashView,
      beforeEnter: (to, from, next) => {
        if (!store.state.user.logged) {
          next('/login');
        } else {
          next();
        }
      }
    }
  ]
});
