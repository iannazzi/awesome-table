const path = require('path');

module.exports = {
    entry: './src/table/AwesomeTable.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};