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
import swiper1 from 'assets/img/1.png'
import swiper2 from 'assets/img/2.png'
import swiper3 from 'assets/img/3.png'
import swiper4 from 'assets/img/4.png'
import swiper5 from 'assets/img/5.png'

export default {
  name: 'Swiper',
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {
      arr: [{ id: '1', image: swiper1 }, { id: '2', image: swiper2 }, { id: '3', image: swiper3 }, { id: '4', image: swiper4 }, { id: 5, image: swiper5 }]
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
