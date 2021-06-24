<template>
  <div class="swiper">
    <Swipe :autoplay="3000" indicator-color="white" class="my-wipe">
      <SwipeItem v-for="(item) of arr" :key="item.id">
        <img :src="item.image" alt />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { getSwiperImg } from 'api/swiper'

export default {
  name: 'Swiper',
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      arr: [{ id: '1', image: 'https://img01.yzcdn.cn/vant/apple-1.jpg' }, { id: '2', image: 'https://img01.yzcdn.cn/vant/apple-2.jpg' }]
    };
  },
  mounted() {
    getSwiperImg().then((res) => {
      if (res.data.length > 0) {
        this.arr = res.data
      }
    })
  },
};
</script>

<style lang="stylus" scoped>
.swiper
  .my-wipe
    .van-swipe-item
      width 100%
      height 200px
      img
        max-height 200px
        max-width 100%
        width 100%
</style>
