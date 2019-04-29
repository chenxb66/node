import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  //要设置的全局访问的state对象
  links: [],
  count: 1
  //要设置的初始属性值
};

const mutations = {
  links(state, links) {
    //同上，这里面的参数除了state之外还传了需要增加的值sum
    state.links = links;
  },
  count(state, num) {
      state.count =num;
  }
};

const getters = {
  links() {
    //承载变化的changebleNum的值
    return state.links;
  },
  count() {
      console.log('count');
      return state.count
  }
};

const actions = {
  links(context, links) {
    //同上注释，num为要变化的形参
    context.commit("links", links);
  },
  count(context, num) {
    context.commit("count", num);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
