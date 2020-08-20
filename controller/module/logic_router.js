const userService = require('../../service/user.js');
// 注册接口
const region = {
    type: 'POST',
    url: `/user/region.paper`,
    handler: async (ctx, next) => {
        const regionUser = ctx.request.body;
        ctx.body = userService.region(regionUser);
        await next();
    }
};
// 登录接口
const login = {
    type: 'POST',
    url: `/user/login.paper`,
    handler: async (ctx, next) => {
        const loginObj = ctx.request.body;
        if(loginObj.u_id === 'yibo.wei' && loginObj.u_pass === 'koa_study') {
            ctx.session.u_id = 'test_koa_session';
            ctx.body = {
                success: true,
                message: '登陆成功'
            };
        } else {
            ctx.body = {
                success: true,
                message: '账号或密码错误'
            };
        }
        await next();
    }
};
// 注销登录接口
const logout = {
    type: 'GET',
    url: `/user/logout.paper`,
    handler: async (ctx, next) => {
        if(ctx.session.u_id === 'test_koa_session') {
            ctx.session.u_id = '';
            ctx.body = {
                success: true,
                message: '注销成功'
            };
        } else {
            ctx.body = {
                success: false,
                message: '您还没有登录过'
            };
        }
        await next();
    }
};

const logic_router = [region, login, logout];
module.exports = logic_router;
