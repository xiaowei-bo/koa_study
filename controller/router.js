const fs = require('fs');

/**
 * 获取开发目录 path 下所有目录文件名
 */
let viewsList = [];
function getPathName (path) {
    let entries = fs.readdirSync(path);
    return entries;
}

// views 目录下路由配置
// views 下一级 && 刨去index.html 用作路由集合页
const rootFile = getPathName('./views').filter(fileName => fileName.includes('.html') && fileName !== 'index.html');
rootFile.forEach((item) => {
    const obj = {
        type: 'GET',
        url: '/views/' + item.replace('.html', '.paper'),
        handler: async (ctx, next) => {
            ctx.body = await ctx.render(item);
            await next();
        }
    };
    viewsList.push(obj);
});
// views 下二级 && 刨去common_file 用作公用模板文件夹
const viewsFile = getPathName('./views').filter(fileName => fileName !== 'common_file' && !fileName.includes('.'));
viewsFile.forEach((item) => {
    getPathName(`./views/${item}`).forEach((innerItem) => {
        const obj = {
            type: 'GET',
            url: '/views/' + item + '/' + innerItem.replace('.html', '.paper'),
            handler: async (ctx, next) => {
                ctx.body = await ctx.render(item + '/' + innerItem);
                await next();
            }
        };
        viewsList.push(obj);
    });
});

const routerList = [...viewsList];
module.exports = routerList;
