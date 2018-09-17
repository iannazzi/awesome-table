/**
 * Created by embrasse-moi on 1/20/17.
 */
import {myParseFloat, round2, isNumber} from '../lib/math';

import {TableEvent} from './TableEvent';
// import {ErrorModal} from '../modal/ErrorModal'
// import {FormModal} from '../modal/FormModal'
// import {createWaitModal} from '../modal/waitModal'
// import {createConfirmModal} from '../modal/confirmModal'


export class TableView {


    constructor(model) {
        this.model = model;

        // this.id = this.model.td.name;

        //modals need to move out.....
        // this.errorModal = new ErrorModal(this.model.td.name + '_error_modal');
        // this.formModal = new FormModal(this.model.td.name + '_form_modal');
        // this.waitModal = createWaitModal();
        // this.confirmModal = createConfirmModal();

        // this.name = this.id;
    }

    getTimeValue(mess_string){
        
        if(mess_string.indexOf("T")){
            return (mess_string.substring(mess_string.indexOf("T")+1,mess_string.length))

        }
        else{
            return mess_string;
        }

        //could be date time
        //could be a time....
        //return mess_string;
        // var dt = new Date(mess_string);
        // var hr = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        // var hr = dt.toLocaleTimeString();
        // var hr = dt.toTimeString();

        
         // return hr;
    }
     getDateValue(mess_string){

        //incoming string ****has to be yyyy-mm-dd *******
        return mess_string.substring(0,10);

        // var dt = new Date(mess_string);
        // // var hr = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        // // var hr = dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate();
        // var hr = dt.toISOString();

        
        //  return hr;
    }

    writeCellValue(col_def, cell, value) {


        if(this.checkRead()){
            //this is weird? why do I have to redraw shit on read?
            if (col_def['type'] == 'id') {
                cell.innerHTML = value;
                cell.classList.add('awesome_table_record_id')
                if(typeof col_def.onClick !== 'undefined'){
                    cell.addEventListener('click',function(){
                        col_def.onClick(value)
                    })
                }
            }
            else if (col_def.type == 'date'){

               cell.innerHTML = this.getDateValue(value);
                
            }
            else if (col_def.type == 'time'){
               cell.innerHTML = this.getTimeValue(value);
            }
            else if(col_def['type'] == 'link'){
                cell.innerHTML = '<a href="' + value + '">'+value+'</a>';
            }
            // else  if(col_def['type'] == 'checkbox')
            // {
            //     cell.innerHTML = '';
            //     cell.appendChild(this.createCheckBox(col_def, value))
            // }
            // else  if(col_def['type'] == 'radio')
            // {
            //     cell.innerHTML = '';
            //     cell.appendChild(this.createRadio(col_def, value))
            // }
            else{
                cell.innerHTML=value;

            }
        }
        else{
            let element = cell.childNodes[0]
            if (col_def['type'] == 'row_checkbox'
                || col_def['type'] == 'checkbox'
                || col_def['type'] == 'radio') {
                if (value == 1) {
                    element.checked = true;
                }
                else {
                    element.checked = false;
                }

            }
            else if (col_def.type == 'row_number'){
                cell.innerHTML=value;
            }
            else if (col_def.type == 'link'){
                cell.innerHTML=value;
            }
            else if (col_def.type == 'time'){
                //cell.innerHTML=value;
               element.value = this.getTimeValue(value);

            }
            else if (col_def.type == 'date'){

               element.value = this.getDateValue(value);
                
            }
            else {
                element.value = value;


            }
        }

    }


    checkWrite() {
        let write = false;
        if (this.model.td.access.toUpperCase() == "WRITE") write = true;
        return write;
    }

    checkRead() {
        return !this.checkWrite();
    }

    drawTableEditSaveButtons() {

        this.edit_button_div.innerHTML = '';
        if (this.checkRead()) {
            if (this.model.td.table_buttons.includes('delete')) {
                this.edit_button_div.appendChild(this.createDeleteButton());
            }
            if (this.model.td.table_buttons.includes('edit')) {
                this.edit_button_div.appendChild(this.createEditButton());
            }

        }
        else {
            if (this.model.td.table_buttons.includes('edit')) {
                this.edit_button_div.appendChild(this.createCancelButton());
                this.edit_button_div.appendChild(this.createSaveButton());

            }

        }


    }



    createElement(data, col_def, r, c) {

        this.r = r;
        this.c = c;
        let db_field = col_def['db_field'];
        switch (col_def.type.toLowerCase()) {
            case 'date':
                return this.createDateInput(col_def);
                break;
            case 'text':
                return this.createTextInput(col_def);
                break;
            case 'password':
                return this.createPasswordInput(col_def);
                break;
            case 'textarea':
                return this.createTextArea(col_def);
                break;
            case 'number':
                return this.createNumberInput(col_def);
                break;
            case 'checkbox':
                return this.createCheckBox(col_def);
                break;
            case 'row_checkbox':
                return this.createRowCheckbox(col_def);
                break;
            case 'row_number':
                return this.createRowNumber(col_def);
                break;
            case 'select':
                return this.createDataTableSelect(col_def);
                break;
            case 'tree_select':
                return this.createDataTableTreeSelect(col_def);
                break;
            case 'html':
                return this.createTextNode(col_def);
                break;
            case 'radio':
                return this.createRadio(col_def);
                break;
            case 'button':
                return this.createButton(col_def);
                break;
            case 'link':
                return this.createLink(col_def);
                break;
            case 'id':
                return this.createId(col_def);
                break;
            case 'time':
                return this.createTime(col_def);
                break;
            default:
                return document.createTextNode('type "' + col_def.type + '" has not been coded');


        }


    }

    createTextArea(col_def) {
        if (this.checkWrite()) {
            let element = document.createElement("TEXTAREA");
            let self = this;
            element.addEventListener("keyup", function () {
                self.addInputChangedNotify(element, col_def)
            });
            this.addEvents(col_def, element);
            this.addProperties(col_def, element);


            return element;
        }
        else {
           
            return document.createTextNode('');
        }


    }

    createCheckBox(col_def) {
        let element = document.createElement('input');
        element.type = 'checkbox';
        //element.name = col_def.db_field + '[]';
        //element.id = col_def.db_field + '_search';
        let self = this;
        element.addEventListener("change", function () {
            self.addInputChangedNotify(element, col_def)

        });
        this.addEvents(col_def, element);
        //element.onclick = function(){self.inputChanged.notify()}
        // if (data == true || data == "1" || data == 1 || data == "true") {
        //     element.checked = true;
        // }

        if (this.checkWrite()) {
            this.addProperties(col_def, element);
        }
        else {
            element.disabled = true;
        }

        return element;
    }

    createRowCheckbox(col_def) {
        if (this.checkWrite()) {
            let element = document.createElement('input');
            element.type = 'checkbox';
            //element.name = col_def.db_field + '[]';
            //element.id = col_def.db_field + '_search';
            // if (data) {
            //     element.checked = true;
            // }
            let self = this;
            element.addEventListener("click", function () {
                self.addInputChangedNotify(element, col_def)

            });
            this.addEvents(col_def, element);
            this.addProperties(col_def, element);
            //element.value = data;
            // element.onclick = function(){self.inputChanged.notify()};
            return element;
        }
        else {
            // do not show on read

        }
    }

    createRowNumber(col_def) {
        let element = document.createTextNode('');
        return element;
    }

    createNumberInput(col_def) {
        if (this.checkWrite()) {
            //can be text, number
            let element = document.createElement('input');
            element.type = 'number';
            element.pattern = "[0-9. -]*"
            let self = this;



            element.addEventListener("keyup", function () {
                self.addInputChangedNotify(element, col_def)
            });
            element.addEventListener("click", function () {
                self.addInputChangedNotify(element, col_def)
            });
            element.addEventListener("change", function () {
                self.addInputChangedNotify(element, col_def)
            });
            this.addEvents(col_def, element);


            this.addProperties(col_def, element);

            this.addMinMax(col_def, element);

            if (typeof col_def['round'] != 'undefined') {
                //if(isNumber(data)) {
                // data = myParseFloat(data);
                // data = round2(data, col_def['round']);
                //}
            }
            //element.value = data;
            return element;
        }
        else {
            if (typeof col_def['round'] != 'undefined') {
               // data = myParseFloat(data);
               // data = round2(data, col_def['round']);
            }
            return document.createTextNode('');
        }
    }

    addMinMax(col_def, element) {
        if (typeof col_def['min'] != 'undefined') {
            element.min = col_def['min'];
        }
        if (typeof col_def['max'] != 'undefined') {
            element.max = col_def['max'];
        }
    }

    createTextInput(col_def) {
        if (this.checkWrite()) {
            let element = document.createElement('input');
            element.type = 'text';
            if (typeof col_def.placeholder != 'undefined' && col_def.placeholder) {
                element.placeholder = col_def.placeholder;
            }

            let self = this;

            //this is ok....
            element.addEventListener("keyup", function () {
                self.addInputChangedNotify(element, col_def)

            });
            //this is more like a set focus.... but really have no idea....could change....
            element.addEventListener("click", function () {
                self.addInputChangedNotify(element, col_def)

            });
            this.addEvents(col_def, element);
            // element.onkeyup = function(){self.inputChanged.notify()}
            this.addProperties(col_def, element);
           // element.value = data;
            return element;
        }
        else {
            // if (data) {
            //     return document.createTextNode(data);
            // }
            return document.createTextNode('');
        }
    }

    createPasswordInput(col_def, ) {
        if (this.checkWrite()) {
            //can be text, number
            let element = document.createElement('input');
            element.type = 'password';
            element.name = col_def['db_field'] + '[]';

            let self = this;
            element.addEventListener("keyup", function () {
                self.addInputChangedNotify(element, col_def)
            });
            this.addEvents(col_def, element);
            // element.onkeyup = function(){self.inputChanged.notify()}
            this.addProperties(col_def, element);
            //element.value = data;
            return element;
        }
        else {
            return document.createTextNode('');
        }
    }

    createDateInput(col_def) {

        //var dt = new Date(data);

        //console.log(dt);
        //var hr = dt.toISOString();
        //console.log(hr);

        if (this.checkWrite()) {
            let element = document.createElement('input');
            element.type = 'date';
            //element.name = 'element_' + cell.id;
            //element.id = element.name;
            if (typeof col_def.placeholder != 'undefined' && col_def.placeholder) {
                element.placeholder = col_def.placeholder;
            }
            //element.value = data;
            let self = this;
            element.addEventListener("change", function () {
                self.addInputChangedNotify(element, col_def)

            });
            this.addEvents(col_def, element);

            return element;
        }
        else {
            return document.createTextNode('');
        }


    }

    createTime(col_def){


        if (this.checkWrite()) {
            let element = document.createElement('input');
            element.type = 'time';
            if (typeof col_def.placeholder != 'undefined' && col_def.placeholder) {
                element.placeholder = col_def.placeholder;
            }

            let self = this;

            //this is ok....
            element.addEventListener("keyup", function () {
                self.addInputChangedNotify(element, col_def)

            });
            //this is more like a set focus.... but really have no idea....could change....
            element.addEventListener("click", function () {
                self.addInputChangedNotify(element, col_def)

            });
            this.addEvents(col_def, element);
            this.addProperties(col_def, element);
            // element.value = hr;
            return element;
        }
        else {
            // if (data) {
            //     return document.createTextNode();
            // }
            return document.createTextNode('');
        }
    }
    createLink(col_def) {
        if (this.model.td.table_view == 'index') {
            let a = document.createElement('a');
            let c = document.createTextNode('');
            a.appendChild(c);


            if (typeof col_def.onClick === 'function') {
                a.addEventListener("click", function () {
                    col_def.onClick();
                });
            }
            else {

            }

            return a;

        }
        else {
            //on the show page we do not want a link....
            return this.createTextNode('');

        }



    }
    createId(col_def) {
        if (this.model.td.table_view == 'index') {
            let a = document.createElement('a');
            let c = document.createTextNode('');
            a.appendChild(c);
            if (typeof col_def.onClick === 'function') {
                a.addEventListener("click", function () {
                    //col_def.onClick(data);
                });
            }
            return a;
        }
        else {
            //on the show page we do not want a link....
            return this.createTextNode(col_def);

        }


    }
    createButton(col_def) {
        let element = document.createElement('button');
        //element.id = db_field + '_sr' + r;
        element.className = "button";
        if (typeof col_def['button_caption'] != 'undefined') {
            let t = document.createTextNode(col_def['button_caption']);
            element.appendChild(t);
        }
        this.addEvents(col_def, element);
        this.addProperties(col_def, element);

        return element;
    }

    createTextNode(col_def) {
        // if (typeof col_def['round'] != 'undefined') {
        //     if (isNumber(data)) {
        //         data = myParseFloat(data);
        //         data = round2(data, col_def['round']);
        //     }

        // }
        return document.createTextNode("");
    }

    createRadio(col_def) {
        let element = document.createElement('input');
        element.type = 'radio';
        element.name = col_def['db_field'] + '[]';
        let self = this;
        element.addEventListener("onclick", function () {
           self.addInputChangedNotify(element, col_def)
        });
        this.addEvents(col_def, element);

        // element.onclick = function(){self.inputChanged.notify()};
        // if (data == 1) {
        //     element.checked = true;
        // }
        if (this.checkWrite()) {
            this.addProperties(col_def, element);
        }
        else {
            element.disabled = true;
        }
        return element;
    }
    addInputChangedNotify(element, col_def){
        let custom_parameters = {}
        custom_parameters.r = this.r;
        custom_parameters.c = this.c;
        custom_parameters.element = element
        custom_parameters.col_def = col_def



        this.inputChanged.notify(custom_parameters)
    }
    addEvents(col_def, element) {
        let custom_parameters = {}
        custom_parameters.r = this.r;
        custom_parameters.c = this.c;
        custom_parameters.col_def = col_def

        if (typeof col_def['events'] !== 'undefined') {
            for (var key in col_def['events']) {
                if (col_def['events'].hasOwnProperty(key)) {
                    // element.addEventListener(key, col_def['events'][key],custom_parameters);
                    // console.log(custom_parameters)
                    element.addEventListener(key, function(e){
                        let callback = col_def['events'][key];
                        callback(e,custom_parameters)
                    });


                }


                // col_def.events.forEach(event => {
                //     for (let index in event)
                //     {
                //         let self = this;
                //         // element.addEventListener(index, function(e){
                //         //     e = e || window.event;
                //         //     self[event[index]].notify(e);
                //         // });
                //         element.addEventListener(index, event[index], );
                //     }
                // });
            }
        }
    }

    addProperties(col_def, element) {


        if (typeof col_def['properties'] !== 'undefined') {
            col_def.properties.forEach(property => {
                for (let index in property) {
                    // element[index] = eval("("+property[index]+")"); //can get this as the element
                    element[index] = property[index];

                    if (index == 'readOnly') {
                        element.tabIndex = '-1';
                    }

                    // if (typeof property[index] === "function") {
                    //     // Execute the callback function and pass the parameters to it​
                    //     //element[index] = property[index](this);
                    //     element[index] = eval("("+property[index](this)+")"); //can get this as the element
                    //
                    //     console.log(index);
                    // }
                    // else
                    // {
                    //     element[index] = property[index];
                    // }

                }
            });

        }
    }

    createDataTableSelect(col_def) {

        if (typeof col_def.select_values === 'undefined') {
            console.log('select_values are not defined');
            return document.createTextNode('error select_values are not defined');
        }


        if (this.checkWrite()) {
            let element = this.createSelect(col_def)
            //element.name = col_def['db_field'] + '[]';
            let self = this;

            if (typeof col_def['individual_select_options'] !== 'undefined') {
                element.onchange = function () {
                    self.individualSelectChanged.notify()
                }
            }
            else {
                element.onchange = function () {
                    self.inputChanged.notify()
                }
            }
            this.addProperties(col_def, element);
            this.addEvents(col_def, element);
            //element.value = data + '';
            return element;
        }
        else {
            //bad things happen comparing sting to int....
            // let name = '';
            // col_def.select_values.forEach(select_value => {
            //     if (select_value.value == data) {
            //         name = select_value.name;
            //     }
            // })

            // console.log('data ' + data)
            // console.log('index ' + index);
            // console.log('value ' + value);
            return document.createTextNode('');
        }
    }

    createSelect(col_def) {
        let element = document.createElement('select');
        let option = document.createElement('option');
        option.value = 'null';
        option.appendChild(document.createTextNode("Select..."));
        element.appendChild(option);
        let select_values = col_def.select_values;
        //let select_names = col_def.select_names;
        select_values.forEach(select_value => {
            option = document.createElement('option');
            option.value = select_value['value'] + '';
            option.appendChild(document.createTextNode(select_value['name'] + ''));
            element.appendChild(option);
        })

        return element;
    }

    findTreeSelectValue(array, data) {
        // console.log('looking for...' + data)
        for (let i = 0; i < array.length; i++) {
            // console.log('select_value');
            // console.log(array[i]);
            if (data == array[i].value) {
                // console.log('select_value ' + array[i].value);
                // console.log('select_name ' +array[i].name)
                return array[i].name;
            }
            let found = false;
            if (typeof array[i].children !== 'undefined') {
                // console.log('looking at children');
                found = this.findTreeSelectValue(array[i].children, data);
                // console.log('found ' + found);
            }
            if (found) return found;
        }
    }

    createDataTableTreeSelect(col_def) {
        if (this.checkWrite()) {
            let element = this.createTreeSelect(col_def)
            let self = this;
            element.onchange = function () {
                self.inputChanged.notify()
            }
            this.addProperties(col_def, element);
            //element.value = data;
            return element;
        }
        else {
            // let value = this.findTreeSelectValue(col_def.select_values, data);
            // if (!value) value = '';
            return document.createTextNode('');
        }
    }

    createTreeSelect(col_def) {
        let element = document.createElement('select');
        let option = document.createElement('option');
        option.value = 'null';
        option.appendChild(document.createTextNode("Select..."));
        element.appendChild(option);
        let level = 0;
        this.addNestedSelectOptions(element, col_def['select_values'], level);
        return element;
    }

    addNestedSelectOptions(element, array, level) {
        array.forEach((category, r) => {
            let option = document.createElement('option');
            option.value = category['value'];
            let name = category['name'];
            for (let i = 0; i < level; i++) {
                name = "\u00A0" + name;
                name = "\u00A0" + name;
                name = "-" + name;

            }
            option.appendChild(document.createTextNode(name));
            element.appendChild(option);
            if (typeof category['children'] !== 'undefined') {
                this.addNestedSelectOptions(element, category['children'], level + 1);
            }
        });
    }

    createEditButton() {
        let self = this;
        let editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.className = 'edit';
        editButton.classList.add("button");

        editButton.onclick = function () {
            self.onEditClick.notify();
        }
        this.editButton = editButton;
        return editButton;
    }

    createCancelButton() {
        let cancelButton = document.createElement('button');
        let self = this;
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className = 'cancel';
        cancelButton.classList.add("button");

        cancelButton.onclick = function () {
            self.onCancelClick.notify();
        }
        this.cancelButton = cancelButton;
        return cancelButton;
    }

    createDeleteButton() {
        let self = this;
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = function () {
            self.onDeleteClick.notify();
        }
        deleteButton.className = 'delete';
        deleteButton.classList.add("button");

        this.deleteButton = deleteButton;
        return deleteButton;
    }

    createSaveButton() {
        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.className = 'save';
        saveButton.classList.add("button");

        let self = this;
        saveButton.onclick = function () {
            self.onSaveClick.notify();
        }
        this.saveButton = saveButton;
        return saveButton;
    }

    createNewButton(msg) {
        let button = document.createElement('button');
        button.className = 'btn-new'
        let self = this;
        button.onclick = function () {
            window.location.href = self.model.td.route + '/create'
        };
        button.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>' + msg;
        return button;
    }


    showWaitModal(show = true) {
        if (show) {
            $(this.waitModal).modal('show');
        }
        else {
            $(this.waitModal).modal('hide');
        }

    }


    //all this goes.......
    showConfirmModal(show = true) {
        if (show) {
            $(this.confirmModal).modal('show');
        }
        else {
            $(this.confirmModal).modal('hide');
        }
    }

    hideErrorModal() {
        // $(this.errorModal).modal('hide');
        this.errorModal.hide();
    }

    showErrorModal(message) {
        this.errorModal.addErrorMessage(message);
        this.errorModal.show();
        // $(this.errorModal).modal('show');
    }


}
