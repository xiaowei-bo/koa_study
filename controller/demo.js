
module.exports = {
    demo: async (ctx, next) => {
        ctx.body = {
            success: true,
            data: {
                list: [],
                obj: {},
                str: "666"
            }
        };
        await next();
    }
}