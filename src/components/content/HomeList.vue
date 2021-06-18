<template>
  <div class="home-list">
    <br />
    <Collapse v-model="activeNames">
      <CollapseItem title="单子列表" name="0" size="large">
        <Cell
          v-for="(item, index) in $store.state.listName"
          :key="item.id"
          :title="item.name"
          is-link
          to="engine-list"
          @click="setActive(index)"
          size="large"
          v-show="item.is_delete === 0"
        />
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import {
  Collapse, CollapseItem, Cell, Notify
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
    };
  },
  methods: {
    setActive(index) {
      this.$store.commit('setActive', index);
    }
  },
  mounted() {
    this.$store.dispatch('getCateList')
  },
};
</script>

<style lang="stylus" scoped></style>
