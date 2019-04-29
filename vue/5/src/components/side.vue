<!--  -->
<template>
  <div class="side">
    <div class="side-scroll">
      <div class="logo">
        <span>{{name}}</span>
      </div>
      <my-anchors ref="links"></my-anchors>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SideAnchor from "@/side_anchor.vue";

export default {
  name: "slide",
  props: ["name"],
  //import引入的组件需要注入到对象中才能使用
  components: {'my-anchors': SideAnchor},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let {data} = await this.axios.get("http://www.test.com/menu.php");

    this.$store.dispatch('links', data);
  },
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
.side {
  position: fixed;
  width: 220px;
  top: 0;
  bottom: 0;
  z-index: 1001;
  width: 220px;
  overflow-x: hidden;
  color: #fff;
  background-color: #20222a;
}

.side-scroll {
  position: relative;
  width: 240px;
  height: 100%;
  overflow-x: hidden;
}

.logo {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1002;
  width: 220px;
  height: 49px;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  font-weight: 300;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #20222a;
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
</style>