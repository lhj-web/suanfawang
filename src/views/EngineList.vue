<template>
  <div class="engine-list">
    <NavBar left-text="返回" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <Icon name="question-o" />
        <router-link to="help">帮助</router-link>
      </template>
    </NavBar>
    <Swiper />
    <br />
    <Tabs v-model="active">
      <Tab
        v-for="item of $store.state.listName"
        :key="item.id"
        :title="item.name"
        v-show="item.is_delete === 0"
      >
        <simple-list :getDataList="getListData" :id="item.id" />
      </Tab>
    </Tabs>
    <Button
      round
      type="info"
      icon="plus"
      size="large"
      style="position: fixed; bottom: 0"
      @click="showPopup()"
      v-show="!$store.state.isUser"
    >发布需求</Button>
    <Popup v-model="show" position="bottom" closeable>
      <Form @submit="onSubmit">
        <Field
          v-model="title"
          name="title"
          label="标题"
          placeholder="请填写标题"
          size="large"
          required
          :rules="[{ required: true }]"
        />
        <Field name="cate_id" label="类型" size="large" required>
          <template #input>
            <RadioGroup v-model="radio">
              <Radio
                v-for="item in $store.state.listName"
                :key="item.id"
                :name="item.id"
              >{{item.name}}</Radio>
            </RadioGroup>
          </template>
        </Field>
        <Field
          v-model="content"
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
            <Stepper v-model="price" theme="round" step="10" integer input-width="70px" />
            <span style="margin-left: 5px;font-size: 17px; margin-right: 10px">元</span>
            <span style="color: orange">只能为整数</span>
          </template>
        </Field>
        <Field
          name="code"
          label="验证码"
          required
          v-model="code"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <img :src="img" alt style="width: 100px" @click="changeCode()" />
          </template>
        </Field>
        <Field name="cover_img" label="上传图片">
          <template #input>
            <Uploader v-model="uploader" :max-count="1"/>
          </template>
        </Field>
        <div style="margin: 16px 0">
          <Button round block native-type="submit" type="info">提交</Button>
        </div>
      </Form>
    </Popup>
  </div>
</template>

<script>
import {
  NavBar, Icon, Tabs, Tab, Button, Popup, Form, Field, RadioGroup, Radio, Uploader, Stepper, Notify
} from 'vant'
import { getListData } from 'api/list-data'
import { getAuthCode, addRequirement } from 'api/add-news'
import { v4 as uuid4 } from 'uuid'
import Swiper from '../components/common/Swiper.vue';
import SimpleList from '../components/common/SimpleList.vue';

export default {
  name: 'EngineList',
  components: {
    Swiper,
    NavBar,
    Icon,
    Tabs,
    Tab,
    SimpleList,
    Button,
    Popup,
    Form,
    Field,
    RadioGroup,
    Radio,
    Uploader,
    Stepper
  },
  data() {
    return {
      show: false,
      radio: 1,
      title: '',
      content: '',
      uploader: [],
      price: 500,
      getListData,
      code: '',
      img: '',
      uuid: '',
    };
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this.changeCode()
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onSubmit(vals) {
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
      data.append('uuid', this.$store.state.sid)
      addRequirement(data).then((res) => {
        if (res.status === 401) {
          Notify({ type: 'danger', message: '请先登录' })
          this.$router.push('/')
          this.$store.commit('setIndexActive')
        } else if (res.status === 403) {
          Notify({ type: 'warning', message: res.data.message })
        } else if (res.status === 500) {
          Notify({ type: 'danger', message: '服务器出错了' })
        } else {
          Notify({ type: 'success', message: '发布成功' })
          this.show = false
          window.location.reload()
        }
      })
    },
    changeCode() {
      this.$store.dispatch('getCateList')
      const { sid } = this.$store.state
      getAuthCode(sid).then((res) => {
        this.img = res.data
      })
    },
  },
  computed: {
    active: {
      get() {
        return this.$store.state.active
      },
      set() {
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.engine-list
  padding-bottom 20px
</style>
