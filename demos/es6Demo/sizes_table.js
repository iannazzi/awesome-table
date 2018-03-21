//full cal referenced the dist script.... no imports....


import {AwesomeTable}  from '../../src/table/AwesomeTable';
import {ColumnDefinition} from '../data/ColumnDefinition';
import {DataGenerator} from '../data/DataGenerator';
import {addTemplate} from '../data/functions'
let data = new DataGenerator();
let column_definition = new ColumnDefinition();






addTemplate('Size Array Example', 'size')
let data2 = data.data1();
let adjustableColumn = new AwesomeTable('collection');
let config6 =  {
    name: 'adjustableColumn',
    data: [], //data1.data.records,
    column_definition: column_definition.adjustableColumn(adjustableColumn),
    table_buttons: ['addColumn','deleteColumn'],
    access: 'write', //read vs write
}
adjustableColumn.loadConfiguration(config6);
adjustableColumn.addTo('size')
