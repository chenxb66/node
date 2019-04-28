import Vue from "vue/dist/vue.esm";
import Cxb from "./components/cxb";
import Yyq from "./components/yyq"

new Vue({
    el: "#app",
    data: {
        template: "cxb"
    },
    template: `
<div>
    <input v-model="template" />
    <compnent :is="template" title="用户信息" :info="{name: '陈晓波', age: '30'}" />
</div>    
`
});