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
        console.log(options)
        this.model.td=options;
        this.model.loadColumnDefinition(options.column_definition);
        this.model.loadData(options.data);
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

    addTo(div_id) {
        this.div = document.getElementById(div_id);
        switch (this.type) {
            case 'record':
                this.div.appendChild(this.view.createRecordTable(div_id));
                break;
            case 'collection':
                this.div.appendChild(this.view.createCollectionTable(div_id));
                break;
            case 'searchable':
                this.div.appendChild(this.view.createSearchTable(div_id));
                break;
            default:
                console.log('missed the type in the table definition');
        }
    }


    setValue(column, row, value){
        if(this.options.edit_display == 'on_page'){
            this.controller.updateCellValue(column, value, row)
        }
        else{
            this.controllerModal.updateCellValue(column, value, row)
        }
    }
    getValue(column_name, row_number){
        if(this.options.edit_display == 'on_page'){
            return this.model.tdo[row_number][column_name].data
        }
        else{
            return this.modelModal.tdo[row_number][column_name].data
        }

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