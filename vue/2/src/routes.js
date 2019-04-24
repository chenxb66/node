import Header from "./components/header";
import Home from "./components/home";
import News from "./components/news";
import Footer from "./components/footer";

export default [
    {
        path: "/home",
        name: "home",
        components: {
            header: Header,
            default: Home,
            footer: Footer
        }
    },
    {
        path: "/news/:id",
        name: "news",
        components: {
            header: Header,
            default: News,
            footer: Footer
        }
    }
];