import directives from "../../directives";
import request from "../../utils/request";
Vue.use(directives);
Vue.prototype.$http = request;
export default function (vmData) {
    new Vue({
        el: "#app",
        data() {
            return {
                ...(vmData.data && vmData.data() || {})
            };
        },
        components: {
            ...vmData.components
        }
    });
}