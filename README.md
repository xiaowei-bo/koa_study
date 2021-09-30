# koa 项目
=============================
#### 项目技术栈

node koa koa-router koa-static koa-webpack nunjucks
vue webpack scss

#### 项目结构
tree -CF
```
├── README.md                       - 项目说明
├── app.js                          - 远程node服务入口
├── build/                          - 构建相关
│   ├── build.js                        - 构建
│   ├── start.js                        - 本地服务
│   ├── webpack.config.dev.js           - 本地webpack配置
│   └── webpack.config.js               - 远程webpack配置
├── config/                         - 配置相关
│   └── index.js                        - 配置文件
├── controller/                     - 控制层
│   ├── module/                         - 模块
│   │   └── common.js                   
│   └── user.js                         - 用户相关
├── models/                         - 数据层
│   └── user.js                         
├── nodemon.json                    - nodemon配置
├── package.json                    - 包配置相关
├── router/                         - 路由
│   ├── index.js                        - 路由文件
│   ├── logic_router/                   - 逻辑接口
│   │   ├── index.js
│   │   └── modules/
│   │       └── user.js
│   └── page_router/                    - 页面路由
│       └── index.js
├── service/                        - 逻辑层
│   └── user.js
├── sh/                             - shell脚本
│   └── gitOp.sh
└── src/                            - 前端视图层
    ├── common/                         - 公共文件
    │   ├── html/                           - html
    │   │   ├── 404.html                        - 404
    │   │   ├── 500.html                        - 500
    │   │   ├── layout.html                     - 基础父模板
    │   │   ├── plugin.html                     - 三方库
    │   │   └── router.html                     - 路由集合页
    │   └── js/                             - js
    │       └── init.js                         - 公共入口
    ├── components/                     - 组件
    ├── directives/                     - 指令
    │   └── index.js
    ├── pages/                          - 页面
    │   ├── home/                           - 具体页面
    │   │   ├── assets/                         - 静态资源
    │   │   ├── entry.js                        - 入口
    │   │   ├── html/                           - html
    │   │   │   └── index.html                  
    │   │   ├── js/                             - js
    │   │   │   └── api.js
    │   │   └── views/                          - 页面路由组件
    │   │       └── index.vue
    │   └── login/
    │       ├── entry.js
    │       ├── html/
    │       │   └── login.html
    │       └── views/
    │           └── index.vue
    ├── styles/                         - 公共样式
    └── utils/                          - 公共方法
        └── index.js
```
