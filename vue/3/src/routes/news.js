import Header from "../components/header";
import Footer from "../components/footer";
import News from "../components/news";

export default {
    path: "/news",
    name: "news",
    components: {
        header: Header,
        default: News,
        footer: Footer
    },
    children: [
        {
            path: ":id",
            name: "news_1",
            component: {
                template: `<div>新闻：{{this.$route.params.id}}</div>`
            }
        }
    ]
}