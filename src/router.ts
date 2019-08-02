import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import SetupCharacterView from '@/views/SetupCharacter.vue';
import SetupStashView from '@/views/SetupStash.vue';
import MappingHistoryView from '@/views/MappingHistory.vue';
import MapItemsIncomeView from '@/views/MapItemsIncome.vue';

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
    },
    {
      path: '/mapping-history',
      component: MappingHistoryView,
      beforeEnter: (to, from, next) => {
        if (!store.state.user.logged) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/map-income/:id',
      component: MapItemsIncomeView,
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
