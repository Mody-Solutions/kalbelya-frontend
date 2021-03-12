/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import App from './App.vue';
// router setup
import router from './routes/router';
import store from './plugins/store';
import axios from 'axios'

Vue.prototype.$http = axios;

const token = localStorage.getItem('access_token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// plugin setup
import DashboardPlugin from './plugins/dashboard-plugin';
Vue.use(DashboardPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
