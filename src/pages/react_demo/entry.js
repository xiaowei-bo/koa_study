import init from "../../common/js/initReact";
import Index from "./views/index";
import Index1 from "./views/index1";

const idToComponentMap = {
    app: Index,
    app1: Index1
};
init(idToComponentMap);
