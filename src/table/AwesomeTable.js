import {RecordTableView}  from './RecordTableView';
import {RecordTableController}  from './RecordTableController';
import {CollectionTableView}  from './CollectionTableView';
import {CollectionTableController}  from './CollectionTableController';
import {TableModel}  from './TableModel';
import {SearchTableView}  from './SearchTableView';
import {SearchTableController}  from './SearchTableController';
import './app.scss';

export class AwesomeTable {
    constructor(type, name) {

        //return access to a model view and controller ... then set your callbacks on these to interface with your app
        //

        this.type = type;
        switch (type) {
            case 'record':
                this.model = new TableModel(name);
                this.view = new RecordTableView(this.model);
                this.controller = new RecordTableController(this.model, this.view);
                break;
            case 'collection':
                this.model = new TableModel();
                this.view = new CollectionTableView(this.model);
                this.controller = new CollectionTableController(this.model, this.view);
                break;
            case 'searchable':
                this.model = new TableModel();
                this.view = new SearchTableView(this.model);
                this.controller = new SearchTableController(this.model, this.view);
                break;
            default:
                console.log('missed the type in the table definition');
        }
    }

    loadConfiguration(options) {
        this.model.td = options;
        this.model.loadColumnDefinition(options.column_definition);
        //if there is data load it....
        if (options.data !== 'undefined') {
            this.model.loadData(options.data);
        }

        //the table type is used to show/hide columns on edit, create, view ....
        switch (this.type) {
            case 'record':
                this.model.td.table_view = 'show';
                break;
            case 'collection':
                this.model.td.table_view = 'index';
                break;
            case 'searchable':
                this.model.td.table_view = 'index';
                break;
            default:
                console.log('missed the type in the table definition');
        }


        return this;
    }


    addTo(div_id) {
        this.div = document.getElementById(div_id);
        this.div.appendChild(this.getTable());
    }

    getTable() {
        switch (this.type) {
            case 'record':
                return this.view.createRecordTable();
                break;
            case 'collection':
                return this.view.createCollectionTable();
                break;
            case 'searchable':
                return this.view.createSearchTable();
                break;
            default:
                console.log('missed the type in the table definition');
        }


    }

    clone(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    setValue(column_name, row, value) {

        this.controller.updateCellValue(column_name, row, value)

        // if(this.options.edit_display == 'on_page'){
        //     this.controller.updateCellValue(column, value, row)
        // }
        // else{
        //     this.controllerModal.updateCellValue(column, value, row)
        // }
    }

    addDataRow(data_row) {
        if (Array.isArray(data_row)) {
            this.developerAlert('data is an array, just send in one row or use addDataArray')
            return false;
        }
        //add a row to the model, then re-draw the table......

        let row = this.model.addDataRow(data_row);
        //we need to reDraw and update values... w
        this.view.drawTable();
        this.controller.updateTable()


    }

    addDataArray(data) {

        if (!Array.isArray(data)) {
            this.developerAlert('data is not an array.... use addDataRow for just one row')
            return false;
        }
        for (let i = 0; i < data.length; i++) {
            this.addDataRow(data[i]);
        }

    }


    reCalculateTable(rowFunctions) {

    }


    getElement(db_field, r, c = 'undefined') {
        if (c !== 'undefined') {
            return this.view.elements[r][db_field][c];
        }
        else {
            return this.view.elements[r][db_field];
        }
    }

    getRow(element) {
        let rc = this.controller.findElement(element);
        return rc[0];

    }

    sumArray(column_name, row) {
        return this.model.sumArray(column_name, row);
    }

    developerAlert(msg) {
        let warning = 'console' //alert
        if (warning == 'console') {
            console.log('Developer Alert! \n' + msg)
        }
        else {
            alert('Developer Alert! \n' + msg);
        }

    }

    checkRowNumber(row_number) {
        if (typeof this.model.tdo[row_number] === 'undefined') {
            this.developerAlert('the row number ' + row_number + ' is undefined, fix your call....')
            return false;
        }
        return true;
    }

    checkColumnName(column_name) {
        if (typeof this.model.tdo[0][column_name] === 'undefined') {
            this.developerAlert('the column name ' + column_name + ' is undefined, fix your call....')
            return
        }
        return true;
    }

    getValue(column_name, row_number, array_index) {
        //check row number and column_name
        if (!this.checkRowNumber(row_number)) return
        if (!this.checkColumnName(column_name)) return


        return this.model.tdo[row_number][column_name].data
        if (typeof array_index !== 'undefined') {
            return this.model.tdo[row_number][column_name].data[array_index]
        }
        else {
            return this.model.tdo[row_number][column_name].data
        }

        if (this.options.edit_display == 'on_page') {
            return this.model.tdo[row_number][column_name].data
        }
        else {
            return this.modelModal.tdo[row_number][column_name].data
        }

    }

    getSelectName(column, value) {
        //should not matter if it is modal or not
        return this.controller.getSelectValueName(column, value);

    }

    updateSearchPage() {
        this.searchController.loadPageEvent.notify();
    }

    removeResultsTable() {
        this.searchController.view.destroyCollectionTable();
    }

    // showModal() {
    //     this.viewModal.showModalTable();
    // }
    //
    // hideModal() {
    //     this.viewModal.hideModalTable();
    // }


}