import Header from "../components/header";
import News from "../components/news";
import Footer from "../components/Footer";

export default {
    path: "/news/:id",
    name: "news",
    components: {
        header: Header,
        default: News,
        footer: Footer
    }   
}