const path = require('path');
const webpack = require('webpack');
const pkg = require('./../package.json');  //loads npm config file
const html = require("html-webpack-plugin");

const merge = require("webpack-merge");
const parts = require("./webpack.es6Demo.parts.js");

const DIST_DIR = path.resolve(__dirname, '../demos/es6Demo/es6DemoDist');

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
        entry: './demos/es6Demo/demo-run-through-webpack.js',
        output: {
            path: DIST_DIR,
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
