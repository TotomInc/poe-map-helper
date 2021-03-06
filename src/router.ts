import Vue from 'vue';
import Router from 'vue-router';
import isElectron from 'is-electron';

import store from '@/store';

import HomeView from '@/views/Home.vue';
import LoginView from '@/views/Login.vue';
import BrowserView from '@/views/Browser.vue';
import MappingHistoryView from '@/views/MappingHistory.vue';
import MapItemsIncomeView from '@/views/MapItemsIncome.vue';

import SetupCharacterView from '@/views/setup/SetupCharacter.vue';
import SetupStashView from '@/views/setup/SetupStash.vue';

import SharedMapItemsIncomeView from '@/views/shared/SharedMapItemsIncome.vue';
import SharedMappingHistoryView from '@/views/shared/SharedMappingHistory.vue';

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
        // On browser, you can only access the `/shared` paths
        else if (!from.path.includes('/shared')) {
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
      path: '/setup/character',
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
      path: '/setup/stash',
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
      path: '/shared/mapping-history',
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
    {
      path: '/shared/map-income/:id',
      component: SharedMapItemsIncomeView,
      beforeEnter: (to, from, next) => {
        if (isElectron() && !store.state.user.logged) {
          next('/login');
        } else if (!isElectron() && store.state.share.mapsHistory.length === 0) {
          next('/shared/mapping-history');
        } else {
          next();
        }
      },
    },
  ],
});
