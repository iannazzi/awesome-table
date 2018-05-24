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

    onCancelCreate(){
        if (typeof this.model.td.onCancelCreateClick === 'function') {
            return this.model.td.onCancelCreateClick()
        }
    }
    onCancelEdit(){
        //kinda want a confirm here....
        this.model.loadBackupData();
        this.model.td.table_view = 'show';
        this.model.td.access = 'read';
        this.view.drawTable();
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
    loadRecord(data){
        this.model.loadData([data]);
        this.view.drawTable();
    }
    copyTable() {
        //for the record table igonore row_number and row_checkbox columns

        this.model.cdo.forEach((col_def) => {
            if(col_def.type != 'row_checkbox' && col_def.type != 'row_number'){

                let element = this.view.elements[0][col_def.db_field];
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