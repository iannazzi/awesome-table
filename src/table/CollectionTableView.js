/**
 * Created by embrasse-moi on 1/18/17.
 */
import {TableView} from './TableView';

import {myParseFloat, round2} from './math';
export class CollectionTableView extends TableView {
    constructor(model) {

        super(model);

        //use these to set and track sorting
        this.header_elements_array = []; //array of th's
        this.header_elements = {}; //th's by name

    }

    createCollectionTable() {
        this.collectionTableDiv = this.createCollectionTableDiv();
        this.table = this.createTable();
        this.collectionTableDiv.appendChild(this.table);
        this.table_modify_div = this.createTableModifyButtons()
        this.collectionTableDiv.appendChild(this.table_modify_div);
        this.edit_button_div = this.createEditButtonDiv();
        this.collectionTableDiv.appendChild(this.edit_button_div);
        this.collectionTableDiv.appendChild(this.waitModal);
        this.collectionTableDiv.appendChild(this.confirmModal);
        this.collectionTableDiv.appendChild(this.errorModal.createErrorModal());

        this.updateButtons();
        this.updateTable();
        return this.collectionTableDiv;
    }

    createCollectionTableDiv() {
        let div = document.createElement('div');
        let self = this;
        div.addEventListener('keyup', function (event) {
            if (event.which == 13) {
                console.log('enter pressed');
            }
        });
        return div;
    }

    createTable() {
        let tbl = document.createElement('table');
        tbl.id = this.id;
        tbl.className = 'data_table';
        tbl.appendChild(this.createThead());
        tbl.appendChild(this.createTotalsBody());
        this.createTBody();
        tbl.appendChild(this.tbody);
        tbl.appendChild(this.createTFoot());
        return tbl;
    }

    createThead() {
        //create the header
        let thead = document.createElement('thead');
        //thead.id = this.id + '_data_thead';
        this.thead = thead;
        // this.updateThead();
        return thead;
    }

    updateThead() {
        this.checkTHeaderArray();
        this.thead.innerHTML = '';
        this.header_elements_array = [];
        let tr = [];
        for (let i = 0; i < this.header_row_span; i++) {
            tr[i] = this.thead.insertRow();
        }
        let caption = ''
        this.cdo.forEach(col_def => {

            if (col_def['show_on_list']) {
                if (!(!this.checkWrite() && col_def.type == 'row_checkbox')) {

                    if (typeof col_def['caption'] !== 'undefined') {
                        caption = col_def['caption'];
                    }
                    if (typeof col_def.array !== 'undefined' && col_def.array == true) {
                        col_def.caption.forEach((caption_row, row) => {
                            caption_row.forEach(caption_entry => {
                                let th = document.createElement('th');
                                th.innerHTML = caption_entry;
                                if (typeof col_def['th_width'] != 'undefined') {
                                    th.style.width = col_def['th_width'];
                                }

                                tr[row].appendChild(th);
                            })
                        });
                    }
                    else {
                        let th = document.createElement('th');
                        let self = this;
                        th.col_def = col_def;
                        th.id = col_def.db_field + '_header';
                        th.sort = 0;
                        th.addEventListener("click", function (e) {
                            self.onHeaderClick.notify([e, th])
                        });
                        let p = document.createElement('p');
                        p.innerHTML = caption;
                        th.appendChild(p);

                        let i1 = document.createElement('i');
                        i1.className = 'fa fa-sort';
                        th.appendChild(i1);

                        if (typeof col_def['th_width'] != 'undefined') {
                            th.style.width = col_def['th_width'];
                        }

                        th.rowSpan = this.header_row_span;
                        tr[0].appendChild(th);
                        //keep track of the elements in order and by name
                        this.header_elements_array.push(th);
                        this.header_elements[col_def.db_field] = th;


                    }

                }
            }

        })
        this.updateHeaderSortView()

    }

    updateHeaderSortView() {
        //read the sort array and set the visuals
        let self = this;

        //first remove all formatting....
        this.header_elements_array.forEach(th => {
            th.classList.remove("thHighlight")
            th.childNodes[1].className = 'fa fa-sort';
            th.sort = 0;
        })
        //now based on the sort set the format
        this.model.sort.forEach(sort_value => {
            //should be db_field : asc or desc
            let keys = Object.keys(sort_value);
            let db_field = keys[0];

            let th = self.header_elements[db_field];

            switch (sort_value[db_field]) {
                case 'asc':
                    th.className = 'thHighlight';
                    th.childNodes[1].className = 'fa fa-sort-asc';
                    th.sort = 1;
                    break;
                case 'desc':
                    th.className = 'thHighlight';
                    th.childNodes[1].className = 'fa fa-sort-desc';
                    th.sort = 2;
                    break;
            }


        })
        //should be able to read an array to set the view parameters...
    }

    checkTHeaderArray() {
        //an array can be n rows by n columns... we need to figure that out
        this.header_row_span = 1;
        this.cdo.forEach((col_def, col) => {
            if (col_def['show_on_list']) {
                if (typeof col_def.array !== 'undefined' && col_def.array) {
                    this.header_row_span = col_def.caption.length;
                    this.array_col = col;
                }
            }
        })
    }

    createTotalsBody() {
        this.total_tbody = document.createElement('tbody');
        this.total_tbody.id = this.id + '_data_totals_tbody';
        // this.updateTotalsBody();
        return this.total_tbody;

    }

    updateTotalsBody() {
        this.total_tbody.innerHTML = '';
        let totals_row = false;
        this.cdo.forEach(col_def => {
            if (typeof col_def['total'] != 'undefined') {
                totals_row = true;
            }
        })
        //console.log('totals row' + totals_row)
        if (totals_row) {
            let tr = this.total_tbody.insertRow();
            tr.className = 'generalTableTotalsRow';
            tr.style.backgroundColor = 'yellow';
            let total_place = false;
            let col_counter = 0;
            this.cdo.forEach(col_def => {
                if (col_def['show_on_list']) {
                    if (!(!this.checkWrite() && col_def.type == 'row_checkbox')) {
                        if (typeof col_def.array !== 'undefined' && col_def.array) {

                            col_def.caption[0].forEach((caption_row, col) => {
                                let cell = tr.insertCell(col_counter);
                                col_counter++;

                            });
                        }
                        else {

                            let cell = tr.insertCell(col_counter);
                            cell.id = "tsrr0" + "c" + col_counter;
                            col_counter++;

                            if (!total_place) {
                                cell.innerHTML = 'TOTALS';
                                total_place = true;
                            }

                            if (typeof col_def['total'] != 'undefined') {
                                var total = 0.0;
                                this.model.tdo.forEach(row => {
                                    total = total + myParseFloat(row[col_def['db_field']]['data']);
                                })
                                cell.innerHTML = round2(total, col_def['total']);
                            }
                        }
                    }
                }
            })

        }
    }

    createTBody() {
        this.tbody = document.createElement('tbody');
        this.tbody.id = this.id + '_data_tbody';
        // this.updateTBody();
        return this.tbody;
    }

    updateTBody() {
        this.tbody.innerHTML = '';
        this.elements = [];
        this.elements_array = [];
        this.model.tdo.forEach((data_row, r) => {
            this.elements[r] = {};
            this.elements_array[r] = [];
            let tr = this.tbody.insertRow();
            //set the row properties
            // for (var index in data_row['_data_row']) {
            //     eval('tr.' + index + '= ' + data_row['_data_row'][index] + ';');
            // }
            let col_counter = 0;
            this.cdo.forEach((col_def) => {

                if (col_def['show_on_list']) {
                    if (!(!this.checkWrite() && col_def.type == 'row_checkbox')) {
                        let data = data_row[col_def.db_field].data;
                        if (typeof col_def.array !== 'undefined' && col_def.array == true) {
                            this.elements[r][col_def.db_field] = [];
                            //this.elements_array[r][col_counter] = [];

                            col_def.caption[0].forEach((caption_row, col) => {
                                let cell = tr.insertCell(-1);
                                let element = this.createElement(data[col], col_def);
                                element.name = 'element_r' + r + 'c' + col_counter;
                                this.elements[r][col_def.db_field][col] = element;
                                this.elements_array[r][col_counter] = element;

                                cell.appendChild(element);
                                col_counter++;

                            });
                        }
                        else {

                            let cell = tr.insertCell(-1);
                            let element = this.createElement(data, col_def);
                            element.name = 'element_r' + r + 'c' + col_counter;
                            this.elements[r][col_def.db_field] = element;
                            this.elements_array[r][col_counter] = element;

                            cell.appendChild(element);
                            col_counter++;

                        }
                    }
                }
            })
        })
        if (this.checkWrite()) {
            this.updateIndividualSelectOptions();

        }
    }

    createTFoot() {

        let tfoot = document.createElement('tfoot');
        tfoot.id = this.id + '_data_footer';
        this.tfoot = tfoot;
        return tfoot;
    }

    checkRows(array) {
        //console.log('checking...');
        for (let i = 0, row; row = this.tbody.rows[i]; i++) {
            if (array.indexOf(i) > -1) {
                let col = row.cells[0];
                if (typeof col.childNodes[0] !== 'undefined') {
                    if (col.childNodes[0].type == 'checkbox') {
                        col.childNodes[0].checked = true;
                    }
                }
            }
        }

    }

    updateIndividualSelectOptions() {

        this.model.tdo.forEach((data_row, r) => {
            this.cdo.forEach((col_def) => {
                if (col_def['type'] == 'select') {
                    if (typeof col_def['individual_select_options'] !== 'undefined') {
                        let element = this.elements[r][col_def.db_field];
                        let selected_values = this.model.getDbFieldArray(col_def.db_field);
                        // console.log('#####################################################');
                        // console.log('row' + r);
                        // console.log('selected_values');
                        // console.log(selected_values);

                        element.innerHTML = '';

                        let option = document.createElement('option');
                        option.value = 'NULL';
                        option.appendChild(document.createTextNode("Select..."));
                        element.appendChild(option);

                        let select_values = col_def.select_values;
                        // let select_names = col_def.select_names;

                        //selected values are [3,4,9]
                        //array is [1,2,3,4,5,6,7,8,9]
                        //want to return  row 1: [1,2,3,5,6,7,8]
                        // row 2: [1,2,4,5,6,7,8]
                        //row 3 [1,2,5,6,7,8,9]

                        //remove the current row
                        let selected_values_less_current_row = selected_values.slice();


                        selected_values_less_current_row.splice(r, 1);
                        // console.log('selected_values_less_current_row');
                        // console.log(selected_values_less_current_row);
                        //remove the values from selected
                        let individual_select_names = [];
                        let individual_select_values = [];
                        select_values.forEach((select_value, i) => {
                            if (selected_values_less_current_row.indexOf(select_value.value + '') < 0) {
                                individual_select_names.push(select_value.name);
                                individual_select_values.push(select_value.value);
                            }
                        });
                        // console.log('individual_select_names');
                        // console.log(individual_select_names);
                        //
                        // console.log('individual_select_values');
                        // console.log(individual_select_values);

                        individual_select_values.forEach((value, i) => {
                            option = document.createElement('option');
                            option.value = individual_select_values[i] + '';
                            option.appendChild(document.createTextNode(individual_select_names[i]));
                            element.appendChild(option);

                        });
                        //this.addProperties(col_def, element);
                        //console.log(data_row[col_def.db_field].data);
                        element.value = data_row[col_def.db_field].data + '';
                    }
                }
            })
        })
    }

    updateTable() {


        this.updateThead();
        this.updateTBody();
        //this.dataTableChanged.notify();
        this.updateTotalsBody();
        this.updateButtons();


    }

    createTableModifyButtons() {

        let div = document.createElement('div');
        div.id = this.id + '_buttons';
        div.className = 'data_table_buttons';

        let table_modify_div = document.createElement('div');
        table_modify_div.className = 'data_table_modify_buttons';
        div.appendChild(table_modify_div);



        let self = this;
        let element;

        let buttons = this.model.td.table_buttons;

        if (buttons.includes('addRow')) {
            element = document.createElement('button');
            element.innerHTML = 'Add Row';
            element.addEventListener('click', function () {
                self.addRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('deleteRow')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete Row(s)';
            element.addEventListener('click', function () {
                self.deleteRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('copyRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Copy Row(s)';
            element.addEventListener('click', function () {
                self.copyRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('moveRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Move Row(s) Up';
            element.addEventListener('click', function () {
                self.moveRowUpClicked.notify();
            });
            table_modify_div.appendChild(element);

            element = document.createElement('button');
            element.innerHTML = 'Move Row(s) Down';
            element.addEventListener('click', function () {
                self.moveRowDownClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('deleteAllRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete All Rows';
            element.addEventListener('click', function () {
                self.deleteAllClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('addColumn')) {
            element = document.createElement('button');
            element.innerHTML = 'Add Column';
            element.addEventListener('click', function () {
                self.addColumnClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('deleteColumn')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete Column';
            element.addEventListener('click', function () {
                self.deleteColumnClicked.notify();
            });
            table_modify_div.appendChild(element);
        }


        return div

    }
    createEditButtonDiv(){
        let edit_button_div = document.createElement('div');
        edit_button_div.className = 'data_table_edit_buttons';
        return edit_button_div;
    }



}