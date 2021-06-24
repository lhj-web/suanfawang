<template>
  <div class="pay-order">
    <p style="font-size: 20px">通知：</p>
    <br/>
    <div class="character">{{message}}</div>
    <br/>
    <Button type="default" url="https://market.m.taobao.com/apps/market/shop/simpleshop.html?wh_weex=true&shopId=148491159&sellerId=1932681319&spm=a2141.7631565.backup.0&_inNestedEmbed=true&inWeexShop=true&ignoreShopHeadEvent=false&weexShopTransparentBG=true&_page_inside_embed_=true&_page_home_isweex_=true&useIframeInWeb=false" v-show="show">点击跳转链接</Button>
  </div>
</template>

<script>
import { payOrder } from 'api/user'
import { Button } from 'vant'

export default {
  name: 'PayOrder',
  components: {
    Button
  },
  data() {
    return {
      message: '',
      show: false
    };
  },
  mounted() {
    payOrder(this.$route.params.id,
      {
        username: localStorage.getItem('username'),
        spassword: localStorage.getItem('password')
      })
      .then((res) => {
        if (res.status === 403) {
          this.message = res.message
        }
        if (res.status === 0) {
          this.message = res.message
          this.show = true
        }
      })
  }
};
</script>

<style lang="stylus" scoped>
.pay-order
  background-color #fff
.character
  font-size: 20px
</style>
