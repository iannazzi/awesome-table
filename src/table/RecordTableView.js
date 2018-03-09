/**
 * Created by embrasse-moi on 1/18/17.
 */
import {TableView} from './TableView';



export class RecordTableView extends TableView {
    constructor(model) {
        super(model);
    }



    createRecordTable(name) {
        this.recordTableDiv = this.createRecordTableDiv();
        this.table = this.createTableElement(name);

        this.recordTableDiv.appendChild(this.table);

        this.recordTableDiv.appendChild(this.createButtons());

        //what to do about the modals?
        // this.recordTableDiv.appendChild(this.waitModal);
        // this.recordTableDiv.appendChild(this.confirmModal);
        // this.recordTableDiv.appendChild(this.errorModal.createErrorModal());

        // if (this.checkWrite()) {
        //     this.setFocusToFirstInput();
        // }
        this.updateTable();

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
        tbl.className = 'record_table';

        return tbl;

    }


    updateTable() {
        let tbl = this.table;
        tbl.innerHTML = '';
        this.elements = {};
        this.elements_array = [];
        let tbody = document.createElement('tbody');
        tbl.appendChild(tbody);
        this.tbody = tbody;
        this.model.cdo.forEach((col_def) => {

            switch (this.model.td.table_view) {
                case 'create':
                    if (col_def['show_on_create']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                case 'edit':
                    if (col_def['show_on_edit']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                case 'show':
                    if (col_def['show_on_view']) {
                        this.addRow(tbody, col_def);
                    }
                    break;
                default:
                    console.log('error in the column definition');
            }
        })
        this.updateButtons();

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
            let element = this.createElement(data, col_def);
            this.elements[col_def.db_field] = element;
            this.elements_array.push(element);
            cell.appendChild(element);
        }

    }


}