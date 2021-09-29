const webpack = require('webpack')
const config = require('./webpack.config.js');

webpack(config, (err, stats) => {
    if (err){
		throw err
	}
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
});

// 分析打包用时
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// webpack(smp.wrap(config), (err) => {
//     if (err){
// 		throw err
// 	}
// });
