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
    </Collapse>
  </div>
</template>

<script>
import {
  Image as VanImage, Form, Field, Button, RadioGroup, Radio, Notify, Collapse, CollapseItem
} from 'vant'
import { getUserInfo } from 'api/user'
import avatar from 'assets/img/avatar.png'

export default {
  name: 'Profile',
  components: {
    VanImage, Form, Field, Button, RadioGroup, Radio, Collapse, CollapseItem
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
    };
  },
  mounted() {
    getUserInfo()
      .then((res) => {
        console.log(res);
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
      console.log(vals);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
