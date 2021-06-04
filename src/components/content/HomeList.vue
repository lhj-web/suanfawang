<template>
  <div class="home-list">
    <br />
    <Collapse v-model="activeNames">
      <CollapseItem title="单子列表" name="0" size="large">
        <Cell
          v-for="(item, index) in list"
          :key="item.title"
          :title="item.title"
          is-link
          to="engine-list"
          :icon="item.icon"
          @click="setActive(index)"
          size="large"
        />
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import {
  Collapse, CollapseItem, Cell,
} from 'vant'

export default {
  name: 'HomeList',
  components: {
    Collapse,
    CollapseItem,
    Cell,
  },
  data() {
    return {
      activeNames: ['0'],
      list: [
        {
          title: 'web开发',
          icon: 'fire-o'
        },
        {
          title: '工科业务',
          icon: 'coupon-o'
        },
        {
          title: '社科业务',
          icon: 'orders-o'
        },
        {
          title: '论文辅导',
          icon: 'records'
        },
        {
          title: '企业项目',
          icon: 'cluster'
        },
      ]
    };
  },
  methods: {
    setActive(index) {
      this.$store.commit('setActive', index);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
