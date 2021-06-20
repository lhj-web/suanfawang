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
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'ChatRoom',
  components: {
    NavBar,
    Icon,
  },
  data() {
    return {};
  },
  mounted() {
    this.$socket.emit('create_room', { token: localStorage.getItem('token').slice(7), deliver_id: '' })
  },
  sockets: {

  }
};
</script>

<style lang="stylus" scoped></style>
