const DemoController = require("../../../controller/demo.js");

const demo = {
    type: 'GET',
    url: `/demo/index.paper`,
    handler: DemoController.demo
};

module.exports = {
    demo
}