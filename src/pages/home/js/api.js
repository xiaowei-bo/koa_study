import request from "../../../utils/request";
export function getDemo() {
    return request({
        url: "/api/demo/index.paper",
        method: "GET"
    });
}