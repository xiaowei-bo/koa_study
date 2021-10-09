module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        parser: "babel-eslint",
    },
    env: {
        es6: true,
        browser: true,
        jquery: true
    },
    globals: {
        "Vue": true,
        "Swiper": true
    },
    plugins: ["vue"],
    extends: ["eslint:recommended", "plugin:vue/essential"],
    rules: {
        "no-var": "error",
        "no-duplicate-imports": "error",
        "vue/valid-v-bind-sync": "off",
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "semi": ["error", "always"],
        "no-async-promise-executor": ["off"],
        'vue/custom-event-name-casing': 0,
        "no-extra-boolean-cast": "off"
    }
};