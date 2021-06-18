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
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'
import { getDetail } from 'api/list-data'

export default {
  name: 'ListDetail',
  components: {
    NavBar, Icon
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
      content: ''
    };
  },
  mounted() {
    getDetail(this.$route.params.id).then((res) => {
      console.log(res);
      const {
        cate_name, price, state, title, view_count, cover_img, content
      } = res.data
      this.cate_name = cate_name
      this.price = price
      this.title = title
      this.state = state
      this.view_count = view_count
      this.cover_img = cover_img
      this.content = content
    })
  }
};
</script>

<style lang="stylus" scoped></style>
