const fs = require('fs');
let routerList = [];

/**
 * 获取开发目录 path 下所有目录文件名
 */
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
        url: '/views/' + item,
        handler: async (ctx, next) => {
            ctx.body = await ctx.render(item);
            await next();
        }
    };
    routerList.push(obj);
});

// views 下二级 && 刨去_common 用作公用模板文件夹 ("_" 下划线开头的文件默认不用做路由)
const viewsFile = getPathName('./views').filter(fileName => !fileName.startsWith('_') && !fileName.includes('.'));
viewsFile.forEach((item) => {
    getPathName(`./views/${item}`).forEach((innerItem) => {
        const obj = {
            type: 'GET',
            url: '/views/' + item + '/' + innerItem,
            handler: async (ctx, next) => {
                ctx.body = await ctx.render(item + '/' + innerItem);
                await next();
            }
        };
        routerList.push(obj);
    });
});
routerList.map(item => item.url = item.url.replace('.html', '.paper'));

module.exports = routerList;
