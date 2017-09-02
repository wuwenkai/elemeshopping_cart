import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import axios from 'axios';

import './assets/stylus/index.styl';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuex);

const store = new Vuex.Store({});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
