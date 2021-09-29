import directives from "../../directives";
Vue.use(directives);
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