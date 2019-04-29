import Vue from "vue";
import Router from "vue-router";

import User from "@/user/user.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/home",
            name: "home",
            component: {
                template: "<div>hello</div>"
            }
        },
        {
            path: "/user",
            name: "user",
            component: User
        }
    ]
});
