<template>
  <div class="swiper">
    <Swipe :autoplay="3000" indicator-color="white" class="my-wipe">
      <SwipeItem>1</SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>3</SwipeItem>
      <SwipeItem>4</SwipeItem>
      <SwipeItem>5</SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  name: 'Swiper',
  components: {
    Swipe,
    SwipeItem
  },
  data() {
    return {};
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
