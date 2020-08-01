const KoaRouter = require('koa-router'); // 路由模块
const router = new KoaRouter();
const routerList = require('./controller/router');
console.log(routerList);

module.exports = (app) => {
    for (let routerObj of routerList) {
        switch (routerObj.type) {
            case 'GET':
                router.get(routerObj.url, routerObj.handler);
                break;
            case 'POST':
                router.post(routerObj.url, routerObj.handler);
                break;
        }
    }

    // 路由集合页
    router.get('/views/router_list.vpage', async (ctx, next) => {
        ctx.body = await ctx.render('index.html', { routerList });
        await next();
    });
    app.use(router.routes());
};
