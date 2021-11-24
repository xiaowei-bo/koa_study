const Koa = require('koa');
const router = require('./backend/router/index.js');
const server = require('koa-static');
const logger = require('koa-logger');
const moment = require('moment');
const path = require("path");
const app = new Koa();

const initServer = () => {
    const compress = require('koa-compress');
    app.use(compress({
        threshold: 1024
    }));
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