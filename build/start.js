const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 处理 post 请求数据
const router = require('../router/index.js');
const server = require('koa-static'); // 静态文件
const logger = require('koa-logger'); // log 日志
const moment = require('moment');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const koaWebpack = require('koa-webpack');
const compiler = webpack(config);
const app = new Koa();

const initServer = async() => {
    const compress = require('koa-compress');
    app.use(compress({
        threshold: 1024
    }));
    const middleware = await koaWebpack({ compiler, devMiddleware: {
        quiet: true,
        stats: "errors-only"
    } });
    app.use(middleware);
    app.use(bodyParser());
    router(app, compiler);
    app.use(server('.'));
    app.use(logger((str) => {
        console.log(`${moment().format('YYYY-MM-DD hh:mm:ss')}${str}`);
    }));

    app.listen(9978, () => {
        console.log(`Local serve is running at http://localhost:9978/`);
    });
}
initServer();