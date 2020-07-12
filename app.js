const Koa = require('koa');
const KoaRouter = require('koa-router'); // 路由模块
const bodyParser = require('koa-bodyparser'); // 解析 post 请求体
const swig = require('koa-swig'); // 模板引擎
const co = require('co'); // 异步流

// 若项目中使用了不下一种模板引擎 如 swig ejs 等等 ，可引入 co-view 组织模板引擎解决

const app = new Koa();
const router = new KoaRouter();

app.context.render = co.wrap(swig({ // node目前不支持async，app中必须使用co.wrap包装一下swig render
    allowErrors: false,
    encoding: 'utf8',
    root: __dirname + '/views', // 视图文件路径
    autoescape: true, // false:解析模板数据中的html
    cache: 'memory', // 'memory':请用缓存，避免每次刷新页面都去解析模板
    ext: 'html'
}));

// 路由配置--start
app.use(bodyParser());
const routerList = require('./controller/router');
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
// 路由配置--end

app.listen(9978, () => {
    console.log(`Local serve is running at http://localhost:9978/`);
});
