import Vue from "vue/dist/vue.esm"
import VueRouter from "vue-router";
import routes from './routes';
import "./css/main.css"

Vue.use(VueRouter);

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    data:{},
    router: router
});