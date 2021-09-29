const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 处理 post 请求数据
const router = require('./router/index.js');
const server = require('koa-static'); // 静态文件
const logger = require('koa-logger'); // log 日志
const moment = require('moment');
const path = require("path");
const app = new Koa();

const initServer = () => {
    app.use(bodyParser());
    router(app);
    app.use(server(path.join(__dirname, "./dist")));
    app.use(logger((str) => {
        console.log(`${moment().format('YYYY-MM-DD hh:mm:ss')}${str}`);
    }));

    app.listen(9978, () => {
        console.log(`Local serve is running at http://localhost:9978/`);
    });
}
initServer();