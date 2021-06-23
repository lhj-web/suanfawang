import Vue from 'vue';
import moment from 'moment';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';

import 'assets/css/base.css'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.config.productionTip = false;
let token = ''
if (localStorage.getItem('token')) {
  token = localStorage.getItem('token').slice(7)
}

Vue.use(new VueSocketIO({

  debug: true,

  connection: 'http://47.98.188.254:8001',
  options: { query: `token=${token}` }
}))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
