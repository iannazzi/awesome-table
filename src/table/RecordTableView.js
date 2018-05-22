/**
 * Created by embrasse-moi on 1/18/17.
 */
import {TableView} from './TableView';


export class RecordTableView extends TableView {
    constructor(model) {
        super(model);
    }


    createRecordTable() {
        let name = this.model.td.name;
        this.recordTableDiv = this.createRecordTableDiv();
        this.table = this.createTableElement(name);
        this.recordTableDiv.appendChild(this.table);
        this.recordTableDiv.appendChild(this.createButtons());
        this.drawTable();

        return this.recordTableDiv;
    }


    createButtons() {

        let div = document.createElement('div');
        div.id = this.id + '_buttons';
        div.className = 'record_table_buttons';
        this.edit_button_div = div;
        return div;

    }


    createRecordTableDiv() {
        let div = document.createElement('div');
        div.className = 'record_table_div';
        div.id = this.name + '_table_div';

        // div.addEventListener('keyup', function (event) {
        //     if (event.which == 13) {
        //         console.log('enter pressed')
        //         //me.submitSearch();
        //     }
        // });
        return div;
    }

    createTableElement(name) {

        let tbl = document.createElement('table');
        tbl.id = name + '_table';
        tbl.classList.add('awesome-record-table')
        tbl.classList.add('table')

        return tbl;

    }


    drawTable() {
        let tbl = this.table;
        tbl.innerHTML = '';
        //this.elements = {};
        //this.elements_array = [];

        this.elements = [];
        this.elements[0] = {};
        this.elements_array = [];



        let tbody = document.createElement('tbody');
        tbl.appendChild(tbody);
        this.tbody = tbody;
        this.model.cdo.forEach((col_def) => {
            switch (this.model.td.table_view) {
                case 'create':
                    if (typeof col_def['show_on_create'] === 'undefined' || col_def['show_on_create']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                case 'edit':
                    if (typeof col_def['show_on_edit'] === 'undefined' || col_def['show_on_edit']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                case 'show':
                    if (typeof col_def['show_on_view'] === 'undefined' || col_def['show_on_view']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                default:
                    console.log('error in the column definition - table_view was not set....');
            }
        })
        this.drawTableEditSaveButtons();

    }





    addRow(tbody, col_def) {
        if (col_def.type != 'row_checkbox' && col_def.type != 'row_number') {
            let tr = tbody.insertRow();
            let th = document.createElement('th');
            let caption = col_def.db_field;
            if (col_def.caption) {
                caption = col_def.caption;
            }
            th.innerHTML = caption;
            tr.appendChild(th);
            let data = this.model.tdo[0][col_def.db_field].data;
            let cell = tr.insertCell(-1);
            cell.id = this.model.td.name + '_td_' + col_def.db_field;
            let element = this.createElement(data, col_def);
            element.id=this.model.td.name + '_' + col_def.db_field;
            element.awesomeTable = {};
            element.awesomeTable.col_def = col_def;
            this.elements[0][col_def.db_field] = element;
            this.elements_array = [];
            this.elements_array[0] = [];
            this.elements_array[0].push(element);
            cell.appendChild(element);
        }

    }


    // these funcions are here because the controller will call these for the collection table.... might eventually be useful here....
    updateTotalsRow(){
        //this is a blank function to make any update calls for totals...
    }
    updateFooter(){
        //dummy function
    }
    showRowModifyButtons(){
        //dummy function the controller will call this .... collection table functionality....
    }

    hideRowModifyButtons(){
        //dummy function the controller will call this .... collection table functionality....
    }


}