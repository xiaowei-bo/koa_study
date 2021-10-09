const KoaRouter = require('koa-router'); // 路由模块
const bodyParser = require('koa-bodyparser'); // 处理 post 请求数据
const router = new KoaRouter();
// 页面路由
const pageRouter = require('./page_router/index.js');
// 接口路由
const logicRouter = require('./logic_router/index.js');

const routerList = [...pageRouter, ...logicRouter];

module.exports = (app, compiler) => {
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
