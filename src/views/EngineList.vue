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
      <Tab title="web开发">
        <simple-list />
      </Tab>
      <Tab title="工科业务"></Tab>
      <Tab title="社科业务"></Tab>
      <Tab title="论文辅导"></Tab>
      <Tab title="企业项目"></Tab>
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
        <Field name="cate_id" label="类型" size="large" required >
          <template #input>
            <RadioGroup v-model="radio">
              <Radio :name="0">web开发</Radio>
              <Radio :name="1">工科业务</Radio>
              <Radio :name="2">社科业务</Radio>
              <Radio :name="3">论文辅导</Radio>
              <Radio :name="4">企业项目</Radio>
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
  NavBar, Icon, Tabs, Tab, Button, Popup, Form, Field, RadioGroup, Radio, Uploader, Stepper
} from 'vant'
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
      radio: 0,
      title: '',
      content: '',
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      price: 500
    };
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onSubmit(vals) {
      console.log(vals);
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
  padding-bottom: 20px
</style>
