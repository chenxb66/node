<!--  -->
<template lang="html">

  <ul class="nav">
      <li v-for="item in links"><router-link :to="item.url">{{item.name}}</router-link></li>
    </ul>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    links() {
      return this.$store.state.links;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='css' scoped>
.nav {
  width: 220px;
  margin-top: 50px;
  background: 0 0;
  color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0;
}
.nav li {
      height: 40px;
    line-height: 40px;
    padding-left: 45px;
    padding-right: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.nav a {
  display:block;
  color: #fff;
}
</style>