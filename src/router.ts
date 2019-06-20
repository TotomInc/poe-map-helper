import Vue from 'vue';
import Router from 'vue-router';

import LoginView from './views/Login.vue';
import HomeView from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('POESESSID')) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
});
