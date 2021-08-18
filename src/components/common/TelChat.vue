<template>
  <div class="chat-room">
    <NavBar
      title="聊天内容"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/')"
    >
      <template #right>
        <Icon name="wap-home-o" size="20" />
      </template>
    </NavBar>
    <NoticeBar left-icon="volume-o" text="规则须知：后台会审查聊天记录，请勿进行私下交易" scrollable mode="closeable" />
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="chat-content">
      <!-- recordContent 聊天记录数组-->
      <div v-for="(itemc,indexc) in recordContent" :key="indexc">
        <!-- 对方 -->
        <div class="word" v-if="!itemc.mineMsg">
          <img :src="itemc.headUrl" />
          <div class="info">
            <p class="time">{{itemc.nickName}} {{$moment(itemc.timestamp).fromNow()}}</p>
            <div class="info-content">{{itemc.contactText}}</div>
          </div>
        </div>
        <!-- 我的 -->
        <div class="word-my" v-else>
          <div class="info">
            <p class="time">{{itemc.nickName}} {{$moment(itemc.timestamp).fromNow()}}</p>
            <div class="info-content">{{itemc.contactText}}</div>
          </div>
          <div>
            <img :src="itemc.headUrl" />
            <p style="margin-top: 5px; margin-left: 7px">{{itemc.is_read}}</p>
          </div>
        </div>
      </div>
    </div>
    </pull-refresh>
    <div class="input">
      <Field v-model="text" label="输入框" placeholder="说点什么吧~" left-icon="edit">
        <template #button>
          <Button type="info" size="small" @click="sendMessage">发送</Button>&nbsp;
          <Button type="default" size="small" @click="sendOrder">订单</Button>
        </template>
      </Field>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Icon, Field, Button, NoticeBar, PullRefresh
} from 'vant'
import { getDetail } from 'api/list-data'

export default {
  name: 'TelChat',
  components: {
    NavBar,
    Icon,
    Field,
    Button,
    NoticeBar,
    PullRefresh
  },
  data() {
    return {
      recordContent: [
      ],
      text: '',
      author_id: '',
      title: '',
      price: '',
      author_name: '',
      author_pic: '',
      isLoading: false,
    };
  },
  mounted() {
    this.$socket.emit('connect')
  },
  sockets: {
    connect() {
      // if (this.$store.state.message.length > 0) {
      getDetail(this.$store.state.noticeId).then((res) => {
        const {
          author_id, title, price, author_name, author_pic
        } = res.data
        this.author_id = author_id
        this.title = title
        this.price = price
        this.author_name = author_name
        this.author_pic = author_pic
        const arr = this.$store.state.message.map((item) => { // eslint-disable-line
          if (item.room_id === this.$route.params.id) {
            if (item.from_id === localStorage.getItem('id')) {
              return ({
                mineMsg: true,
                timestamp: item.timestamp,
                headUrl: localStorage.getItem('avatar'),
                nickName: localStorage.getItem('nickname'),
                contactText: item.msg,
                is_read: item.is_read ? '已读' : '未读'
              })
            }
            return ({
              mineMsg: false,
              timestamp: item.timestamp,
              headUrl: this.author_pic,
              nickName: this.author_name,
              contactText: item.msg
            })
          }
        })
        this.recordContent.push(...arr)
      })
      // }
    },
    message(data) {
      if (data.from_id !== localStorage.getItem('id')) {
        this.recordContent.push({
          mineMsg: false,
          timestamp: data.timestamp,
          headUrl: this.user_pic,
          nickname: this.nickname,
          contactText: data.msg
        })
      } else {
        this.recordContent.push({
          mineMsg: true,
          timestamp: data.timestamp,
          headUrl: localStorage.getItem('avatar'),
          nickName: localStorage.getItem('nickname'),
          contactText: data.msg,
          is_read: data.is_read ? '已读' : '未读'
        })
      }
    },
    'more_message': function(data) { // eslint-disable-line
      if (data.from_id !== localStorage.getItem('id')) {
        this.recordContent.unshift({
          mineMsg: false,
          timestamp: data.timestamp,
          headUrl: this.user_pic,
          nickName: this.nickname,
          contactText: data.msg
        })
      } else {
        this.recordContent.unshift({
          mineMsg: true, timestamp: data.timestamp, headUrl: localStorage.getItem('avatar'), nickname: localStorage.getItem('nickname'), contactText: data.msg
        })
      }
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {
        room_id: this.$route.params.id,
        from_id: localStorage.getItem('id'),
        to_id: this.author_id,
        msg: this.text,
        msg_type: 0,
        timestamp: new Date().getTime()
      })
      this.text = ''
    },
    sendOrder() {
      this.$socket.emit('message', {
        room_id: `${this.$route.params.id}`,
        from_id: `${localStorage.getItem('id')}`,
        to_id: `${this.author_id}`,
        msg: `
          标题：${this.title}
          赏金：${this.price}
          发单者：${this.author_name}
        `,
        msg_type: 1,
        timestamp: `${new Date().getTime()}`
      })
      this.recordContent.push({
        mineMsg: true,
        timestamp: new Date().getTime(),
        headUrl: localStorage.getItem('avatar'),
        nickName: localStorage.getItem('nickname'),
        contactText: `
          标题：${this.title}
          赏金：${this.price}
          发单者：${this.author_name}
        `
      })
    },
    onRefresh() {
      this.$socket.emit('more_message', { token: localStorage.getItem('token').slice(7), room_id: this.$route.params.id })
      this.isLoading = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.chat-content
  padding 20px
  .word
    display flex
    margin-bottom 20px
    img
      width 40px
      height 40px
      border-radius 50%
    .info
      margin-left 10px
      .time
        font-size 12px
        color rgba(51, 51, 51, 0.8)
        margin 0
        height 20px
        line-height 20px
        margin-top -5px
      .info-content
        padding 10px
        font-size 14px
        background #fff
        position relative
        margin-top 8px
      // 小三角形
      .info-content::before
        position absolute
        left -8px
        top 8px
        content ''
        border-right 10px solid #FFF
        border-top 8px solid transparent
        border-bottom 8px solid transparent
  .word-my
    display flex
    justify-content flex-end
    margin-bottom 20px
    img
      width 40px
      height 40px
      border-radius 50%
    .info
      width 90%
      margin-left 10px
      text-align right
      .time
        font-size 12px
        color rgba(51, 51, 51, 0.8)
        margin 0
        height 20px
        line-height 20px
        margin-top -5px
        margin-right 10px
      .info-content
        max-width 70%
        padding 10px
        font-size 14px
        float right
        margin-right 10px
        position relative
        margin-top 8px
        background #A3C3F6
        text-align left
      // 小三角形
      .info-content::after
        position absolute
        right -8px
        top 8px
        content ''
        border-left 10px solid #A3C3F6
        border-top 8px solid transparent
        border-bottom 8px solid transparent
.input
  position fixed
  bottom 0
  width 100%
</style>
