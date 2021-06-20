<template>
  <div class="home">
    <Swiper />
    <Tabs v-model="$store.state.indexActive">
      <Tab title="首页">
        <template #title>
          <Icon name="wap-home-o" size="20px" style="vertical-align: middle; margin-right: 3px"/>首页
        </template>
        <HomeList />
      </Tab>
      <Tab badge="1">
        <template #title>
          <Icon
            name="chat-o"
            size="20px"
            style="vertical-align: middle; margin-right: 3px"
          />消息
        </template>
      </Tab>
      <Tab v-if="!isToken">
        <template #title>
          <Icon
            name="sign"
            size="20px"
            style="vertical-align: middle; margin-right: 3px"
          />登录
        </template>
        <Login />
      </Tab>
      <Tab v-if="isToken">
        <template #title>
          <Icon
            name="user-o"
            size="20px"
            style="vertical-align: middle; margin-right: 3px"
          />我的
        </template>
        <profile />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import {
  Tab, Tabs, Icon,
} from 'vant'
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
    Icon,
  },
  data() {
    return {
      isToken: !!window.localStorage.getItem('token'),
    }
  },

};
</script>
