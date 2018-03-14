
var path = require('path');
var webpack = require('webpack');

module.exports = {entry: './src/table/AwesomeTable.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'awesome-table.js'
    }
};