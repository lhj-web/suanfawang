<template>
  <div class>
    <br />
    <Collapse v-model="activeNames">
      <CollapseItem title="需求" name="0" size="large">
        <List
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <Card v-for="item in list" :key="item.id" @click="openDetail(item.id)">
            <template #title>
              <h2 style="color: #011627;font-size: 19px">{{item.title}}</h2>
            </template>
            <template #tags>
              <span style="color: #6D6875">{{ $moment(item.pub_date).fromNow() }}</span>
            </template>
            <template #footer>
              <Tag plain type="danger" v-show="item.state">已被接单</Tag>
              <Tag plain type="primary" v-show="!item.state">未接单</Tag>
              <Icon name="eye-o" style="margin: 0 3px 0 10px;vertical-align: middle" size="16" />
              <span style="vertical-align: middle;color: #6D6875">{{item.view_count}}</span>
            </template>
            <template #price>
              <Tag plain type="warning" size="large">赏金</Tag>
              <span
                style="margin-left: 8px;font-size: 15px;color: #FF6B6B"
              >{{ item.price | formatPrice }}</span>
            </template>
          </Card>
        </List>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import {
  Collapse, CollapseItem, List, Card, Tag, Icon, Notify
} from 'vant';
import { visitStatistics } from 'api/list-data'

export default {
  name: 'SimpleList',
  components: {
    Collapse, CollapseItem, List, Card, Tag, Icon,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      activeNames: ['0'],
      index: 0,
      error: false,
    };
  },
  props: {
    getDataList: {
      type: Function,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    visitStatistics(this.$props.id)
  },
  methods: {
    onLoad() {
      this.index += 1
      this.$props.getDataList(this.index, this.$props.id)
        .then((res) => {
          if (res.data.length > 0) {
            this.list.push(...res.data)
          }
          this.loading = false
          if (this.list.length >= res.total) {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          Notify({ type: 'warning', message: '请求超时' })
        })
    },
    openDetail(id) {
      this.$router.push(`/list-detail/${id}`)
    },
  },
  filters: {
    formatPrice(value) {
      if (!value) {
        return '无'
      }
      return `${value}元`
    }
  }
};
</script>

<style lang="stylus" scoped></style>
