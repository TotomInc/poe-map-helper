import Vue from 'vue';
import VueNotification from 'vue-notification';
import VueGoodTable from 'vue-good-table';
import VueSelect from 'vue-select';
import { dateFiler } from 'vue-date-fns';

import 'vue-good-table/dist/vue-good-table.css';
import 'vue-select/dist/vue-select.css';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueNotification);
Vue.use(VueGoodTable);

Vue.component('v-select', VueSelect);

Vue.filter('date', dateFiler);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
