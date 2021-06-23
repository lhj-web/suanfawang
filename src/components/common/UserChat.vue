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
          <img :src="itemc.headUrl" />
        </div>
      </div>
    </div>
    <div class="input">
      <Field v-model="text" label="输入框" placeholder="说点什么吧~" left-icon="edit">
        <template #button>
          <Button type="info" size="small" @click="sendMessage">发送</Button>&nbsp;
        </template>
      </Field>
    </div>
  </div>
</template>

<script>
import {
  NavBar, Icon, Field, Button
} from 'vant'
import { getInfoByid } from 'api/user'

export default {
  name: 'UserChat',
  components: {
    NavBar,
    Icon,
    Field,
    Button
  },
  data() {
    return {
      recordContent: [
      ],
      text: '',
      nickname: '',
      user_pic: ''
    };
  },
  mounted() {
    this.$socket.emit('connect')
  },
  sockets: {
    connect() {
      getInfoByid(this.$store.state.message[0].from_id).then((res) => {
        const { user_pic, nickname } = res.data
        this.nickname = nickname
        this.user_pic = user_pic
        const arr = this.$store.state.message.map((item) => {
          if (item.from_id === localStorage.getItem('id')) {
            return ({
              mineMsg: true,
              timestamp: item.timestamp,
              headUrl: localStorage.getItem('avatar'),
              nickName: localStorage.getItem('nickname'),
              contactText: item.msg
            })
          }
          return ({
            mineMsg: false,
            timestamp: item.timestamp,
            headUrl: this.user_pic,
            nickName: this.nickname,
            contactText: item.msg
          })
        })
        this.recordContent.push(...arr)
      })
    },
    message(data) {
      this.recordContent.push({
        mineMsg: false,
        timestamp: data.timestamp,
        headUrl: this.user_pic,
        nickName: this.nickname,
        contactText: data.msg
      })
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {
        room_id: this.$route.params.id,
        from_id: localStorage.getItem('id'),
        to_id: this.$store.state.message.from_id,
        msg: this.text,
        msg_type: 0,
        timestamp: new Date().getTime()
      })
      this.recordContent.push({
        mineMsg: true, timestamp: new Date().getTime(), headUrl: localStorage.getItem('avatar'), nickName: localStorage.getItem('nickname'), contactText: this.text
      })
      this.text = ''
    },
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
