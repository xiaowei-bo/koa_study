const demoServer = require("./modules/demo");
const objToArr = (obj) => {
    const arr = [];
    for(const k in obj) {
        arr.push(obj[k]);
    }
    return arr;
}

const allServer = [
    ...objToArr(demoServer)
]

module.exports = router => {
    for(const { type, url, handler } of allServer) {
        switch(type) {
            case "GET":
                router.get(`/mock${url}`, handler);
                break;
            case "POST":
                router.post(`/mock${url}`, handler);
                break;
        }
    }
}