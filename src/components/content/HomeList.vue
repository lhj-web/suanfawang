<template>
  <div class="home-list">
    <br />
    <Collapse v-model="activeNames" accordion>
      <CollapseItem title="单子列表" name="0" size="large">
        <Cell
          v-for="(item, index) in $store.state.listName"
          :key="item.id"
          :title="item.name"
          is-link
          to="engine-list"
          @click="setActive(index)"
          size="large"
          v-show="item.is_delete === 0"
        />
      </CollapseItem>
      <collapse-item title="技术员排名" name="1" size="large">
        <Card v-for="item of rank" :key="item.id" style="font-size: 15px">
          <template #thumb>
            <img :src="item.user_pic" alt style="width: 70px" v-show="item.user_pic" />
            <img :src="avatar" alt style="width: 70px" v-show="!item.user_pic" />
          </template>
          <template #title>昵称：{{item.nickname}}</template>
          <template #price>接单总数：{{item.total}}</template>
          <template #desc>
            <p style="padding-top: 5px; color: #5E6472">个人描述：{{item.description}}</p>
          </template>
          <template #footer>
            <p style="font-size: 14px; color: #02C39A">成功率：{{item.success_rate | formatRate}}</p>
            <p style="font-size: 14px; color: #ED6A5A">好评率：{{item.favorable_rate | formatRate}}</p>
          </template>
        </Card>
      </collapse-item>
      <collapse-item title="帮助" name="2" size="large">
        <collapse v-model="activeName" accordion>
          <CollapseItem
        v-for="(item, index) in list"
        :key="item.id"
        :title="item.name"
        :name="index"
        @click.native="getHelp(item.id)"
      >{{helpInfo.content}}</CollapseItem>
        </collapse>
      </collapse-item>
    </Collapse>
  </div>
</template>

<script>
import {
  Collapse, CollapseItem, Cell, Card
} from 'vant'
import { getTechnician } from 'api/user'
import userImg from 'assets/img/avatar.png'
import { getHelpCateList, getHelpDetail } from 'api/list-data'

export default {
  name: 'HomeList',
  components: {
    Collapse,
    CollapseItem,
    Cell,
    Card
  },
  data() {
    return {
      activeNames: '0',
      rank: [],
      avatar: userImg,
      list: [],
      helpInfo: {},
      activeName: '1',
    };
  },
  methods: {
    setActive(index) {
      this.$store.commit('setActive', index);
    },
    getHelp(id) {
      getHelpDetail(id).then((res) => {
        this.helpInfo = res.data
      })
    }
  },
  mounted() {
    this.$store.dispatch('getCateList')
    getTechnician().then((res) => {
      this.rank = res.data
    })
    getHelpCateList().then((res) => {
      this.list = res.data
    })
  },
  filters: {
    formatRate(value) {
      return `${(value * 100).toFixed(1)}%`
    }
  }
};
</script>

<style lang="stylus" scoped></style>
