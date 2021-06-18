<template>
  <div class>
    <nav-bar title="帮助" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <br />
    <Collapse v-model="activeName" accordion>
      <CollapseItem
        v-for="(item, index) in list"
        :key="index"
        :title="item"
        :name="index"
      >hello world</CollapseItem>
    </Collapse>
    <!-- eslint-disable -->
  </div>
</template>

<script>
import {
  NavBar, Collapse, CollapseItem
} from 'vant'

export default {
  name: 'Help',
  components: {
    NavBar, Collapse, CollapseItem
  },
  data() {
    return {
      list: ['不会发布？', '怎么删除？', '我发布的去哪？', '查看不了电话号码？', '验证不了电话号码？'],
      activeName: '1',
    };
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped></style>
