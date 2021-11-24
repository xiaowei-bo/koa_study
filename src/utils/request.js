import axios from "axios";
const request = axios.create();

if(devType && devType === "MOCK") {
    console.log("mock 开发模式已开启，请小心驾驶!!!");
}
// http request 拦截器
request.interceptors.request.use(
    config => {
        if(config.isMock && devType && devType === "MOCK") {
            console.log(`${config.url} —— 该接口正在使用 mock服务`);
            config.url = `/mock${config.url}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
request.interceptors.response.use(
    (response = {}) => {
        //拦截响应，做统一处理
        let data = response.data || {};
        return data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    (error = {}) => {
        // 返回接口返回的错误信息
        return Promise.reject(error.response && error.response.status);
    }
);

export default request;
