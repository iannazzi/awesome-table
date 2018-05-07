var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const SRC_DIR = path.resolve(__dirname,'../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

module.exports = {
    entry: SRC_DIR + '/table/AwesomeTable.scss',
    output: {
        path: DIST_DIR,
        filename: 'awesome-table-style.css' // output js file name is identical to css file name
    },
    module: {
        rules: [
            {test: /\.(css|scss)/, use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])}
            // ...
        ],
    },
    plugins: [
        new ExtractTextPlugin({
         filename: 'awesome-table-style.css'
        })
    ]




};