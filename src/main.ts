import Vue from 'vue';
import VueUI from '@vue/ui';
import VueNotification from 'vue-notification';
import VueGoodTable from 'vue-good-table';
import VueMoment from 'vue-moment';

import 'vue-good-table/dist/vue-good-table.css';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueUI);
Vue.use(VueNotification);
Vue.use(VueGoodTable);
Vue.use(VueMoment);

new Vue({
  router,
  store,

  // Fix for Electron app not redirecting by default to '/'
  mounted() {
    this.$router.push('/');
  },

  render: (h) => h(App)
}).$mount('#app');
