/**
 * Created by embrasse-moi on 1/19/17.
 */
import {TableEvent} from './TableEvent'
import {isValueInArray} from '../lib/array_help';
import {myParseFloat, isNumber} from '../lib/math';

export class TableModel {
    /*
     table model takes the column and data
     and delivers a 2d array back
     which models how the view should look....
     */
    constructor(name) {

        //first by is used for sorting.....
        //might want this gone.....
        this.firstBy = require('thenby');


        this.sort = []; //[{name:'asc'},{name:'desc'}....]


        //the row data object holds information about how to treat entire row... for example highlight a row
        this.rdo = {};

        //here are a few table events
        this.modelChanged = new TableEvent(this);
        this.newRow = new TableEvent(this);

        let self = this;
        this.modelChanged.attach(function () {
            self.updateTableObjectLineNumbers()

        });


    }
    getData(db_field, r, c){
        if(Array.isArray(this.tdo[r][db_field].data)){
            return this.tdo[r][db_field].data[c];
        }
        return this.tdo[r][db_field].data;
    }
    sumArray(db_field, r){

        if(Array.isArray(this.tdo[r][db_field].data)){

            let sum = 0;
            for (let i = 0; i < this.tdo[r][db_field].data.length; i++) {
                sum += myParseFloat(this.tdo[r][db_field].data[i]);
            }
            return sum;
            //return this.tdo[r][db_field].data.reduce((a, b) => a + b, 0);
        }
        else{
            alert('Developer Error\n You are asking for an array sum for non array')

        }
    }
    sumColumn(db_field){
        let sum = 0;
        for(let i=0; i<this.tdo.length; i++){
            sum += myParseFloat(this.tdo[i][db_field].data);
        }
        return sum
    }
    loadColumnDefinition(column_definition) {
        //the column definition has view properties and data properties
        //I feel it is mostly related to the model
        this.cdo = column_definition;
    }

    loadData(data) {
        this.backup_data = data;
        this.tdo = [];
        // console.log('data');
        //  console.log(data);

        for (let i = 0; i < data.length; i++) {
            this.addDataRow(data[i]);
        }

        this.sortData();
        this.saveBackupData();

        //pulled this from the controller creation.... not sure if it is needed?
        // if (this.tdo.length == 0) {
        //     this.addNewRow();
        // }
        this.modelChanged.notify();


    }
    saveBackupData(){
        this.backup_data = JSON.stringify(this.tdo);
    }
    loadBackupData() {
        this.tdo = JSON.parse(this.backup_data);
    }


    dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            let result = (a[property].data < b[property].data) ? -1 : (a[property].data > b[property].data) ? 1 : 0;
            return result * sortOrder;
        }
    }

    sortData() {
        //TODO fix sort it kinda works but not really....


        //sort_array looks like [{db_field:'asc'},etc...]
        //we need to sort row based on data for this.tdo[row][db_filed]['data']
        // this.tdo.sort((a,b) => {
        //     sort_array.forEach(sort => {
        //         let keys = Object.keys(sort);
        //         let name = keys[0];
        //         if(sort[keys[0]] =='asc')
        //         {
        //             this.tdo = this.tdo.sort(this.dynamicSort(name));
        //         }
        //         else
        //         {
        //             this.tdo = this.tdo.sort(this.dynamicSort('-'+name));
        //         }
        //     })
        //
        // })


        let sort_stack = this.firstBy(function (v1, v2) {
            return 0
        });
        this.sort.forEach(sort => {
            let keys = Object.keys(sort);
            let name = keys[0];
            if (sort[keys[0]] == 'asc') {
                sort_stack = sort_stack.thenBy(function (v1) {
                    return v1[name].data;
                });
            }
            else {
                sort_stack = sort_stack.thenBy(function (v1) {
                    return v1[name].data;
                }, -1);
            }
        })

        this.tdo.sort(sort_stack);


    }

    addDataRow(data_row) {

        let row_number = this.addNewRow();
        this.cdo.forEach(col_definition => {
            //console.log(col_definition);
            this.addItem(col_definition, data_row, row_number);
        })
        //this.updateTableObjectLineNumbers();
        //this should render the view but the view may not exist
        this.modelChanged.notify();
        return row_number;
    }

    addNewRow() {
        let row = this.rowCount();
        this.tdo[row] = {};
        //'_row' holds the properties for the row.
        this.tdo[row].__row__ = {};
        this.tdo[row].__row__.header_row = {};


        this.cdo.forEach(col => {
            let data = '';
            if (typeof col['default_value'] !== 'undefined') {
                data = col['default_value']
            }
            if (typeof col.caption !== 'undefined' && Array.isArray(col.caption)) {

                let data_array = [];
                this.tdo[row][col['db_field']] = {};
                col.caption[0].forEach((capt, i) => {
                    data_array[i] = data;
                });
                this.tdo[row][col['db_field']]['data'] = data_array;
                this.tdo[row][col['db_field']]['cell'] = {};
                //this keeps track of which header row correlates to the data row...
                this.tdo[row].__row__.header_row[col.db_field] = null;


            }
            else {
                this.tdo[row][col['db_field']] = {};
                this.tdo[row][col['db_field']]['data'] = data;
                this.tdo[row][col['db_field']]['cell'] = {};

            }


        })

        this.modelChanged.notify();
        this.newRow.notify();

        return row;
    }

    addItem(col, item_data, row) {
        //make sure item data is not an array.. done it before@@

        let data = '';
        if (typeof item_data[col['db_field']] !== 'undefined') {
            data = item_data[col['db_field']];

        }
        else {
            if (typeof col['default_value'] !== 'undefined') {
                data = col['default_value'];
            }
            else {
                data = '';
            }

        }
        if (typeof col['row_number'] !== 'undefined') {
            data = this.tdo.length;
            console.log('setting row number to ' + data )

        }
        else {

            this.tdo[row][col['db_field']] = {};
            this.tdo[row][col['db_field']]['data'] = data;
            this.tdo[row][col['db_field']]['cell'] = {};

        }
        // console.log(this.tdo[row])
    }

    updateTableObjectLineNumbers() {
        //db_field has to be 'row_number' for this to work
        //we need to loop through the tbody cells and set the value of the column name bla bla
        let col = this.getCDOColumnNumberFromName('row_number');
        if (col != -1) {
            for (let row = 0; row < this.tdo.length; row++) {
                this.tdo[row]['row_number']['data'] = row + 1;
            }
        }
    }

    getCDOColumnNumberFromName(name) {
        let column = -1;
        this.cdo.forEach((col, i) => {
            if (typeof col['db_field'] !== 'undefined' && col['db_field'] == name) {
                column = i;
            }

        })
        return column;
    }
    getColDef(name){
        return this.cdo[this.getCDOColumnNumberFromName(name)];
    }

    rowCount() {
        return this.tdo.length;
    }

    copyRows(row_array, place = 'bottom') {
        //copying objects is a bit of a bitch... as long as there are no functions this will work
        let newRowCounter = 0;
        let new_tdo = [];
        this.tdo.forEach((row, r) => {
            // we are keeping this row.
            new_tdo[newRowCounter] = JSON.parse(JSON.stringify(row));
            newRowCounter++;
            // if the row is in the checked row array it is copied
            if (isValueInArray(r, row_array)) {
                //copy
                new_tdo[newRowCounter] = JSON.parse(JSON.stringify(row));
                //set the checkvalue to zero....
                new_tdo[newRowCounter].row_checkbox.data = 0;
                newRowCounter++;
            }

        });


        // console.log('New TDO');
        // console.log(new_tdo);
        this.tdo = new_tdo;
        this.modelChanged.notify();
        // console.log('New TDO');
        // console.log(this.tdo);

    }

    moveRow(RowToMove, RowToMoveTo) {	//ex row 2 row 3
        let new_tdo = [];
        for (let i = 0; i < this.tdo.length; i++) {
            if (RowToMove == i) {
                new_tdo[i] = this.tdo[RowToMoveTo];
            }
            else if (RowToMoveTo == i) {
                new_tdo[i] = this.tdo[RowToMove];
            }
            else {
                new_tdo[i] = this.tdo[i];
            }
        }
        this.tdo = new_tdo;
        this.modelChanged.notify();
    }

    deleteRows(row_array) {
        this.modelChanged.notify();
        let newRowCounter = 0;
        let new_tdo = [];

        for (let row = 0; row < this.tdo.length; row++) {
            // if the row is in the checked row array it is gonzo
            if (isValueInArray(row, row_array)) {
                //delete
            }
            else {
                // we are keeping this row.
                new_tdo[newRowCounter] = this.tdo[row];
                newRowCounter++;
            }

        }
        //console.log(new_tdo)
        this.tdo = new_tdo;
        this.modelChanged.notify();

    }

    DeleteAllRows() {
        this.tdo = [];
        this.modelChanged.notify();

    }

    getDbFieldArray(db_field) {
        let return_array = [];
        this.tdo.forEach(data_row => {
            return_array.push(data_row[db_field].data + '')
        })
        return return_array;
    }

    addColumnToArray(col) {
        this.cdo[col].caption.forEach(caption_col => {
            caption_col.push('');
        });


        let db_field = this.cdo[col].db_field;

        this.tdo.forEach(row => {
            row[db_field]['data'].push('');
            console.log(row[db_field].data);
        });
        this.modelChanged.notify();
    }

    deleteColumnFromArray(col) {
        this.cdo[col].caption.forEach(caption_col => {
            caption_col.pop();
        });
        let db_field = this.cdo[col].db_field;
        this.tdo.forEach(row => {
            row[db_field]['data'].pop();
        });
        this.modelChanged.notify();
    }
    getFooterValue(db_field, footer_row){
        let col = this.getCDOColumnNumberFromName(db_field);
        //execute the function...
        if (typeof this.cdo[col].footer[footer_row].getValue === 'function'){
            return this.cdo[col].footer[footer_row].getValue();
        }
        else{
            console.log('Developer alert ' + db_field + ' footer .getValue needs to be a function')
        }
    }
    calculate() {


        let row_functions = this.td.row_calculations;
        if (typeof  row_functions !== 'undefined'){
            for (let i = 0; i < this.tdo.length; i++) {
                //pass the row in to each function defined
                for (let j = 0; j < row_functions.length; j++) {
                    row_functions[j](i);
                }
            }
        }



    }




}