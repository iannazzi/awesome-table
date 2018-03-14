'use strict';

var expect = require('chai').expect;
import {AwesomeTable} from '../src/table/AwesomeTable';
let column_definition = [
    {
        "type": "row_number",
    },
    {
        "type": "row_checkbox",
    },
    {
        "type": "select",
    },
    {
        "type": "tree_select",
    },
    {
        "type": "button",
    },
    {
        "type": "link",
    },
    {
        "type": "checkbox",
    },
    {
        "type": "radio",
    },
    {
        "type": "date",
    },
    {
        "type": "password",
    },
    {
        "type": "textarea",
    },
    {
        "type": "number",
    },
];



describe('recordTable', function() {
    it('should create a table ', function() {
        let recordTable = new AwesomeTable('record');
        let config =  {
            name: 'recordTable',
            data: [data[0]],
            column_definition: column_definition,
            table_buttons: ['edit', 'delete'],
            access: 'read', //read vs write
        }
        recordTable.loadConfiguration(config);

        console.log(table);
    });
});