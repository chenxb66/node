import Vue from "vue/dist/vue.esm";

export default Vue.component("enyccc", {
    props: ["title", "info"],
    data() {
        return {}
    },
    template: `
    <div>
        <h2>{{title}}</h2>
        <ul>
            <li v-for="value,key in info">{{key}}: {{value}}</li>
        </ul>
    </div>    
`
});