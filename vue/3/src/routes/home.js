import Header from "../components/header";
import Footer from "../components/footer";
import Home from "../components/home";

export default {
    path: "/home",
    name: "home",
    components: {
        header: Header,
        default: Home,
        footer: Footer
    }
}