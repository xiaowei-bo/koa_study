const { demo } = require("./modules/demo.js");
const { region, login, logout } = require("./modules/user.js");

const logicRouter = [demo, region, login, logout];
logicRouter.map(i => i.url = `/api${i.url}`);
module.exports = logicRouter;
