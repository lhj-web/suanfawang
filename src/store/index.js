import Vue from 'vue';
import Vuex from 'vuex';
import { Notify } from 'vant'
import { getCateList } from 'api/list-data'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active: 0,
    listName: [],
    indexActive: 0,
  },
  mutations: {
    setActive(state, count) {
      state.active = count;
    },
    setListName(state, list) {
      state.listName = list
    },
    setIndexActive(state) {
      state.indexActive = 2
    }
  },
  actions: {
    getCateList({ commit }) {
      getCateList().then((res) => {
        commit('setListName', res.data)
      }).catch(() => {
        Notify({ type: 'warning', message: '请求超时' })
      })
    }
  },
  modules: {
  },
});
