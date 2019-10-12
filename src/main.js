import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

const axios = require('axios').default;

window.axios = axios.create({
  baseURL: 'http://localhost:3000',
});

window._ = require('lodash');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
