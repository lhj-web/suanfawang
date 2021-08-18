<template>
  <div class="home">
    <Swiper />
    <Tabs v-model="$store.state.indexActive">
      <Tab title="首页">
        <template #title>
          <Icon name="wap-home-o" size="20px" style="vertical-align: top; margin-right: 3px"/>首页
        </template>
        <HomeList />
      </Tab>
      <Tab>
        <template #title>
          <Icon
            name="comment-circle-o"
            size="23px"
            style="vertical-align: middle; margin-right: 3px"
          />用户反馈
        </template>
        <feedback :isToken ="isToken" />
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
import Profile from '../components/content/Profile.vue'
import Feedback from './Feedback.vue';

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
    Feedback,
  },
  data() {
    return {
      isToken: !!window.localStorage.getItem('token'),
      msgNum: 0,
      newMsgNum: 0,
    }
  },
  // mounted() {
  //   this.newMsgNum = this.$store.state.message + this.$store.state.notice
  //   console.log(this.newMsgNum);
  //   console.log(this.msgNum);
  // }
};
</script>
