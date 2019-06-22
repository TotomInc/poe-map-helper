import Vue from 'vue';
import VueUI from '@vue/ui';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
