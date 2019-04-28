import Home from "./home";
import News from "./news";
import VueRouter from "vue-router";

const router = new VueRouter({
    routes: [Home, News]
});


export default router;