import Header from "../components/header";
import Footer from "../components/footer";
import News from "../components/news";
import {newsDetail} from "../components/news";

export default {
    path: "/news",
    name: "news",
    components: {
        header: Header,
        default: News,
        footer: Footer
    },
    children: newsDetail
}