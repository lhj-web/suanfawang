<template>
  <div class="pay-order">
    <p style="font-size: 20px">通知：</p>
    <br/>
    <div class="character">{{message}}</div>
    <br/>
    <Button type="default" url="https://baidu.com">点击跳转链接</Button>
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
      message: '创建付款订单成功，您的付款id为1897321567651，即将跳转至淘宝店铺，付款前联系客服并提供自己的付款id！'
    };
  },
  mounted() {
    payOrder(this.$router.params.id,
      {
        username: localStorage.getItem('username'),
        spassword: localStorage.getItem('password')
      })
      .then((res) => {
        this.message = res.data.message
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
