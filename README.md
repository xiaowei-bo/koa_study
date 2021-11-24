# koa 项目
***
#### 项目技术栈

node koa koa-router koa-static koa-webpack nunjucks
vue react webpack scss

#### 项目结构
tree -CF
```
├── README.md                   - 项目说明
├── app.js                      - 远程服务入口
├── backend/                    - 后端模块
│   ├── config/                 - 配置文件
│   ├── controller/             - 控制层
│   ├── mock/                   - 前端 mock
│   ├── models/                 - 数据层
│   ├── router/                 - 路由
│   │   ├── index.js            - 路由入口
│   │   ├── logic_router/       - 接口路由
│   │   └── page_router/        - 页面路由
│   └── service/                - 服务层
├── build/                      - 构建相关
│   ├── build.js                - 构建脚本
│   ├── start.js                - 本地服务入口
│   ├── webpack.config.dev.js   - 本地 webpack 配置
│   └── webpack.config.js       - 生产环境 webpack配置
├── commitlint.config.js        - git 提交信息检测规范配置
├── create/                     - 开发初始化模块脚本
│   ├── index.js                - 入口脚本
│   ├── modules/
│   │   ├── initAnswer.js       - 命令行交互
│   │   └── initTemplate.js     - 初始化模块
│   └── template/               - 模块模板
│       ├── react_template/     - react 语法模板
│       └── vue_template/       - vue 语法模板
├── nodemon.json                - nodemon 配置
├── package.json                - 依赖配置
├── processes.json              - pm2 配置
├── sh/                         - shell 脚本
└── src/                        - 前端模板
    ├── common/                 - 公共文件
    │   ├── assets/             - 静态资源
    │   │   └── error.png
    │   ├── html/               - html
    │   │   ├── 404.html
    │   │   ├── 500.html
    │   │   ├── layout.html
    │   │   ├── plugin.html
    │   │   └── router.html
    │   └── js/                 - js
    │       ├── initReact.js    - react 模板初始化js
    │       └── initVue.js      - vue 模板初始化js
    ├── directives/             - 全局 vue 指令
    ├── pages/                  - 页面模块
    │   ├── react_demo/         
    │   └── vue_demo/           - 模块
    │       ├── entry.js        - 模块入口
    │       ├── html/           - 模块页面
    │       │   └── index.html  
    │       ├── js/             
    │       │   └── api.js
    │       └── views/          - 模块路由组件
    │           └── index.vue
    └── utils/                  - 工具
        ├── index.js            - 公共方法
        └── request.js          - http 请求
```
