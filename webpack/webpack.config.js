var path = require('path');

const SRC_DIR = path.resolve(__dirname,'../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

module.exports = {
    entry: {
        main:SRC_DIR + '/table/AwesomeTable.js'
    },
    output: {
        path: DIST_DIR,
        filename: 'awesome-table-dist.js',
        library: 'AwesomeTable',
        libraryTarget: 'umd'
    },
};