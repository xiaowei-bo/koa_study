const KoaRouter = require('koa-router'); // 路由模块
const bodyParser = require('koa-bodyparser'); // 处理 post 请求数据
const router = new KoaRouter();
const mockServer = require("../mock");
// 页面路由
const pageRouter = require('./page_router/index.js');
// 接口路由
const logicRouter = require('./logic_router/index.js');

const routerList = [...pageRouter, ...logicRouter];
// mock 命令启动
const isMock = process.argv[2] === "mock";

module.exports = (app, compiler) => {
    if(isMock) { // 本地启动mock服务
        mockServer(router);
        console.log("Mock server is start >>> /mock");
    }
    app.use(bodyParser());
    for (let routerObj of routerList) {
        const type = routerObj.type.toUpperCase();
        switch (type) {
            case 'GET':
                router.get(routerObj.url, (ctx, next) => { routerObj.handler(ctx, next, compiler) });
                break;
            case 'POST':
                router.post(routerObj.url, (ctx, next) => { routerObj.handler(ctx, next, compiler) });
                break;
        }
    }
    app.use(router.routes()).use(router.allowedMethods());
};
