const os = require("os");
const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
 
// 获取环境信息
// dev:开发 test:测试 staging:预发布  production:线上
const NODE_ENV = process.env.NODE_ENV || "dev";
const devType = "NORMAL";

function getEntry() {
    const entry = {};
    const htmlPluginList = [];
    let entryJsFiles = glob.sync(`${process.cwd()}/src/pages/**/entry.js`);
    entryJsFiles = entryJsFiles.map(i => {
        const arr = i.split('/').reverse();
        const htmlFold = i.replace("entry.js", "html");
        const htmlFiles = glob.sync(`${htmlFold}/*.html`);
        const projectFoldName = arr[1];
        entry[`${projectFoldName}/entry`] = [i];
        for(const k in htmlFiles) {
            const htmlFile = htmlFiles[k];
            const htmlFileName = htmlFile.split('/').reverse()[0];
            const htmlPluginItem = new HtmlWebpackPlugin({
                filename: `${projectFoldName}/html/${htmlFileName}`,
                template: htmlFile,
                chunks: [`${projectFoldName}/entry`],
                minify: false
            });
            htmlPluginList.push(htmlPluginItem);
        }
        return {
            projectFoldName: arr[1],
            jsFileName: i,
            htmlFiles
        }
    });
    return {
        entry,
        htmlPluginList
    }
}

const { entry, htmlPluginList } = getEntry();
 
module.exports = {
    mode: "development",
    entry,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name][hash:8].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'simple-nunjucks-loader'
            },
            // 它会应用到 `.vue` 的文件
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            require.resolve("@babel/preset-react"),
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "usage",
                                    modules: "cjs",
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                            hmr: NODE_ENV === "dev",
                            reloadAll: true,
                        },
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer({ remove: false })],
                        },
                    },
                    "sass-loader",
                ],
            },
            // 它会应用到普通的图片文件
            // css背景图中，html页面img的src中
            {
                test: /\.(png|jpe?g|gif|svg|svga|mp3)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 100,
                            esModule: false,
                            name: (a) => {
                                return "[name][hash:4].[ext]";
                            },
                            outputPath: (url, resourcePath, context) => {
                                // window环境
                                if(os.EOL === '\r\n'){
                                    let regCom = /.*(components)\\(.*)\\(assets).*/gi
                                    let regApp = /.*(pages)\\(.*)\\(assets).*/gi
                                    let arrComp = regCom.exec(resourcePath)
                                    let arrApp = regApp.exec(resourcePath)

                                    if(arrComp) {
                                        if( NODE_ENV === 'dev' ){
                                            return `\\${arrComp[1]}\\${arrComp[2]}\\assets\\${ url }`
                                        }
                                        return `${arrComp[1]}\\${arrComp[2]}\\assets\\${ url }`
                                    } else if(arrApp) {
                                        if( NODE_ENV === 'dev' ){
                                            return `\\${arrApp[2]}\\assets\\${ url }`
                                        }
                                        return `${arrApp[2]}\\assets\\${ url }`
                                    }
                                }else{
                                    let regCom = /.*(components)\/(.*)\/(assets).*/gi
                                    let regApp = /.*(pages)\/(.*)\/(assets).*/gi
                                    let arrComp = regCom.exec(resourcePath)
                                    let arrApp = regApp.exec(resourcePath)
                                    if(arrComp) {
                                        if( NODE_ENV === 'dev' ){
                                            return `${arrComp[1]}/${arrComp[2]}/assets/${ url }`
                                        }
                                        return `${arrComp[1]}/${arrComp[2]}/assets/${ url }`
                                    } else if(arrApp) {
                                        if( NODE_ENV === 'dev' ){
                                            return `${arrApp[2]}/assets/${ url }`
                                        }
                                        return `${arrApp[2]}/assets/${ url }`
                                    }
                                }
                            }
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".vue"],
        modules: ["./node_modules"],
        // 设置别名
        alias: {
            "@": path.join(__dirname, "../src/")
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        // css抽离成单独文件
        new MiniCssExtractPlugin({
            filename: NODE_ENV === "dev" ? "[name].css" : "[name][hash:8].css",
            chunkFilename: NODE_ENV === "dev" ? "[id].css" : "[id][hash:8].css",
        }),
        // css压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default", { discardComments: { removeAll: true } }],
            },
            canPrint: true,
        }),
        // 定义全局变量
        new webpack.DefinePlugin({
            ENV: JSON.stringify(NODE_ENV), //字符串
            devType: JSON.stringify(devType)
        }),
        ...htmlPluginList,
        new CopyWebpackPlugin( [
            { 
                from: 'src',
                to: 'src'
            }
        ])
    ],
    devServer: {
        useLocalIp: true
    }
};
