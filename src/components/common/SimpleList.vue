<template>
  <div class>
    <br />
    <Collapse v-model="activeNames">
      <CollapseItem title="需求" name="0" size="large">
        <List v-model="loading" :finish="finished" finished-text="没有更多了" @load="onLoad">
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
  Collapse, CollapseItem, List, Card, Tag, Icon
} from 'vant';

export default {
  name: 'SimpleList',
  components: {
    Collapse, CollapseItem, List, Card, Tag, Icon
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: '请问改程序多少钱',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: false,
          cate_name: '工科单子'
        },
        {
          id: 2,
          title: 'wqe',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: true,
          cate_name: '工科单子'
        },
        {
          id: 3,
          title: 'wqe',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: false,
          cate_name: '工科单子'
        },
        {
          id: 4,
          title: 'wqe',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: false,
          cate_name: '工科单子'
        },
        {
          id: 5,
          title: 'wqe',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: false,
          cate_name: '工科单子'
        },
        {
          id: 6,
          title: 'wqe',
          price: 456,
          view_count: 6,
          pub_date: '2021-04-10 11:33:41.000',
          state: false,
          cate_name: '工科单子'
        },
      ],
      loading: false,
      finished: false,
      activeNames: ['0']
    };
  },
  methods: {
    onLoad() {
    },
    openDetail(id) {
      console.log(id);
    }
  },
  filters: {
    formatPrice(value) {
      if (!value) {
        return '无'
      }
      return `${value.toFixed(2)}元`
    }
  }
};
</script>

<style lang="stylus" scoped></style>
