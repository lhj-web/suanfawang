<template>
  <div class="pay-order">
    <p style="font-size: 20px">通知：</p>
    <br/>
    <div class="character">{{message}}</div>
    <br/>
    <Button type="default" url="https://market.m.taobao.com/apps/market/shop/simpleshop.html?wh_weex=true&shopId=148491159&sellerId=1932681319&spm=a2141.7631565.backup.0&_inNestedEmbed=true&inWeexShop=true&ignoreShopHeadEvent=false&weexShopTransparentBG=true&_page_inside_embed_=true&_page_home_isweex_=true&useIframeInWeb=false" v-show="show">点击跳转链接</Button>
    <p style="color: #FF1654; font-size: 15px">如果您是在微信中打开本站，请点击复制链接按钮后在浏览器中打开</p>
    <Button data-clipboard-text="https://market.m.taobao.com/apps/market/shop/simpleshop.html?wh_weex=true&shopId=148491159&sellerId=1932681319&spm=a2141.7631565.backup.0&_inNestedEmbed=true&inWeexShop=true&ignoreShopHeadEvent=false&weexShopTransparentBG=true&_page_inside_embed_=true&_page_home_isweex_=true&useIframeInWeb=false" @click="copy" ref="copy">复制链接</Button>
  </div>
</template>

<script>
import { payOrder } from 'api/user'
import { Button, Notify } from 'vant'
import Clipboard from 'clipboard'

export default {
  name: 'PayOrder',
  components: {
    Button,
    // Clipboard,
  },
  data() {
    return {
      message: '',
      show: false,
      copyBtn: null,
    };
  },
  mounted() {
    this.copyBtn = new Clipboard(this.$refs.copy)
    payOrder(this.$route.params.id,
      {
        username: localStorage.getItem('username'),
        spassword: localStorage.getItem('password')
      })
      .then((res) => {
        if (res.status === 403) {
          this.message = res.data.message
        }
        if (res.status === 0) {
          this.message = res.message
          this.show = true
        }
      })
  },
  methods: {
    copy() {
      const clipboard = this.copyBtn
      clipboard.on('success', () => {
        Notify({ type: 'success', message: '复制成功' })
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.pay-order
  background-color #fff
  padding 20px
.character
  font-size: 20px
</style>
