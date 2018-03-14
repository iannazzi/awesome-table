/**
 * Created by embrasse-moi on 1/19/17.
 */
import {TableController} from './TableController'
import {TableEvent} from './TableEvent'
import {RecordTableEvents} from './RecordTableEvents'

export class RecordTableController extends TableController {
    constructor(model, view) {
        super(model)
        this.view = view;

        this.events = new RecordTableEvents(this);



    }

    updateCellValue(column_name, val, row = 0){
        this.model.tdo[row][column_name]['data'] = val;
        this.view.updateTable();
    }
    getSelectValueName(column_name, value){
        value = parseInt(value);
        let return_value = false;
        let col = this.model.getCDOColumnNumberFromName(column_name);

        let col_def = this.model.cdo[col];
        let select_values = col_def.select_values;
        select_values.forEach(select_value =>{

            if (parseInt(select_value.value) == value)
            {
                return_value = select_value.name;
            }
        })
        return return_value;
    }
    copyTable() {
        this.model.cdo.forEach((col_def) => {
            let element = this.view.elements[col_def.db_field];
            switch (this.model.td.table_view) {
                case 'create':
                    if (col_def['show_on_create'] !== false){
                        this.copyElementValueToModel(element, col_def, 0);
                    }
                    break;
                case 'edit':
                    if (col_def['show_on_edit'] !== false){
                        this.copyElementValueToModel(element, col_def, 0);
                    }
                    break;
            }
        })
    }


    getConfirm(confirmMessage, callback) {
        confirmMessage = confirmMessage || '';
        self = this;
        this.view.showConfirmModal(true);

        $('#confirmMessage').html(confirmMessage);
        $('#confirmFalse').click(function () {
            $(self.view.confirmModal).modal('hide');
            if (callback) callback(false);

        });
        $('#confirmTrue').click(function () {
            $(self.view.confirmModal).modal('hide');
            if (callback) callback(true);
        });
    }


    setFocusToFirstInput() {
        // if(this.checkRead()) return;
        let elements = this.view.elements_array;
        for (let i = 0; i < elements.length; i++) {

            if (elements[i].type == 'text'
                || elements[i].type == 'number'
                || elements[i].type == 'textarea'
                || elements[i].type == 'date'

            ) {
                console.log('setting focus to')
                console.log(elements[i]);
                $(elements[i]).focus();

//                elements[i].focus();
//                 elements[i].select();
                break;
            }

            if (elements[i].type == 'select-one'
                || elements[i].type == 'select-multi'

            ) {
                $(elements[i]).focus();
                // elements[i].select();
                break;
            }


        }
    }
    checkWrite()
    {
        let write = false;
        if(this.model.td.access.toUpperCase() == "WRITE") write = true;
        return write;
    }
    checkRead()
    {
        return ! this.checkWrite();
    }



}