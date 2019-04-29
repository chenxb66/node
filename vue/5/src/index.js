import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import VueAxios from "vue-axios";
import Axios from "axios";

Vue.use(VueAxios, Axios);


new Vue({
    el: "#app",
    data: {},
    store,
    router,
    template: `<App/>`,
    components: {App},
});