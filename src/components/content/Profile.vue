<template>
  <div class="profile">
    <br />
    <div style="background: #fff;padding: 20px">
      <VanImage
        :src="avatar"
        width="70"
        height="70"
        round
        fit="cover"
        style="margin-left: 50%;transform: translateX(-50%)"
      />
      <div
        style="text-align: center;
        margin-top: 5px;
        font-size: 20px;
        color: #2B2D42"
      >{{nickname}}</div>
      <Uploader
        style="margin-left: 50%;transform: translateX(-50%);margin-top: 20px"
        :after-read="afterRead"
      >
        <Button icon="plus" type="default" size="mini">上传头像</Button>
      </Uploader>
    </div>
    <Collapse v-model="active">
      <CollapseItem name="0" size="large" title="修改个人信息">
        <Form @submit="onSubmit">
          <Field
            v-model="nickname"
            name="nickname"
            label="昵称"
            placeholder="昵称"
            :rules="[
          { required: true, message: '请填写用户名' },
        ]"
          />
          <Field
            v-model="mobile"
            name="mobile"
            type="tel"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <Field v-model="email" name="email" label="邮箱" placeholder="邮箱" />
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
      </CollapseItem>
      <CollapseItem name="1" size="large" title="修改密码">
        <Form @submit="submit">
          <Field
            name="oldPwd"
            type="password"
            label="旧密码"
            placeholder="旧密码"
            v-model="oldPwd"
            :rules="[
          { required: true, message: '请填写密码' },
          { validator: validatePass, message: '密码长度为6-12位' }]"
          />
          <Field
            v-model="password"
            type="password"
            name="newPwd"
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
          <div style="margin: 16px 0">
            <Button round block native-type="submit" type="info">提交</Button>
          </div>
        </Form>
      </CollapseItem>
    </Collapse>
    <br />
    <Button block type="info" @click="exit">退出</Button>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Form, Field, Button, RadioGroup, Radio, Notify, Collapse, CollapseItem, Uploader,
} from 'vant'
import {
  getUserInfo, changeAvatar, updateUserInfo, resetPassword
} from 'api/user'
import avatar from 'assets/img/avatar.png'

export default {
  name: 'Profile',
  components: {
    VanImage, Form, Field, Button, RadioGroup, Radio, Collapse, CollapseItem, Uploader
  },
  data() {
    return {
      avatar,
      active: ['0'],
      nickname: '',
      mobile: '',
      email: '',
      qq: '',
      wx: '',
      radio: '',
      password: '',
      confirm: '',
      oldPwd: '',
    };
  },
  mounted() {
    getUserInfo()
      .then((res) => {
        const {
          nickname, email, mobile, qq, wx, user_type, user_pic
        } = res.data
        this.avatar = user_pic || avatar
        this.nickname = nickname || 'user'
        this.email = email
        this.mobile = mobile
        this.qq = qq
        this.wx = wx
        this.radio = user_type ? 1 : 0
      })
      .catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
  },
  methods: {
    onSubmit(vals) {
      updateUserInfo(vals)
        .then((res) => {
          Notify({ type: 'success', message: res.message })
        })
        .catch(() => {
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    afterRead(file) {
      console.log(file.content);
      const base64 = { avatar: file.content }
      changeAvatar(base64)
        .then((res) => {
          Notify({ type: 'success', message: res.message })
          this.avatar = file.content
        })
        .catch(() => {
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    submit(vals) {
      delete vals.confirm
      resetPassword(vals)
        .then((res) => {
          if (res.status === 403) {
            Notify({ type: 'danger', message: res.data.message })
          } else {
            Notify({ type: 'success', message: '修改成功' })
          }
        })
        .catch(() => {
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    validator(vals) {
      return vals === this.password
    },
    validatePass(vals) {
      return /^.{6,12}$/.test(vals)
    },
    exit() {
      window.localStorage.removeItem('token')
      window.location.reload()
    }
  }
};
</script>

<style lang="stylus" scoped></style>
