<template>
  <div class="news">
    <h3 style="text-align: center; font-weight: normal;">消息通知</h3>
    <Cell
      v-for="(item, index) of news"
      :key="index"
      @click="$router.push(`/chat-room/${item.msg[0].room_id}`)"
    >
      <template #title>
        <VanImage :src="item.user_pic" width="40px" height="40xp" fit="cover" radius="5px" />&nbsp;
        <span>{{item.nickname}}</span>
      </template>
      <template #label>
        <span>{{$moment(item.msg[0].timestamp).fromNow()}}</span>
      </template>
      <template #default>
        <span style="white-space:nowrap;
        overflow: hidden; text-overflow: ellipsis;">
        {{ item.msg[item.msg.length - 1].msg }}
        </span>
      </template>
      <template #extra>
        <span style="margin-left: 5px;">
        <Badge :content="item.count" style="" />
        </span>
      </template>
    </Cell>
    <divider />
    <h3 style="text-align: center; font-weight: normal;">接单通知</h3>
    <Cell value="接了您的单子" v-for="(item, index) of $store.state.notices" :key="index">
      <template #title>
        <VanImage
        :src="item.user_photo" width="40px" height="40xp" fit="cover" radius="5px" />&nbsp;
        <span>{{item.user_nickname}}</span>&nbsp;
        <span>{{$moment(item.timestamp).fromNow()}}</span>
      </template>
    </Cell>
    <divider />
    <h3 style="text-align: center; font-weight: normal;">系统通知</h3>
    <Cell v-for="item of system" :key="item.id" :value="item.content" title="提示"></Cell>
  </div>
</template>

<script>
import {
  Cell, Divider, Image as VanImage, Badge
} from 'vant'
import { getInfoByid } from 'api/user'

export default {
  name: 'News',
  components: {
    Cell, VanImage, Divider, Badge
  },
  props: ['system', 'count'],
  data() {
    return {
      id: localStorage.getItem('id'),
      news: [],
      user_pic: '',
      nickname: '',
    };
  },
  mounted() {
    const obj = {}
    const arr1 = [...this.$store.state.message].reverse()
    arr1.forEach((item) => {
      if (!obj[item.room_id]) {
        const arr = []
        const obj1 = {}
        this.$props.count.forEach((v) => {
          if (item.room_id === v.room_id) {
            obj1.count = v.count
          }
        })
        obj[item.room_id] = item
        arr.push(item)
        obj1.msg = arr
        if (localStorage.getItem('id') === item.from_id) {
          getInfoByid(item.to_id).then((res) => {
            obj1.nickname = res.data.nickname
            obj1.user_pic = res.data.user_pic
            this.news.push(obj1)
          })
        } else {
          getInfoByid(item.from_id).then((res) => {
            obj1.nickname = res.data.nickname
            obj1.user_pic = res.data.user_pic
            this.news.push(obj1)
          })
        }
      } else {
        this.news.forEach(((value) => {
          if (value.msg[0].room_id === item.room_id) {
            value.msg.push(item)
          }
        }))
      }
    })
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped></style>
