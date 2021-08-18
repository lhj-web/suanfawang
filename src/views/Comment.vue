<template>
  <div class="">
    <nav-bar title="评价" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <br>
    <div class="content">
      <p class="info">订单标题：{{info.target}}</p>
      <p class="info">价格：{{info.price}}元</p>
      <p class="info">接单者：{{info.receiver}}</p>
      <RadioGroup v-model="radio" direction="horizontal">
        <Radio name="2">好评</Radio>
        <Radio name="1">中评</Radio>
        <Radio name="0">差评</Radio>
      </RadioGroup>
      <br>
      <Rate v-model="value"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
      />
      <br><br><br>
      <Field
      type="textarea" label="评价"
      maxlength="200" show-word-limit placeholder="请输入评价" autosize v-model="comment" />
      <br>
      <p class="info1">是否匿名：<radio-group v-model="radio1" direction="horizontal">
        <radio name="0">否</radio>
        <radio name="1">是</radio>
      </radio-group></p>
      <Button type="info" block @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import { getMyComment, publishComment } from 'api/user'
import {
  NavBar, Radio, RadioGroup, Rate, Field, Button, Notify
} from 'vant'

export default {
  name: 'Comment',
  components: {
    NavBar, RadioGroup, Radio, Rate, Field, Button
  },
  data() {
    return {
      info: {},
      radio: '2',
      value: 5,
      comment: '',
      radio1: '0',
    };
  },
  mounted() {
    getMyComment(this.$route.params.id).then((res) => {
      if (res.status === 1) {
        Notify({ type: 'danger', message: '该订单已评价' })
        this.$router.go(-1)
      } else {
        this.info = res.data
      }
    })
  },
  methods: {
    submit() {
      publishComment({
        evaluate: this.radio,
        comment: this.comment,
        is_anonymous: this.radio1,
        score: this.value,
        payorder_id: this.$route.params.id
      }).then(() => {
        Notify({ type: 'success', message: '评价成功' })
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.content
  padding 20px
  background #fff
  .info
    font-size 18px
    margin-bottom 30px
  .info1
    font-size 18px
    display flex
    margin-bottom 10px
</style>
