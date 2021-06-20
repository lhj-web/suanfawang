import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/Home.vue')
const EngineList = () => import('../views/EngineList.vue')
const Help = () => import('../views/Help.vue')
const ListDetail = () => import('../views/ListDetail.vue')
const ChatRoom = () => import('../views/ChatRoom.vue')

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
  },
  {
    path: '/list-detail/:id',
    name: 'ListDetail',
    component: ListDetail
  },
  {
    path: '/chat-room/:id',
    name: 'ChatRoom',
    component: ChatRoom,
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
