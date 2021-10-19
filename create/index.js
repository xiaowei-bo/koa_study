const initAnswer = require("./modules/initAnswer");
const initTemplate = require("./modules/initTemplate");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");

const init = async () => {
    console.log(chalk.green.bold(figlet.textSync("S M A - C L I")));
    const answer = await initAnswer();
    const { projectName, templateType } = answer;
    const srcDir = path.resolve(__dirname, `./template/${templateType}`);
    const tarDir = path.resolve(__dirname, `../src/pages/${projectName}`);
    if(fs.existsSync(tarDir)) return console.log(chalk.red("该项目已存在，换个名称试试吧"));
    const res = await initTemplate(srcDir, tarDir);
    console.log(chalk.green(`${projectName} 项目创建成功`));
};
init();
