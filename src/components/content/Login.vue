<template>
  <div class="login">
    <br />
    <Form @submit="onSubmit">
      <Field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { validator: validateLength, message: '用户名长度位5-12位'}
        ]"
      />
      <Field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: validatePass, message: '密码长度为6-12位'}

        ]"
      />
      <div style="margin: 16px">
        <Button round block native-type="submit" type="info">提交</Button>
      </div>
    </Form>
    <div style="margin: 16px">
      <a href="javascript:;" @click="showPopup" class="link">注册</a>
      <Overlay :show="show">
        <div class="wrapper">
          <Register v-on:success="cancelShow()" />
          <Button round block @click="cancle">取消</Button>
        </div>
      </Overlay>
    </div>
  </div>
</template>

<script>
import {
  Form, Field, Button, Overlay, Notify
} from 'vant'
import { login } from 'api/user'
import Register from './Register.vue'

export default {
  name: 'Login',
  components: {
    Form,
    Field,
    Button,
    Register,
    Overlay
  },
  data() {
    return {
      username: '',
      password: '',
      show: false
    };
  },
  methods: {
    onSubmit(values) {
      login(values).then((res) => {
        if (res.status === 403) {
          Notify({ type: 'danger', message: res.data.message })
        } else {
          Notify({ type: 'success', message: '登陆成功' })
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('username', values.username)
          window.localStorage.setItem('password', values.password)
          window.location.reload()
        }
      }).catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    },
    showPopup() {
      this.show = true
    },
    cancle() {
      this.show = false
    },
    validateLength(vals) {
      return /^.{5,12}$/.test(vals)
    },
    validatePass(vals) {
      return /^.{6,12}$/.test(vals)
    },
    cancelShow() {
      this.show = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  .link
    color #1989fa
    margin-left 300px
</style>
