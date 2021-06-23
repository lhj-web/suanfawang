<template>
  <div class="swiper">
    <Swipe :autoplay="3000" indicator-color="white" class="my-wipe">
      <SwipeItem v-for="(item) of arr" :key="item.id">
        <img :src="item.image" alt style="width: 100%"/>
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
      arr: []
    };
  },
  mounted() {
    getSwiperImg().then((res) => {
      this.arr = res.data
    })
  },
};
</script>

<style lang="stylus" scoped>
.swiper
  .my-wipe
    .van-swipe-item
      color #fff
      font-size 20px
      line-height 150px
      text-align center
      background-color #39a9ed
</style>
