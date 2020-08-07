const login = {
    type: 'POST',
    url: `/login.paper`,
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
const logout = {
    type: 'GET',
    url: `/logout.paper`,
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

const logic_router = [login, logout];
module.exports = logic_router;
