const path = require('path');
const Koa = require('koa');
const nunjucks = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');

// 若项目中使用了不下一种模板引擎 如 swig ejs 等等 ，可引入 co-view 组织模板引擎解决

const app = new Koa();

app.use(nunjucks({ // 为 app.context 提供一个 render 方法
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

app.use(bodyParser());
router(app);

app.listen(9978, () => {
    console.log(`Local serve is running at http://localhost:9978/`);
});
