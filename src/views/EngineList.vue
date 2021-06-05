<template>
  <div class="engine-list">
    <NavBar left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <Icon name="question-o" />
        <router-link to="help">帮助</router-link>
      </template>
    </NavBar>
    <Swiper />
    <br />
      <Tabs v-model="active">
        <Tab title="web开发">
          <simple-list />
        </Tab>
        <Tab title="工科业务"></Tab>
        <Tab title="社科业务"></Tab>
        <Tab title="论文辅导"></Tab>
        <Tab title="企业项目"></Tab>
      </Tabs>
  </div>
</template>

<script>
import {
  NavBar, Icon, Tabs, Tab
} from 'vant'
import Swiper from '../components/common/Swiper.vue';
import SimpleList from '../components/common/SimpleList.vue';

export default {
  name: 'EngineList',
  components: {
    Swiper,
    NavBar,
    Icon,
    Tabs,
    Tab,
    SimpleList,
  },
  data() {
    return {
    };
  },
  computed: {
    active: {
      get() {
        return this.$store.state.active
      },
      set() {
      }
    }
  },
};
</script>

<style lang="stylus" scoped></style>
