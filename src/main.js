import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

import 'assets/css/base.css'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
