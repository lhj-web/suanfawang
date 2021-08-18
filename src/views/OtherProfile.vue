<template>
  <div>
    <NavBar title="个人主页" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <br />
    <div style="background: #fff;padding: 20px">
      <VanImage
        :src="userInfo.user_pic"
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
      >{{userInfo.nickname}}</div>
    </div>
    <cell-group>
      <cell title="个人描述" :value="userInfo.description" />
      <cell title="用户类型" :value="userInfo.user_type" />
    </cell-group>
    <br>
    <cell-group v-for="(item, index) of userInfo.comments" :key="index">
      <cell title="评分" :value="item.evaluate" />
      <cell title="评价" :value="item.comment" />
      <cell title="星评">
        <template #right-icon>
          <Rate :value="item.score"/>
        </template>
      </cell>
    </cell-group>
    <br>
    <cell-group v-for="item of userInfo.notices" :key="item.id" inset>
      <cell title="单子标题" :value="item.title" />
      <cell title="价格" :value="item.price" />
      <cell title="接单或发单用户" :value="item.nickname" />
    </cell-group>
  </div>
</template>

<script>
import {
  NavBar, Image as VanImage, CellGroup, Cell, Rate
} from 'vant'
import { getUserProfile } from 'api/user'

export default {
  name: 'OtherProfile',
  components: {
    NavBar, VanImage, Cell, CellGroup, Rate
  },
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    getUserProfile(this.$route.params.id).then((res) => {
      res.data.user_type = res.data.user_type ? '接单员' : '普通用户'
      this.userInfo = res.data
    })
  }
};
</script>

<style lang="stylus" scoped></style>
