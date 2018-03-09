/**
 * Created by embrasse-moi on 1/19/17.
 */
import {TableController} from './TableController';
import {CollectionTableEvents} from './CollectionTableEvents'


export class CollectionTableController extends TableController {
    constructor(model, view) {
        super(model);
        this.view = view;
        this.cdo = this.model.cdo;


        this.collectionTableEvents = new CollectionTableEvents(this);

    }




    addRow() {
        this.copyTable();
        this.model.addNewRow();
    }

    deleteRow(check = true) {
        if (check) {
            if (!confirm("Confirm Delete Row(s)")) {
                return;
            }
        }
        if (this.model.tdo.length > 0) {
            let checked_rows = this.findCheckedRows();
            if (checked_rows.length > 0) {
                this.copyTable();
                this.model.deleteRows(checked_rows);
            }
        }


        //finally there usually is a calculateTotals() function needed to update totals
        //ifCalculateTotalsExists();

    }

    copyRow() {
        this.copyTable();
        let checked_rows = this.findCheckedRows();
        if (checked_rows.length > 0) {
            this.model.copyRows(checked_rows);
        }
    }

    moveRowUp() {
        let checked_rows = this.findCheckedRows();
        let bln_move_ok = true;
        for (let i = 0; i < checked_rows.length; i++) {
            if ((checked_rows[i] - 1) < 0) bln_move_ok = false
        }
        if (bln_move_ok) {
            this.copyTable();
            for (let i = 0; i < checked_rows.length; i++) {
                this.model.moveRow(checked_rows[i], checked_rows[i] - 1);
                //this.setChecks(checked_rows[i], checked_rows[i]-1);
            }
        }

    }

    moveRowDown() {
        let checked_rows = this.findCheckedRows();
        let bln_move_ok = true;
        for (let i = 0; i < checked_rows.length; i++) {
            if ((checked_rows[i] + 1) > this.model.tdo.length - 1) bln_move_ok = false
        }
        if (bln_move_ok) {
            this.copyTable();
            for (let i = checked_rows.length - 1; i > -1; i--) {
                let newRow = parseInt(checked_rows[i]) + parseInt(1);
                this.model.moveRow(checked_rows[i], newRow);
            }

        }
    }

    deleteAllRows() {

        if (confirm("Confirm Delete All Rows")) {
            this.model.DeleteAllRows();
        }
    }

    findCheckedRows() {
        //this only works on the first column
        let tbody = this.view.tbody;
        let rowCount = tbody.rows.length;
        let checked_rows = new Array();
        let counter = 0;
        for (let k = 0; k < rowCount; k++) {
            let chkbox = tbody.rows[k].cells[0].childNodes[0];

            if ((null != chkbox) && (true == chkbox.checked)) {
                checked_rows[counter] = k;
                counter = counter + 1;
            }
        }
        return checked_rows;
    }

    copyTable() {

        let tbody = this.view.tbody;
        let rowCount = tbody.rows.length;
        for (let r = 0; r < rowCount; r++) {
            this.model.cdo.forEach((col_def) => {
                if (col_def['show_on_list']) {
                    if (typeof col_def.array !== 'undefined' && col_def.array) {
                        col_def.caption[0].forEach((caption_row, col) => {
                            let element = this.view.elements[r][col_def.db_field][col];
                            this.copyElementValueToModel(element, col_def, r, col);
                        });
                    }
                    else {
                        let element = this.view.elements[r][col_def.db_field]
                        this.copyElementValueToModel(element, col_def, r);
                    }
                }
            })
        }
    }


    setFocusToFirstInputOfRow(row_number) {

        let elements = this.view.elements_array[row_number];
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == 'text' || elements[i].type == 'number') {
                elements[i].focus();
                elements[i].select();
                break;
            }
        }
    }




    //everything below this line should be deleted after i get posting complete


    validateDynamicTableObject() {
        //this should be the same function as above, but check each row....
        errors = '';

        for (i = 0; i < this.model.cdo.length; i++) {
            if (typeof this.model.cdo[i]['db_field'] !== 'undefined') {
                if (typeof this.model.cdo[i]['validate'] !== 'undefined') {
                    // go through each row
                    var elements = document.getElementsByName(this.model.cdo[i]['db_field'] + '[]');
                    for (el = 0; el < elements.length; el++) {
                        if (typeof this.model.cdo[i]['validate']['not_blank_or_zero_or_false_or_null'] !== 'undefined') {
                            if (elements[el].value == '' ||
                                round2(elements[el].value, 0) == 0 || elements[el].value == 'false' || elements[el].value == 'NULL') {
                                errors += 'Bad Value For ' + this.model.cdo[i]['caption'] + ' Row ' + (el + 1) + newline();
                            }
                        }
                        else if (typeof this.model.cdo[i]['validate']['acceptable_values'] !== 'undefined') {
                            acceptable_values = this.model.cdo[i]['validate']['acceptable_values'][0];
                            if (acceptable_value == 'number') {
                                if (isNaN(elements[el].value)) {
                                    errors += this.model.cdo[i]['db_field'] + ' needs to be a value.' + newline();
                                    elements[el].focus();
                                }
                            }
                            else if (acceptable_values == 'text') {
                            }
                            else if (acceptable_values == 'specific') {
                            }
                        }
                    }
                }
            }
        }
        if (errors == '') {
            needToConfirm = false;
            //disable the submit button: (id'd as submit)
            if (document.getElementById('submit')) {
                document.getElementById('submit').disabled = true;
                //getting rid of form stuff....
                /*//create hidden post value
                 str_hidden_name = "submit";
                 str_hidden_value = "submit";
                 //creating the hidden elements for POST
                 element = document.createElement("input");
                 element.type = "hidden";
                 element.name = str_hidden_name;
                 element.value = str_hidden_value;
                 document.getElementById(this.formId).appendChild(element);*/
            }
            else {
            }
            /*else if(typeof document.getElementsByName('submit')[0] !== 'undefined')
             {

             document.getElementsByName('submit')[0].disabled = true;

             }*/
            return true;
        }
        else {
            alert(errors);
            needToConfirm = true;
            return false;
        }

    }


    getTableArrayColumnNumberFromHTMLColumnNumber(html_column) {
        let column = -1;
        let table_data_array_column = 0;
        let html_column_counter = 0;
        for (i = 0; i < this.model.cdo.length; i++) {
            if (!this.model.cdo[i]['show_on_list']) {
                html_column_counter = html_column_counter + 1;
            }
            table_data_array_column = table_data_array_column + 1;
            if (html_column == html_column_counter) {
                return table_data_array_column;
            }
        }
        return column;
    }

    setChecks(rowMoving, movingTo) {
        let tbody = this.view.tbody;
        tbody.rows[rowMoving].cells[0].childNodes[0].checked = false;
        tbody.rows[movingTo].cells[0].childNodes[0].checked = true;

    }


}