<template>
  <div class="home">
    <Swiper />
    <Tabs v-model="$store.state.indexActive">
      <Tab title="首页">
        <HomeList />
      </Tab>
      <Tab title="搜索"></Tab>
      <Tab title="登录" v-if="!isToken">
        <Login />
      </Tab>
      <Tab title="我的" v-if="isToken">
        <profile />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Login from '../components/content/Login.vue';
import Swiper from '../components/common/Swiper.vue';
import HomeList from '../components/content/HomeList.vue';
import Profile from '../components/content/Profile.vue';

export default {
  name: 'Home',
  components: {
    Tab,
    Tabs,
    Login,
    Swiper,
    HomeList,
    Profile,
  },
  data() {
    return {
      isToken: !!window.localStorage.getItem('token'),
    }
  },

};
</script>
