var path = require('path');

module.exports = {
    entry: './demos/data/ColumnDefinition.js',
    output: {
        path: path.resolve(__dirname, '../demos/globalDemo/globalDemoDist'),
        filename: 'column-defintion.js',
        library: 'ColumnDefinition'
    }
};