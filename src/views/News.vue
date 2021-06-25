<template>
  <div class="news">
    <CellGroup>
      <br />
      <h2 style="text-align: center; font-weight: normal;">消息通知</h2>
      <Cell
        :value="item[item.length - 1].msg"
        v-for="(item, index) of news"
        :key="index"
        @click="$router.push(`/chat-room/${item.room_id}`)"
        v-show="item.from_id !== id"
      >
        <template #title>
          <span>{{$moment(item.timestamp).fromNow() }}</span>
        </template>
      </Cell>
    </CellGroup>
    <CellGroup>
      <br />
      <h2 style="text-align: center; font-weight: normal;">接单通知</h2>
      <Cell :value="接了您的单子" v-for="(item, index) of $store.state.notices" :key="index">
        <template #title>
          <VanImage :src="item.user_photo" width="40px" height="40xp" fit="cover" radius="5px" />
          <span>{{item.user_nickname}}</span>
        </template>
      </Cell>
    </CellGroup>
  </div>
</template>

<script>
import { Cell, CellGroup, Image as VanImage } from 'vant'

export default {
  name: 'News',
  components: {
    Cell, CellGroup, VanImage
  },
  data() {
    return {
      id: localStorage.getItem('id'),
      news: []
    };
  },
  mounted() {
    const obj = {}
    this.$store.state.message.forEach((item) => {
      if (!obj[item.room_id]) {
        const arr = []
        arr.push(item)
        this.news.push(arr)
        obj[item.roo_id] = item
      } else {
        this.news.forEach(((value) => {
          if (value[0].room_id === item.room_id) {
            value.push(item)
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
