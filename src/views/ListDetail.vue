<template>
  <div class="list-detail">
    <NavBar
      :title="cate_name"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/')"
    >
      <template #right>
        <Icon name="wap-home-o" size="20" />
      </template>
    </NavBar>
    <div class="detail" style="background-color: #fff; padding: 10px; margin-top: 10px">
      <div class="info">
        <VanImage :src="author_picture" fit="cover" radius="5px" width="40px" height="40px" />
        <span class="name">{{author_name}}</span>
      </div>
      <h2>{{title}}</h2>
      <br />
      <span style="font-size: 15px" class="content">{{content}}</span>
      <br />
      <div v-show="cover_img">
        <br />
        <VanImage
          :src="cover_img"
          fit="cover"
          radius="5px"
          width="40px"
          height="40px"
          @click="showImage"
        />
      </div>
      <br />
      <Tag plain type="warning" size="large">赏金</Tag>
      <span style="margin-left: 8px;font-size: 15px;color: #FF6B6B">{{ price }}元</span>
      <Icon name="eye-o" style="margin: 0 3px 0 300px;vertical-align: middle" size="16" />
      {{view_count}}
      <br />
      <br />
      <Button plain type="info" size="large" @click="takeOrder" v-show="state===0">立即接单</Button>
      <br />
      <br />
      <Button plain
      type="warning" size="large" @click="enterRoom" v-show="id !== author_id">进入聊天</Button>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Icon, Image as VanImage, Tag, Button, Notify, ImagePreview
} from 'vant'
import { getDetail } from 'api/list-data'
import { takeOrder, getUserInfo } from 'api/user'

export default {
  name: 'ListDetail',
  components: {
    NavBar, Icon, VanImage, Tag, Button
  },
  data() {
    return {
      cate_name: '',
      price: '',
      pub_date: '',
      state: '',
      title: '',
      view_count: '',
      cover_img: '',
      content: '',
      author_name: '',
      author_picture: '',
      list: [],
      id: localStorage.getItem('id'),
      author_id: '',
    };
  },
  mounted() {
    getDetail(this.$route.params.id).then((res) => {
      const {
        cate_name, price, state, title, view_count,
        cover_img, content, pub_date, author_name, author_pic, author_id, id
      } = res.data
      this.cate_name = cate_name
      this.price = price
      this.title = title
      this.state = state
      this.view_count = view_count
      this.cover_img = cover_img
      this.content = content
      this.pub_date = pub_date
      this.author_name = author_name
      this.author_picture = author_pic
      this.author_id = author_id
      this.$store.commit('setNoticeId', id)
    })
  },
  sockets: {
    message(data) {
      this.$router.push(`/chat-room/${data.room_id}`)
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!window.localStorage.getItem('token')) {
      Notify({ type: 'danger', message: '请先登录' })
      next('/')
    }
    next()
  },
  methods: {
    takeOrder() {
      takeOrder(this.$route.params.id).then((res) => {
        if (!res.status) {
          Notify({ type: 'success', message: '接单成功' })
          this.state = 1
        } else if (res.status === 403) {
          Notify({ type: 'danger', message: res.data.message })
        }
      })
    },
    showImage() {
      ImagePreview([this.cover_img])
    },
    enterRoom() {
      this.$socket.emit('create_room', { token: localStorage.getItem('token').slice(7), deliver_id: this.author_id })
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
.content
  font-family Arial, Helvetica, sans-serif
  font-size 1em
  vertical-align middle
  font-weight normal
.chat
  margin-top 20px
  background-color #fff
  .content
    padding 10px
</style>
