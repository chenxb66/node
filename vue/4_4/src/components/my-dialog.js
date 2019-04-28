import Vue from "vue/dist/vue.esm";
import "bootstrap/dist/css/bootstrap.css"
import "../css/main.css"


export default Vue.component('my-dialog', {
    data() {
        return {}
    },
    template: `
    <div class="panel panel-default my-dialog">
        <div class="panel-heading">
            <div class="panel-title"><slot name="title" /></div>
        </div>
        <div class="panel-body">
            <slot />
        </div>
    </div>
    `
});