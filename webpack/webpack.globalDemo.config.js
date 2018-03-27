var path = require('path');

module.exports = {
    // entry: './demos/data/ColumnDefinition.js',
    entry: {
        columnDefinition: './demos/data/ColumnDefinition.js',
        dataGenerator: './demos/data/DataGenerator.js'
    },
    output: {
        path: path.resolve(__dirname, '../demos/globalDemo/globalDemoDist'),
        filename: '[name].js',
        library: '[name]'
    }
};