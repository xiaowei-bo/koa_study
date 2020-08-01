const Koa = require('koa');
const swig = require('koa-swig'); // 模板引擎
const co = require('co'); // 异步流
const router = require('./router.js');

// 若项目中使用了不下一种模板引擎 如 swig ejs 等等 ，可引入 co-view 组织模板引擎解决

const app = new Koa();


app.context.render = co.wrap(swig({ // node目前不支持async，app中必须使用co.wrap包装一下swig render
    allowErrors: false,
    encoding: 'utf8',
    root: __dirname + '/views', // 视图文件路径
    autoescape: true, // false:解析模板数据中的html
    cache: 'memory', // 'memory':请用缓存，避免每次刷新页面都去解析模板
    ext: 'html'
}));

router(app);

app.listen(9978, () => {
    console.log(`Local serve is running at http://localhost:9978/`);
});
