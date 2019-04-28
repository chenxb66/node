import Vue from "vue/dist/vue.esm";
import MyDialog from "./components/my-dialog";

new Vue({
    el: '#app',
    data: {},
    template: `
<div>
    <my-dialog>
        <template slot="title">我是标题</template>
        <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </my-dialog>
</div>`
})