import Vue from 'vue';
import VueNotification from 'vue-notification';
import VueGoodTable from 'vue-good-table';
import VueSelect from 'vue-select';
import { dateFilter } from 'vue-date-fns';

import 'vue-good-table/dist/vue-good-table.css';
import 'vue-select/dist/vue-select.css';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueNotification);
Vue.use(VueGoodTable);

Vue.component('v-select', VueSelect);

Vue.filter('date', dateFilter);

new Vue({
  router,
  store,

  // Fix for Electron app not redirecting by default to '/'
  mounted() {
    this.$router.push('/');
  },

  render: (h) => h(App)
}).$mount('#app');
