import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";
import Router from "./routes";

Vue.use(VueRouter);

new Vue({
    el: "#app",
    data: {
        links: [
            {url: "/home", "name": "首页"},
            {url: "/news", "name": "新闻"}
        ],
        copyright: "底部版权"
    },
    router: Router
});