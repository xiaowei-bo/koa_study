const UserController = require("../../../controller/user.js");
// 注册接口
const region = {
    type: 'POST',
    url: `/user/region.paper`,
    handler: UserController.region
};
// 登录接口
const login = {
    type: 'POST',
    url: `/user/login.paper`,
    handler: UserController.login
};
// 注销登录接口
const logout = {
    type: 'GET',
    url: `/user/logout.paper`,
    handler: UserController.logout
};

module.exports = {
    region,
    login,
    logout
}