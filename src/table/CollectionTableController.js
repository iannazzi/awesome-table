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
        this.active_row = null;
        this.collectionTableEvents = new CollectionTableEvents(this);
        this.row_properties = []

    }


    addRow() {
        this.copyTable();
        let row = this.model.addNewRow();


        this.view.drawTable();
        return row
    }

    deleteRow(check = true) {

        if (this.model.tdo.length > 0) {
            let checked_rows = this.findCheckedRows();
            if (checked_rows.length > 0) {
                this.copyTable();
                this.model.deleteRows(checked_rows);
            }
        }
        this.view.drawTable();


        //finally there usually is a calculateTotals() function needed to update totals
        //ifCalculateTotalsExists();

    }

    copyRow() {
        this.copyTable();
        let checked_rows = this.findCheckedRows();
        if (checked_rows.length > 0) {
            this.model.copyRows(checked_rows);
        }
        this.view.drawTable();
    }

    selectAll() {
        if (this.model.getColDef('row_checkbox')) {
            this.model.tdo.forEach((row, r) => {
                this.model.tdo[r]['row_checkbox'].data = 1;
            });
        }
        this.view.drawTable();
    }

    selectNone() {
        if (this.model.getColDef('row_checkbox')) {
            this.model.tdo.forEach((row, r) => {
                this.model.tdo[r]['row_checkbox'].data = 0;
            });
        }
        this.view.drawTable();

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
        this.view.drawTable();

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
        this.view.drawTable();

    }

    deleteAllRows() {
        this.model.DeleteAllRows();
        this.view.drawTable();
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
                if (typeof col_def['show_on_list'] === 'undefined' || col_def['show_on_list']) {
                    if (typeof col_def.caption !== 'undefined' && Array.isArray(col_def.caption)) {

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
    selectRow(row){
        this.active_row = row;
        this.view.highlightRow(row);
        //highlight the header array if one or two is used for the row
        let header_array_data = this.model.tdo[row].__row__.header_row;
        //if it is empty there should be no header row highlighted...

        for (var key in header_array_data)
        {
            this.view.highlightHeaderRow(key, header_array_data[key])
        }



    }
    selectHeaderRow(db_field, header_row ) {

        if (this.active_row !== null) {
            this.model.tdo[this.active_row].__row__.header_row[db_field] = header_row;
        }

        this.view.highlightHeaderRow(db_field, header_row)

    }
    updateTable(){
        //what we want to do now is
        //run any row based calculations
        //update the view of the tbody
        //update the view of the total body
        //update the view of the footer body

        this.model.calculate();

        this.view.updateTableValues();


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
        this.active_row = row_number;

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
            if (this.model.cdo[i]['show_on_list'] === false) {
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