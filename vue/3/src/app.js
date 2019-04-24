import Vue from "vue/dist/vue.esm"
import VueRouter from "vue-router";
import router from './router';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    data:{},
    router: router
});