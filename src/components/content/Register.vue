<template>
  <div class="register">
    <Form @submit="onSubmit">
      <Field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { validator: validateLength, message: '用户名长度为5-12位'}
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
          {validator: validatePass, message: '密码长度为6-12位'}
        ]"
      />
      <Field
        v-model="confirm"
        type="password"
        name="confirm"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }, { validator, message: '两次密码不一致'}]"
      />
      <Field
        v-model="mobile"
        name="mobile"
        type="tel"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <Field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <Field
        v-model="qq"
        name="qq"
        type="tel"
        label="QQ号"
        placeholder="QQ号"
        :rules="[{ required: true, message: '请填写QQ号' }]"
      />
      <Field
        v-model="wx"
        name="wx"
        label="微信号"
        placeholder="微信号"
        :rules="[{ required: true, message: '请填写微信号' }]"
      />
      <Field name="user_type" label="单选框">
        <template #input>
          <RadioGroup v-model="radio" direction="horizontal">
            <Radio :name="0">普通用户</Radio>
            <Radio :name="1">技术员</Radio>
          </RadioGroup>
        </template>
      </Field>
      <div style="margin: 16px 0">
        <Button round block native-type="submit" type="info">提交</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import {
  Form, Field, Button, RadioGroup, Radio, Notify,
} from 'vant'
import { register } from 'api/user'

export default {
  name: 'Register',
  components: {
    Form,
    Field,
    Button,
    RadioGroup,
    Radio,
  },
  data() {
    return {
      username: '',
      password: '',
      confirm: '',
      mobile: '',
      email: '',
      qq: '',
      wx: '',
      radio: 0,
    };
  },
  methods: {
    onSubmit(values) {
      delete values.confirm
      register(values).then((res) => {
        if (res.status === 403) {
          Notify({ type: 'danger', message: res.data.message })
        } else {
          Notify({ type: 'success', message: '注册成功' })
          this.$emit('success')
        }
      }).catch((err) => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    },
    validator(vals) {
      return vals === this.password
    },
    validateLength(vals) {
      return /^.{5,12}$/.test(vals)
    },
    validatePass(vals) {
      return /^.{6,12}$/.test(vals)
    }
  }
};
</script>

<style lang="stylus" scoped></style>
