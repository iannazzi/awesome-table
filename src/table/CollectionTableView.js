/**
 * Created by embrasse-moi on 1/18/17.
 */
import {TableView} from './TableView';

import {myParseFloat, round2} from '../lib/math';
export class CollectionTableView extends TableView {
    constructor(model) {

        super(model);

        //use these to set and track sorting
        this.header_elements_array = []; //array of th's
        this.header_elements = {}; //th's by name
        this.footer_elements = {};
        this.total_row_elements = {}


    }

    createCollectionTable() {
        let name = this.model.td.name;

        //first create all the dom parents so we have easy access later
        this.collectionTableDiv = this.createCollectionTableDiv();
        this.table = this.createTable(name);
        this.collectionTableDiv.appendChild(this.table);
        this.table_modify_div = this.createTableModifyDiv()
        this.collectionTableDiv.appendChild(this.table_modify_div);
        this.edit_button_div = this.createEditButtonDiv();
        this.collectionTableDiv.appendChild(this.edit_button_div);

        //now draw the table....
        this.drawTable();
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

    createTable(name) {
        let tbl = document.createElement('table');
        tbl.id = name + '_table';
        tbl.classList.add('awesome-collection-table')

        tbl.classList.add('table')
        //bootstrap
        // tbl.classList.add('table-bordered')
        // tbl.classList.add('table-striped')

        //bulma
        // tbl.classList.add('is-bordered')
        // tbl.classList.add('is-striped')

        tbl.appendChild(this.createThead(name));
        tbl.appendChild(this.createTotalsBody(name));
        this.createTBody(name);
        tbl.appendChild(this.tbody);
        tbl.appendChild(this.createTFoot(name));
        return tbl;
    }

    createThead(name) {
        let thead = document.createElement('thead');
        thead.id = name + '_thead';
        this.thead = thead;
        return thead;
    }

    isTableReadAndColumnRowCheckbox(col_def) {
        if (!(!this.checkWrite() && col_def.type == 'row_checkbox')) {
            return true;
        }
        return false;
    }

    showOnList(col_def) {
        if (typeof col_def['show_on_list'] === 'undefined' || col_def['show_on_list']) {
            return true;
        }
        return false;
    }

    drawThead() {
        let self = this;

        this.checkTHeaderArray();
        this.thead.innerHTML = '';
        this.header_elements_array = [];
        let tr = [];
        for (let i = 0; i < this.header_row_span; i++) {
            tr[i] = this.thead.insertRow();
        }
        let caption = ''
        this.model.cdo.forEach(col_def => {

            if (this.showOnList(col_def)) {
                if (this.isTableReadAndColumnRowCheckbox(col_def)) {
                    caption = ''
                    if (typeof col_def['caption'] !== 'undefined') {
                        caption = col_def['caption'];
                    }
                    if (typeof col_def.caption !== 'undefined' && Array.isArray(col_def.caption)) {
                        //this.CreateTheadArray(col_def,);
                        let header_array = [];


                        col_def.caption.forEach((caption_row, row) => {
                            header_array[row] = []
                            caption_row.forEach((caption_entry, col) => {

                                let th = document.createElement('th');
                                th.innerHTML = caption_entry;
                                header_array[row][col] = th;

                                //if the user clicks the header array we may want a callback....

                                th.addEventListener("click", function (e) {
                                    self.onHeaderArrayClick.notify({e, col_def})
                                });

                                this.th_width(col_def, th);

                                tr[row].appendChild(th);


                            })
                        });
                        this.header_elements_array.push(header_array);

                        this.header_elements[col_def.db_field] = header_array;
                    }
                    else {
                        let th = document.createElement('th');
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

                        this.th_width(col_def, th);

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

    th_width(col_def, th) {
        if (col_def.db_field == 'row_number') {
            th.style.width = '30px';
        }
        if (col_def.db_field == 'row_checkbox') {
            th.style.width = '30px';
        }
        if (typeof col_def['width'] != 'undefined') {
            th.style.width = col_def['width'];
        }
    }

    updateHeaderSortView() {
        //read the sort array and set the visuals
        let self = this;

        //first remove all formatting....
        this.header_elements_array.forEach(th => {
            if (!Array.isArray(th)) {
                th.classList.remove("thHighlight")
                th.childNodes[1].className = 'fa fa-sort';
                th.sort = 0;
            }
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
        this.model.cdo.forEach((col_def, col) => {
            if (col_def['show_on_list'] !== false) {
                if (typeof col_def.caption !== 'undefined' && col_def.caption.constructor === Array) {
                    this.header_row_span = col_def.caption.length;
                    this.array_col = col;
                }
            }
        })
    }

    createTotalsBody(name) {
        this.total_tbody = document.createElement('tbody');
        this.total_tbody.id = name + '_data_totals_tbody';
        this.total_tbody.classList.add('awesome-collection-table-totals')

        // this.updateTotals();
        return this.total_tbody;

    }

    drawTotalsRow() {
        this.total_tbody.innerHTML = '';
        let totals_row = false;
        this.model.cdo.forEach(col_def => {
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
            this.model.cdo.forEach(col_def => {
                if (this.checkRead() && this.isRowCheckbox(col_def)) {
                    //read does not have a row check box so skip creating a celll....nothing is rendered here.... it is just easier to do this positive check
                }
                else {
                    if (this.isTotalCol(col_def)) {
                        let cell = tr.insertCell(col_counter);
                        cell.id = this.model.td.name + "_totalrow_" + col_def.db_field;
                        col_counter++;
                        this.total_row_elements[col_def.db_field] = cell;
                    }
                    else {
                        if (typeof col_def.caption !== 'undefined' && col_def.caption.constructor === Array) {

                            col_def.caption[0].forEach((caption_row, col) => {
                                let cell = tr.insertCell(col_counter);
                                cell.id = this.model.td.name + "_totalrow_" + col_def.db_field + col;
                                col_counter++;

                            });
                        }
                        else {
                            let cell = tr.insertCell(col_counter);
                            // cell.id = "tsrr0" + "c" + col_counter;
                            cell.id = this.model.td.name + "_totalrow_" + col_def.db_field;

                            col_counter++;

                            if (!total_place) {
                                cell.innerHTML = 'TOTALS';
                                total_place = true;
                            }
                        }
                    }
                }

            })

        }
    }

    isRowCheckbox(col_def) {
        if (col_def.type == 'row_checkbox') {
            return true;
        }
        return false;
    }

    isTableReadAndColRowCheckbox(col_def) {


    }

    isTotalCol(col_def) {
        if (col_def['show_on_list'] !== false) {
            if (typeof col_def['total'] !== 'undefined') {
                return true;
            }
            //read row checkbox does not render

        }
        return false;
    }

    updateTotalsRow() {
        //update the value of the totals of the total row
        let total;
        this.model.cdo.forEach(col_def => {
            if (this.isTotalCol(col_def)) {
                total = this.model.sumColumn(col_def.db_field);
                this.total_row_elements[col_def.db_field].innerHTML = round2(total, col_def['total']);
            }
        });
    }

    createTBody(name) {
        this.tbody = document.createElement('tbody');
        this.tbody.id = name + '_data_tbody';
        this.tbody.classList.add('awesome-collection-table-tbody')

        return this.tbody;
    }

    drawTbody() {
        this.tbody.innerHTML = '';
        this.rows = [];
        this.cells_by_name = [];
        this.elements_array = [];
        this.tbody_cells = [];
        // let self = this;
        // this.model.tdo.forEach((data_row, r) => {
        // })
        for (let r = 0; r < this.model.tdo.length; r++) {
            this.drawTbodyRow(r);
        }
        if (this.checkWrite()) {
            this.updateIndividualSelectOptions();
        }
    }

    drawTbodyRow(r) {
        this.cells_by_name[r] = {};
        this.elements_array[r] = [];
        this.tbody_cells[r] = [];

        let tr = this.tbody.insertRow();
        tr.id = this.model.td.name + '_r' + r;
        let self = this;
        tr.addEventListener("click", function () {
            self.onRowClick.notify(tr);
        });
        this.rows[r] = tr;

        let col_counter = 0;
        this.model.cdo.forEach((col_def) => {
            if (col_def['show_on_list'] !== false) {
                if (this.checkRead() && this.isRowCheckbox(col_def)) {
                    //skip this column if the table is read only and the row is a checkbox
                }
                else {
                    col_counter = this.createColumn(tr, r, col_def, col_counter);
                }
            }
        })
    }

    createColumn(tr, r, col_def, col_counter) {
        let cell;

        // let data = data_row[col_def.db_field].data; //data can be an array.....
        if (this.isColArray(col_def)) {
            this.cells_by_name[r][col_def.db_field] = [];
            col_def.caption[0].forEach((caption_row, col) => {
                cell = this.createCell(tr, col_def, r, col_counter, col);
                cell.id = this.model.td.name + '_r' + r + '_' + col_def.db_field + col_counter;
                this.updateCellArray(r, col_counter, cell, col_def, col);
                col_counter++;
            });
        }
        else {
            cell = this.createCell(tr, col_def, r, col_counter);
            cell.id = this.model.td.name + '_r' + r + '_' + col_def.db_field;
            this.updateCellArray(r, col_counter, cell, col_def);
            col_counter++;
        }

        return col_counter;
    }

    createCell(tr, col_def, r, col_counter, col = 'undefined') {
        let self = this;
        let element = this.createElement(null, col_def, r, col_counter);
        element.addEventListener("focus", function () {
            self.activeRow = tr.sectionRowIndex
        });

        if (col !== 'undefined') {
            element.id = this.model.td.name + '_td_r' + r + '_' + col_def.db_field + col;

        }
        else {
            element.id = this.model.td.name + '_td_r' + r + '_' + col_def.db_field;
        }
        let cell = tr.insertCell(-1);
        cell.appendChild(element);
        return cell;
    }

    updateCellArray(r, c, cell, col_def, col = false) {


        if (col !== false) {
            this.cells_by_name[r][col_def.db_field][col] = cell;
        }
        else {
            this.cells_by_name[r][col_def.db_field] = cell;
        }


        //I am using this one to find elements --- probably just broke it......
        this.elements_array[r][c] = cell;
        //this one will tie the col_def to the element, making working with the model easier
        this.tbody_cells[r][c] = {};
        this.tbody_cells[r][c].col_def = col_def;
        this.tbody_cells[r][c].td = cell;
    }


    createTFoot(name) {

        let tfoot = document.createElement('tfoot');
        this.tfoot = tfoot;
        return tfoot;
    }

    drawFooter() {
        this.tfoot.innerHTML = '';

        //how many rows:
        let rows = 0;
        this.model.cdo.forEach(col_def => {
            if (col_def['show_on_list'] !== false) {
                if (typeof col_def.footer !== 'undefined') {
                    this.footer_elements[col_def.db_field] = [];
                    if (col_def.footer.length > rows) {
                        rows = col_def.footer.length;
                    }
                }
            }
        });
        if (rows == 0) return;

        let tr;
        let col_span;


        for (let row = 0; row < rows; row++) {
            tr = document.createElement('tr');
            let col_counter = 0;
            let element;
            this.model.cdo.forEach(col_def => {
                //keep track of the span of the td....
                //well if it is read we need to skip row checkbox

                if (this.showOnList(col_def)) {
                    if (this.isTableReadAndColumnRowCheckbox(col_def)) {
                        element = document.createElement('td')
                        if (typeof col_def.footer !== 'undefined' && typeof col_def.footer[row] !== 'undefined') {
                            //draw an extended cell for anything before the footer... add the caption there.....
                            if (col_counter > 0) {
                                
                                element = document.createElement('td')
                                tr.appendChild(element);
                                element.classList.add('at-footer-label')
                                element.colSpan = col_counter;
                                element.innerHTML = col_def.footer[row].caption;
                                col_counter = 0;

                            }
                            element = document.createElement('td')
                            element.classList.add('at-footer-data')

                            tr.appendChild(element);
                            this.footer_elements[col_def.db_field][row] = element;


                        }
                        else {
                            //the column did not have a footer column....
                            if (Array.isArray(col_def.caption)) {
                                col_counter = col_counter + col_def.caption[0].length;
                            }
                            else {
                                col_counter++;

                            }
                        }
                    }
                }


            })
            this.tfoot.appendChild(tr);


        }


    }

    updateFooter() {


        this.model.cdo.forEach(col_def => {
            if (typeof col_def.footer !== 'undefined') {
                for (let i = 0; i < col_def.footer.length; i++) {
                    if (typeof col_def.footer[i].round !== 'undefined') {
                        this.footer_elements[col_def.db_field][i].innerHTML = round2(col_def.footer[i].getValue(), col_def.footer[i].round);

                    }
                    else {
                        this.footer_elements[col_def.db_field][i].innerHTML = col_def.footer[i].getValue();
                    }
                }
            }
        })
        // this.tfoot.appendChild(tr);
        //
        // this.footer_elements.forEach((footer_col, col) =>{
        //     for(let i = 0; i<footer[])
        // })
        // this.model.td.footer.forEach((footer_col, col) => {
        //     console.log('footer col')
        //     console.log(footer_col)
        //     console.log(col)
        //     // footer_col['total'][0] //subtotal?
        //     // this.model.td.footer['total'][1] //tax?
        //
        // });
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
            this.model.cdo.forEach((col_def) => {
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

    drawTable() {
        this.drawThead();
        this.drawTotalsRow();
        this.drawTbody();
        this.drawFooter();
        this.drawTableEditSaveButtons();

        //now write the data run row calculations and totals
        this.updateTableValues();
    }

    highlightRow(row) {
        for (let i = 0; i < this.rows.length; i++) {
            if (i == row) {
                this.rows[i].classList.add('row_selected')
            }
            else {

                this.rows[i].classList.remove('row_selected')
            }
        }
    }

    highlightHeaderRow(col_name, selected_row) {
        let header_elements = this.header_elements;
        for (let i = 0; i < header_elements[col_name].length; i++) {
            for (let j = 0; j < header_elements[col_name][i].length; j++) {
                if (i == selected_row) {
                    header_elements[col_name][i][j].classList.add("header_selected");
                }
                else {
                    header_elements[col_name][i][j].classList.remove("header_selected");
                }
            }
        }
    }

    createTableModifyDiv() {
        let div = document.createElement('div');
        div.id = this.model.td.name + '_buttons';
        div.className = 'awesome-collection-table_buttons';
        return div;
    }

    createTableModifyButtons() {


        let table_modify_div = document.createElement('div');
        table_modify_div.className = 'awesome-collection-table_modify_buttons';

        let self = this;
        let element;

        let buttons = this.model.td.table_buttons;
        if (buttons.includes('selectRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Select All';
            element.id = name + 'select_all';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.selectAllClicked.notify();
            });
            table_modify_div.appendChild(element);
            element = document.createElement('button');
            element.innerHTML = 'Select None';
            element.id = name + 'select_none';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.selectNoneClicked.notify();
            });
            table_modify_div.appendChild(element);


        }
        if (buttons.includes('addRow')) {
            element = document.createElement('button');
            element.innerHTML = 'Add Row';
            element.id = name + '_add_row';
            element.classList.add("button");
            element.addEventListener('click', function () {
                self.addRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('copyRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Copy Row(s)';
            element.id = name + 'copy_row';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.copyRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('moveRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Move Row(s) Up';
            element.id = name + 'move_row_up';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.moveRowUpClicked.notify();
            });
            table_modify_div.appendChild(element);

            element = document.createElement('button');
            element.innerHTML = 'Move Row(s) Down';
            element.id = name + 'move_row_down';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.moveRowDownClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('deleteRow')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete Row(s)';
            element.id = name + '_delete_row';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.deleteRowClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('deleteAllRows')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete All Rows';
            element.id = name + 'delete_all_rows';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.deleteAllClicked.notify();
            });
            table_modify_div.appendChild(element);
        }
        if (buttons.includes('addColumn')) {
            element = document.createElement('button');
            element.innerHTML = 'Add Column';
            element.id = name + 'add_column';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.addColumnClicked.notify();
            });
            table_modify_div.appendChild(element);

        }
        if (buttons.includes('deleteColumn')) {
            element = document.createElement('button');
            element.innerHTML = 'Delete Column';
            element.id = name + 'delete_column';
            element.classList.add("button");

            element.addEventListener('click', function () {
                self.deleteColumnClicked.notify();
            });
            table_modify_div.appendChild(element);

        }


        return table_modify_div;

    }

    showRowModifyButtons() {
        //this needs to be show/hidden.......
        this.table_modify_div.appendChild(this.createTableModifyButtons());
        // this.table_modify_div.style.visibility = "visible"
    }

    hideRowModifyButtons() {
        this.table_modify_div.innerHTML = '';
        // this.table_modify_div.style.visibility = "hidden"


    }

    createEditButtonDiv() {
        let edit_button_div = document.createElement('div');
        edit_button_div.className = 'awesome-collection-table_edit_buttons';
        return edit_button_div;
    }

    updateTableValues() {

        //we can loop through the child nodes or through tbody_cells....

        for (let i = 0; i < this.tbody.childNodes.length; i++) {
            // for (let i = 0; i < this.tbody_cells.length; i++) {
            this.updateRowValues(i)
        }
        this.updateTotals();
    }


    updateRowValues(r) {


        //method 2: go through the physical table and update..... weird passing col_def around....
        // let cells = this.tbody.childNodes[r].childNodes;
        // for (let c = 0; c<cells.length; c++) {
        //     let col_and_data = this.getRCValue(r, c);
        //     this.writeElementValue(col_and_data.col_def, cells[c], col_and_data.data)
        // }


        //loop through the elements for some reason this refuses to work?????
        let row = this.tbody_cells[r];

        for (let c = 0; c < row.length; c++) {
            let col_def = row[c].col_def;
            let data = this.model.tdo[r][col_def.db_field].data

            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    this.writeCellValue(col_def, row[c].td, data[i])
                    c++;
                }
                c--;
            }
            else {
                this.writeCellValue(col_def, row[c].td, data)
            }

        }


        //running out of steam.... basically loosing the element..... so I can't write to it....
        // is this even the best way?

        //loop through the elements
        //get the data...
        // update

        // console.log()
        //
        //
        // console.log(typeof this.elements[r])
        // console.log(this.elements[r])
        // console.log(this.elements[r])
        //
        //
        // // this.elements[r].forEach((element, key)=>{
        // //     console.log(element);
        // //     console.log(key)
        // // })
        // let self = this;
        // Object.keys(self.elements[r]).forEach(function (key) {
        //
        //     console.log(key)
        //     console.log(self.elements[r])
        //     console.log(self.elements[r][key])
        //
        //
        // });
        //
        // for (let db_field in this.elements[r]) {
        //     //might need a hasOwnProperty thingy......
        //     if (this.elements[r].hasOwnProperty(db_field)) {
        //         let col_def = this.model.getColDef(db_field);
        //         //might be an array.....
        //         if (this.isColArray(col_def)) {
        //             for (let i = 0; i < col_def.caption.length; i++) {
        //                 let data = this.model.getData(db_field, r, i);
        //                 this.writeElementValue(this.elements[r][db_field][i], col_def, data)
        //             }
        //         }
        //         else {
        //             console.log(this.elements)
        //             let data = this.model.getData(db_field, r);
        //             this.writeElementValue(this.elements[r][db_field], col_def, data)
        //         }
        //     }
        // }
        //this is on only for a collection table

    }

    updateTotals() {
        this.updateTotalsRow()
        this.updateFooter()
    }

    isColArray(col_def) {
        if (typeof col_def.caption !== 'undefined' && Array.isArray(col_def.caption)) {
            return true;
        }
        return false
    }


//code stink
    getRCValue(r, c) {
        //this is a code stink... so I do not plan on using it...
        //given the row and column of an element or cell

        let col_counter = 0;
        let found = false;
        let return_data = false;

        this.model.cdo.forEach(col_def => {
            if (col_def.show_on_list !== false) {
                if (this.isRowCheckbox(col_def) && this.checkRead()) {
                    //nothing here
                }
                else {

                    if (this.isColArray(col_def)) {
                        for (let i = 0; i < col_def.caption[0].length; i++) {
                            if (col_counter == c && !found) {
                                found = true
                                return_data = {
                                    data: this.model.tdo[r][col_def.db_field].data[i],
                                    col_def
                                }
                            }
                            else {
                                col_counter++;
                            }
                        }
                    }
                    else {

                        if (col_counter == c && !found) {
                            found = true

                            return_data = {
                                data: this.model.tdo[r][col_def.db_field].data,
                                col_def
                            }
                        }
                        else {
                            col_counter++;
                        }
                    }


                }
            }

        })

        return return_data;
    }

}