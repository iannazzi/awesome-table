var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//CHECK THIS OUT....
//http://io.misostack.com/posts/webpack-003/

const SRC_DIR = path.resolve(__dirname,'../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

module.exports = {
    entry: {
        app: SRC_DIR + '/table/AwesomeTable.js'
    },
    output: {
        path: DIST_DIR,
        filename: 'awesome-table-dist.js',
        library: 'AwesomeTable',
        // libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
    ]




};