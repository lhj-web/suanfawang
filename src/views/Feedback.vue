<template>
  <div class>
    <br />
    <div style="background: #fff; padding: 20px">
      <div class="info" v-for="item of feedbackList" :key="item.id">
        <VanImage :src="item.user_pic" fit="cover" radius="5px" width="40px" height="40px" />
        <span class="name" style="margin-left: 5px">{{item.nickname}}</span>
        <p style="margin-top: 10px; font-size: 15px">内容：{{item.content}}</p>
        <divider />
      </div>
    </div>
    <Button type="warning" block @click="feedback" style="position: fixed; bottom: 0;">我要反馈</Button>
    <Popup v-model="show" position="bottom" style="height: 30%">
      <Form @submit="onSubmit">
        <Field
          v-model="info"
          name="content"
          rows="3"
          autosize
          required
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          maxlength="200"
          show-word-limit
          :rules="[{ required: true }]"
        />
        <Field
          name="code"
          label="验证码"
          required
          v-model="code"
          placeholder="请输入验证码"
          :rules="[{ required: true }]"
        >
          <template #button>
            <img :src="img" alt style="width: 100px" @click="changeCode()" />
          </template>
        </Field>
        <Button type="primary" block native-type="submit">提交</Button>
      </Form>
    </Popup>
  </div>
</template>

<script>
import {
  Field, Button, Dialog, Popup, Notify, Form, Image as VanImage, Divider
} from 'vant'
import { userFeedback, getFeedback } from 'api/user'
import { getAuthCode } from 'api/add-news'
import { v4 as uuid4 } from 'uuid'

export default {
  name: 'Feedback',
  components: {
    Field, Button, Popup, Form, VanImage, Divider
  },
  props: ['isToken'],
  data() {
    return {
      info: '',
      show: false,
      loading: false,
      finished: false,
      error: false,
      img: '',
      code: '',
      feedbackList: []
    };
  },
  mounted() {
    getFeedback().then((res) => {
      this.feedbackList = res.data
    })
    if (this.isToken) {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid')
      } else {
        sid = uuid4()
        localStorage.setItem('sid', sid)
      }
      this.changeCode()
    }
  },
  methods: {
    onSubmit() {
      userFeedback({ content: this.info, code: this.code, uuid: localStorage.getItem('sid') }).then((res) => {
        if (res.status === 0) {
          Notify({ type: 'success', message: '提交成功' })
        } else {
          Notify({ type: 'warning', message: res.data.message })
        }
      })
      this.show = false
    },
    feedback() {
      if (!this.isToken) {
        Dialog.alert({
          title: '提醒',
          message: '您还未登录，请先注册并登陆后再进行该操作'
        }).then(() => {
          window.location.reload()
        })
      } else {
        this.show = true
        this.changeCode()
      }
    },
    onLoad() {
      this.finished = true
    },
    changeCode() {
      const sid = localStorage.getItem('sid')
      getAuthCode(sid).then((res) => {
        this.img = res.data
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.info
  position relative
  margin-bottom 20px
  .name
    position absolute
    left 50px
    top 10px
    font-size 15px
    color black
</style>
