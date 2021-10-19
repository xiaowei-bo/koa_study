const inquirer = require("inquirer");
const initAnswer = () => {
    const questions = [
        {
            name: "projectName",
            type: "input",
            message: "请输入你的项目名称："
        },{
            name: "templateType",
            type: "list",
            message: "请选择你喜欢的模板类型：",
            choices: ["vue模板", "react模板"],
            filter: (type) => {
                const templateMap = {
                    "vue模板": "vue_template",
                    "react模板": "react_template"
                }
                return templateMap[type];
            }
        }
    ];
    return inquirer.prompt(questions);
};
module.exports = initAnswer;