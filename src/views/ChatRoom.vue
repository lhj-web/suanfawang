<template>
  <div>
    <user-chat v-if="!isUser" />
    <tel-chat v-else />
  </div>
</template>

<script>
import TelChat from '../components/common/TelChat.vue';
import UserChat from '../components/common/UserChat.vue';

export default {
  name: 'ChatRoom',
  components: {
    UserChat,
    TelChat
  },
  data() {
    return {
      isUser: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/') {
        vm.isUser = false
      }
    })
  },
};
</script>

<style lang="stylus" scoped></style>
