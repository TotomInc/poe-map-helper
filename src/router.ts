import Vue from 'vue';
import Router from 'vue-router';
import isElectron from 'is-electron';

import store from '@/store';

import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import SetupCharacterView from '@/views/SetupCharacter.vue';
import SetupStashView from '@/views/SetupStash.vue';
import MappingHistoryView from '@/views/MappingHistory.vue';
import SharedMappingHistoryView from '@/views/SharedMappingHistory.vue';
import MapItemsIncomeView from '@/views/MapItemsIncome.vue';
import BrowserView from '@/views/Browser.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        // On Electron, you must be logged to access any view
        if (isElectron()) {
          if (!store.state.user.logged) {
            next('/login');
          } else {
            next();
          }
        }
        // On browser, you can only access the shared-mapping-history view
        else if (from.path !== '/shared-mapping-history') {
          next('/login');
        }
      },
    },
    {
      path: '/login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (!isElectron()) {
          next('/browser');
        } else {
          next();
        }
      },
    },
    {
      path: '/browser',
      component: BrowserView,
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
      },
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
      },
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
      },
    },
    {
      path: '/shared-mapping-history',
      component: SharedMappingHistoryView,
      beforeEnter: (to, from, next) => {
        if (isElectron() && !store.state.user.logged) {
          next('/login');
        } else {
          next();
        }
      },
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
      },
    },
  ],
});
