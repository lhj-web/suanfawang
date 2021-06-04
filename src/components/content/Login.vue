<template>
  <div class="login">
    <br />
    <Form @submit="onSubmit">
      <Field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <Field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <Button round block native-type="submit" type="info">提交</Button>
      </div>
      <div style="margin: 16px">
        <a href="javascript:;" @click="showPopup" class="link">注册</a>
        <Overlay :show="show">
          <div class="wrapper">
            <Register />
            <Button round block @click="cancle">取消</Button>
          </div>
        </Overlay>
      </div>
    </Form>
  </div>
</template>

<script>
import {
  Form, Field, Button, Overlay
} from 'vant'
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
      console.log(values);
    },
    showPopup() {
      this.show = true
    },
    cancle() {
      this.show = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  .link
    color: #1989fa
    margin-left 300px
</style>
