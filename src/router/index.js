import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/Home.vue')
const EngineList = () => import('../views/EngineList.vue')
const Help = () => import('../views/Help.vue')

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/engine-list',
    name: 'EngineList',
    component: EngineList
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
