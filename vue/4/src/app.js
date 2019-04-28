/**
 * 局部组件案例
 */
import Vue from "vue/dist/vue.esm"

let vm = new Vue({
    el: "#app",
    data: {},
    template: "<div><cmp1/><div>",
    // 局部组件
    components: {
        // 创建一个组件
        cmp1: {
            template: '<div>aaa</div>'
        }
    }
})