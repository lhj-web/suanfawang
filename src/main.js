import Vue from 'vue';
import moment from 'moment';
import VueSocketIO from 'vue-socket.io';
// import socketio from 'socket.io-client'
import App from './App.vue';
import router from './router';
import store from './store';

import 'assets/css/base.css'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({

  debug: true,

  connection: 'http://192.168.254.128:8001',

}))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
