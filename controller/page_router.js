const config = require('./config.js');
const fs = require('fs');
const path = require('path');
let page_router = [];

/**
 * @param {String} dirName 目标目录
 * @param {String} ext 目标文件后缀
 * @param {Array} filesArr 最终结果容器
 * @description 获取 dirName 目录下所有后缀名为 ext 的文件路径并放入 filesArr 中
 */
function getFile(dirName, ext, filesArr = []) {
    const files = fs.readdirSync(dirName);
    files.forEach((item) => {
        const stat = fs.lstatSync(`${dirName}/${item}`);
        if (stat.isDirectory() === true && !item.startsWith('_')) {
            getFile(`${dirName}/${item}`, ext, filesArr);
        } else if(path.extname(item) === ext) {
            filesArr.push(`${dirName}/${item}`);
        }
    });
}

// 获取 views 目录下所有 html 文件路径供路由配置使用
let htmlFiles = [];
getFile('./views', '.html', htmlFiles);

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
    page_router.push(obj);
});

// 路由统一后缀，约定即可，方便管理（无实际意义）
page_router.map(item => item.url = item.url.replace('.html', config.suffix));

module.exports = page_router;
