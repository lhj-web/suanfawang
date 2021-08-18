<template>
  <div class>
    <nav-bar title="帮助" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <br />
    <Collapse v-model="activeName" accordion>
      <CollapseItem
        v-for="(item, index) in list"
        :key="item.id"
        :title="item.name"
        :name="index"
        @click.native="getHelp(item.id)"
      >{{helpInfo.content}}</CollapseItem>
    </Collapse>
    <!-- eslint-disable -->
  </div>
</template>

<script>
import {
  NavBar, Collapse, CollapseItem
} from 'vant'
import { getHelpCateList, getHelpDetail } from 'api/list-data'

export default {
  name: 'Help',
  components: {
    NavBar, Collapse, CollapseItem
  },
  data() {
    return {
      list: [],
      activeName: '1',
      helpInfo: {}
    };
  },
  mounted() {
    getHelpCateList().then((res) => {
      this.list = res.data
    })
  },
  methods: {
    getHelp(id) {
      getHelpDetail(id).then((res) => {
        this.helpInfo = res.data
      })
    }
  }
};
</script>

<style lang="stylus" scoped></style>
