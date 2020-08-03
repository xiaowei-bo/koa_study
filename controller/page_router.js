const config = require('./config.js');
const fs = require('fs');
let routerList = [];

/**
 * @param {String} path 目标目录
 * @param {String} ext 目标文件后缀
 * @param {Array} filesArr 最终结果容器
 * @description 获取 path 目录下所有后缀名为 ext 的文件路径并放入 filesArr 中
 */
function getFile(path, ext, filesArr = []) {
    const files = fs.readdirSync(path);
    files.forEach((item) => {
        const stat = fs.lstatSync(`${path}/${item}`);
        if (stat.isDirectory() === true && !item.startsWith('_')) {
            getFile(`${path}/${item}`, ext, filesArr);
        } else if(item.split('.').reverse()[0] === ext) {
            filesArr.push(`${path}/${item}`);
        }
    });
}

// 获取 views 目录下所有 html 文件路径供路由配置使用
let htmlFiles = [];
getFile('./views', 'html', htmlFiles);

htmlFiles.forEach((item) => {
    const src = item.replace('./views/', '');
    const templateSrc = src.replace('.html', '');
    const obj = {
        type: 'GET',
        url: `/views/${src}`,
        handler: async (ctx, next) => {
            await ctx.render(templateSrc);
            await next();
        }
    };
    routerList.push(obj);
});

// 路由统一后缀，约定即可，方便管理（无实际意义）
routerList.map(item => item.url = item.url.replace('.html', config.suffix));

module.exports = routerList;
