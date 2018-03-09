const path = require('path');
const webpack = require('webpack');
const pkg = require('./../package.json');  //loads npm config file
const html = require("html-webpack-plugin");

const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const commonConfig = merge([
    parts.loadSCSS(),
    {
        plugins: [],
    },
]);
const productionConfig = merge([]);
const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: 8081,

    }),
    {
        entry: './demos/demo-run-through-webpack.js',
        output: {
            path: path.resolve(__dirname, 'demos'),
            filename: 'build.js'
        },
        devtool: 'inline-source-map',

    }
]);
module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, {mode});
    }

    return merge(commonConfig, developmentConfig, {mode});
};

// module.exports = {entry: './demos/demo-run-through-webpack.js',
//     output: {
//         path: path.resolve(__dirname, 'demos'),
//         filename: 'build.js'
//     },
//     devtool: 'inline-source-map',
//
// };


