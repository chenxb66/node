import Header from "../components/header";
import Index from "../components/index";
import Footer from "../components/Footer";

export default {
    path: "/index",
    name: "index",
    components: {
        header: Header,
        default: Index,
        footer: Footer
    },
    children: [
        
    ]
}