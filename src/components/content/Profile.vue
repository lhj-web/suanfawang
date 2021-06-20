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
    <Collapse v-model="active" accordion>
      <CollapseItem name="0" title="修改个人信息" icon="user-circle-o">
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
      <collapse-item name="1" title="发布的订单" icon="comment-o" v-show="!$store.state.isUser">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <Card v-for="item in list" :key="item.id" @click="modifyOrder(item.id)">
            <template #title>
              <h2 style="color: #011627;font-size: 19px">{{item.title}}</h2>
            </template>
            <template #tags>
              <span style="color: #6D6875">{{ $moment(item.pub_date).fromNow() }}</span>
            </template>
            <template #footer>
              <Tag plain type="danger" v-show="item.state">已被接单</Tag>
              <Tag plain type="primary" v-show="!item.state">未接单</Tag>
              <Icon name="eye-o" style="margin: 0 3px 0 10px;vertical-align: middle" size="16" />
              <span style="vertical-align: middle;color: #6D6875">{{item.view_count}}</span>
            </template>
            <template #price>
              <Tag plain type="warning" size="large">赏金</Tag>
              <span
                style="margin-left: 8px;font-size: 15px;color: #FF6B6B"
              >{{ item.price | formatPrice }}</span>
            </template>
          </Card>
          <template #right>
            <Button
              square
              type="danger"
              text="删除"
              style="height: 100%"
              @click="deleteOrder(item.id)"
            />
          </template>
        </List>
      </collapse-item>
      <collapse-item name="1" title="已接的订单" icon="comment-o" v-show="$store.state.isUser">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad1"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <Card v-for="item in list" :key="item.id" @click="cancelOrder(item.id)">
            <template #title>
              <h2 style="color: #011627;font-size: 19px">{{item.title}}</h2>
            </template>
            <template #tags>
              <span style="color: #6D6875">接单时间：{{ $moment(item.pub_date).fromNow() }}</span>
            </template>
            <template #footer>
              <Tag plain type="danger" v-show="item.state">已被接单</Tag>
              <Tag plain type="primary" v-show="!item.state">未接单</Tag>
              <Icon name="eye-o" style="margin: 0 3px 0 10px;vertical-align: middle" size="16" />
              <span style="vertical-align: middle;color: #6D6875">{{item.view_count}}</span>
            </template>
            <template #price>
              <Tag plain type="warning" size="large">赏金</Tag>
              <span
                style="margin-left: 8px;font-size: 15px;color: #FF6B6B"
              >{{ item.price | formatPrice }}</span>
            </template>
          </Card>
          <template #right>
            <Button
              square
              type="danger"
              text="删除"
              style="height: 100%"
              @click="deleteOrder(item.id)"
            />
          </template>
        </List>
      </collapse-item>
      <CollapseItem name="2" title="修改密码" icon="closed-eye">
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
      <collapse-item name="3" title="联系客服" icon="phone-o">
        <Cell v-for="(key, value) in service" :key="key" :title="value" :value="key" />
      </collapse-item>
    </Collapse>
    <Popup v-model="show" position="bottom" closeable get-container="#app">
      <Form @submit="onSubmitM">
        <Field
          v-model="item.title"
          name="title"
          label="标题"
          placeholder="请填写标题"
          size="large"
          required
          :rules="[{ required: true }]"
        />
        <Field name="cate_id" label="类型" size="large" required>
          <template #input>
            <RadioGroup v-model="item.cate_name">
              <Radio
                v-for="item in $store.state.listName"
                :key="item.id"
                :name="item.id"
              >{{item.name}}</Radio>
            </RadioGroup>
          </template>
        </Field>
        <Field
          v-model="item.content"
          name="content"
          label="内容"
          rows="2"
          type="textarea"
          maxlength="200"
          placeholder="请输入需求内容"
          show-word-limit
          size="large"
          required
          clearable
          :rules="[{ required: true }]"
        />
        <Field name="price" label="赏金" required>
          <template #input>
            <Stepper v-model="price" integer input-width="70px" theme="round" />
            <span style="margin-left: 5px;font-size: 17px">元</span>
          </template>
        </Field>
        <Field name="cover_img" label="上传图片">
          <template #input>
            <Uploader v-model="uploader" :max-count="1" />
          </template>
        </Field>
        <Field name="state" label="状态" required>
          <template #input>
            <RadioGroup v-model="state" direction="horizontal">
              <Radio :name="0">未被接单</Radio>
              <Radio :name="1">已被接单</Radio>
            </RadioGroup>
          </template>
        </Field>
        <div style="margin: 16px 0">
          <Button round block native-type="submit" type="info">提交修改</Button>
        </div>
      </Form>
      <Button round block type="danger" @click="deleteOrder">删除</Button>
    </Popup>
    <Popup v-model="show1" position="bottom">
      <Button type="danger" block @click="cancel">取消接单</Button>
    </Popup>
    <br />
    <Button block type="info" @click="exit">退出</Button>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Form, Field, Button, Cell,
  RadioGroup, Radio, Notify,
  Collapse, CollapseItem, Uploader,
  List, Card, Tag, Icon, Popup, Stepper
} from 'vant'
import {
  getUserInfo, changeAvatar, updateUserInfo, resetPassword, getServiceInfo, cancelOrder
} from 'api/user'
import { getMyList, getDetail, getMyList1 } from 'api/list-data'
import { updateRequirement, deleteRequirement } from 'api/add-news'
import avatar from 'assets/img/avatar.png'

export default {
  name: 'Profile',
  components: {
    VanImage,
    Form,
    Field,
    Button,
    RadioGroup,
    Radio,
    Collapse,
    CollapseItem,
    Uploader,
    List,
    Card,
    Tag,
    Icon,
    Popup,
    Stepper,
    Cell,
  },
  data() {
    return {
      avatar,
      active: '0',
      nickname: '',
      mobile: '',
      email: '',
      qq: '',
      wx: '',
      radio: '',
      password: '',
      confirm: '',
      oldPwd: '',
      list: [],
      loading: false,
      finished: false,
      activeNames: ['0'],
      index: 0,
      error: false,
      item: '',
      show: false,
      uploader: [],
      price: 0,
      id: '',
      state: '',
      service: {},
      show1: false
    };
  },
  filters: {
    formatPrice(value) {
      if (!value) {
        return '无'
      }
      return `${value}元`
    }
  },
  mounted() {
    this.$socket.emit('connect', 1)
    getUserInfo()
      .then((res) => {
        if (res.status === 401) {
          Notify({ type: 'danger', message: '请先登录' })
          window.location.reload()
        }
        if (res.data.user_pic) {
          localStorage.setItem('avatar', res.data.user_pic)
        }
        if (res.data.nickname) {
          localStorage.setItem('nickname', res.data.nickname)
        }
        const {
          nickname, email, mobile, qq, wx, user_type, user_pic, id
        } = res.data
        localStorage.setItem('id', id)
        this.avatar = user_pic || avatar
        this.nickname = nickname || 'user'
        this.email = email
        this.mobile = mobile
        this.qq = qq
        this.wx = wx
        this.radio = user_type ? 1 : 0
        this.$store.commit('setIsUser', user_type)
      })
      .catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    getServiceInfo()
      .then((res) => {
        this.service = res.data
      })
  },
  methods: {
    onSubmit(vals) {
      updateUserInfo(vals)
        .then((res) => {
          Notify({ type: 'success', message: res.message })
          localStorage.setItem('nickname', vals.nickname)
        })
        .catch(() => {
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    afterRead(file) {
      const base64 = { avatar: file.content }
      changeAvatar(base64)
        .then((res) => {
          Notify({ type: 'success', message: res.message })
          this.avatar = file.content
          localStorage.setItem('avatar', file.content)
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
    },
    onLoad() {
      this.index += 1
      getMyList(this.index)
        .then((res) => {
          if (res.status === 401) {
            window.location.reload()
          }
          if (res.data.length > 0) {
            this.list.push(...res.data)
          }
          this.loading = false
          if (this.list.length >= res.total) {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    onLoad1() {
      this.index += 1
      getMyList1(this.index)
        .then((res) => {
          if (res.status === 401) {
            window.location.reload()
          }
          if (res.data.length > 0) {
            this.list.push(...res.data)
          }
          this.loading = false
          if (this.list.length >= res.total) {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    modifyOrder(id) {
      getDetail(id).then((res) => {
        switch (res.data.cate_name) {
          case '工科业务':
            res.data.cate_name = 1
            break;
          case '社科业务':
            res.data.cate_name = 2
            break
          case '没接汇总':
            res.data.cate_name = 3
            break
          case '论文辅导':
            res.data.cate_name = 4
            break
          case 'web开发':
            res.data.cate_name = 5
            break
          case '企业项目':
            res.data.cate_name = 6
            break
          default:
            Notify({ type: 'danger', message: '该分类不存在' })
        }
        this.price = res.data.price
        if (res.data.cover_img) {
          this.uploader = []
          this.uploader.push({ url: res.data.cover_img })
        }
        this.item = res.data
        this.id = id
        this.show = true
        this.state = res.data.state
      }).catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    },
    onSubmitM(vals) {
      const data = new FormData()
      if (vals.cover_img.length > 0) {
        const img = vals.cover_img[0].file
        vals.cover_img = img
      } else {
        vals.cover_img = ''
      }
      Object.keys(vals).forEach((key) => {
        data.append(key, vals[key]);
      });
      updateRequirement(this.id, data).then((res) => {
        if (!res.status) {
          Notify({ type: 'success', message: '更新成功' })
          this.show = false
        } else {
          Notify({ type: 'danger', message: '更新失败' })
        }
      }).catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    },
    deleteOrder() {
      deleteRequirement(this.id).then((res) => {
        if (!res.status) {
          Notify({ type: 'success', message: '删除成功' })
          const index = this.list.findIndex((item) => item.id === this.id)
          this.$delete(this.list, index)
          this.show = false
        }
      }).catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    },
    cancelOrder(id) {
      this.id = id
      this.show1 = true
    },
    cancel() {
      cancelOrder(this.id).then((res) => {
        if (!res.status) {
          Notify({ type: 'success', message: '取消成功' })
          const index = this.list.findIndex((item) => item.id === this.id)
          this.$delete(this.list, index)
          this.show1 = false
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped></style>
