/**
 * @description 全局自定义指令
 */

import { copyText } from "../utils/index";
 export default {
    install(Vue) {
        /**
         * @description 复制指令
         */
        Vue.directive("copy", {
            inserted: function(el, binding) {
                el.addEventListener("click", () => {
                    copyText(binding.value);
                }, false);
            }
        });
    }
};
