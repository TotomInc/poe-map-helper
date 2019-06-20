import Vue from 'vue';
import VueUI from '@vue/ui';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
