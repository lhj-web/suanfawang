<template>
  <div class="home">
    <Swiper />
    <Tabs v-model="active">
      <Tab title="首页">
        <HomeList />
      </Tab>
      <Tab title="搜索"></Tab>
      <Tab title="登录">
        <Login />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Login from '../components/content/Login.vue';
import Swiper from '../components/common/Swiper.vue';
import HomeList from '../components/content/HomeList.vue';

export default {
  name: 'Home',
  components: {
    Tab,
    Tabs,
    Login,
    Swiper,
    HomeList,
  },
  data() {
    return {
      active: 0
    }
  },

};
</script>
