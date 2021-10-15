module.exports = {
    demoInfo: {
        type: "GET",
        url: "/api/demo/info.paper",
        handler: async (ctx, next) => {
            ctx.body = {
                success: true,
                isMock: true,
                data: {
                    list: [],
                    obj: {},
                    str: "666"
                }
            };
            await next();
        }
    }
}