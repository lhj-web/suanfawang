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
          maxlength="50"
          placeholder="请输入需求内容"
          show-word-limit
          size="large"
          required
          clearable
          :rules="[{ required: true }]"
        />
        <Field name="price" label="赏金" required>
          <template #input>
            <Stepper v-model="price" theme="round" />
            <span style="margin-left: 5px;font-size: 17px">元</span>
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
            <Uploader v-model="uploader" />
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
    this.changeCode()
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onSubmit(vals) {
      const blob = this.dataURItoBlob(vals.cover_img[0].content)
      const url = URL.createObjectURL(blob);
      vals.cover_img = 'blob:d3958f5c-0777-0845-9dcf-2cb28783acaf'
      addRequirement(vals, this.uuid).then((res) => {
        if (res.status === 401) {
          window.localStorage.removeItem('token')
          Notify({ type: 'danger', message: '请先登录' })
          this.$router.push('/')
          this.$store.commit('setIndexActive')
        } else if (res.status === 403) {
          Notify({ type: 'warning', message: res.data.message })
        } else {
          Notify({ type: 'success', message: '发布成功' })
          this.show = false
        }
      })
    },
    generateUuid() {
      const tempUrl = URL.createObjectURL(new Blob());
      const uuid = tempUrl.toString();
      URL.revokeObjectURL(tempUrl);
      return uuid.substr(uuid.lastIndexOf('/') + 1);
    },
    changeCode() {
      this.uuid = this.generateUuid()
      this.$store.dispatch('getCateList')
      getAuthCode(this.uuid).then((res) => {
        this.img = res.data
      })
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
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
