import Vue from "vue/dist/vue.esm";
import Enyccc from "./components/enyccc";

new Vue({
    el: "#app",
    data: {},
    template: `
<div>
    <enyccc title="用户信息" :info="{name: '陈晓波', age: '30'}" />
</div>    
`
});