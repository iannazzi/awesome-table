import {RecordTableView}  from './RecordTableView';
import {RecordTableController}  from './RecordTableController';
import {CollectionTableView}  from './CollectionTableView';
import {CollectionTableController}  from './CollectionTableController';
import {TableModel}  from './TableModel';
import {SearchTableView}  from './SearchTableView';
import {SearchTableController}  from './SearchTableController';

export class AwesomeTable {
    constructor(type,name) {

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
    loadConfiguration(options){
        this.model.td=options;
        this.model.loadColumnDefinition(options.column_definition);
        //if there is data load it....
        if(options.data !== 'undefined'){
            this.model.loadData(options.data);
        }

        //the table type is used to show/hide columns on edit, create, view ....
        switch (this.type) {
            case 'record':
                this.model.td.table_view='show';
                break;
            case 'collection':
                this.model.td.table_view='index';
                break;
            case 'searchable':
                this.model.td.table_view='index';
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

    getTable(){
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

    setValue(column, row, value){

        this.controller.updateCellValue(column, value, row)

        // if(this.options.edit_display == 'on_page'){
        //     this.controller.updateCellValue(column, value, row)
        // }
        // else{
        //     this.controllerModal.updateCellValue(column, value, row)
        // }
    }
    getValue(column_name, row_number){
        return this.model.tdo[row_number][column_name].data
        // if(this.options.edit_display == 'on_page'){
        //     return this.model.tdo[row_number][column_name].data
        // }
        // else{
        //     return this.modelModal.tdo[row_number][column_name].data
        // }

    }
    getSelectName(column, value){
        //should not matter if it is modal or not
        return this.controller.getSelectValueName(column,value );

    }

    updateSearchPage(){
        this.searchController.loadPageEvent.notify();
    }
    removeResultsTable(){
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