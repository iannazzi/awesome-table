
import {RecordTableView}  from './RecordTableView';
import {RecordTableController}  from './RecordTableController';
import {CollectionTableView}  from './CollectionTableView';
import {CollectionTableController}  from './CollectionTableController';
import {TableModel}  from './TableModel';
import {SearchTableView}  from './SearchTableView';
import {SearchTableController}  from './SearchTableController';




export class AwesomeTable {
    constructor(options) {

        //table types: record, collection,
        //record table_view create edit show  i.e. read write

        let und = function (key, value) {
            if (typeof options[key] === 'undefined') {
                options[key] = value;
            }
        }

        //some defaults
        und('access', 'read');
        und('edit_display', 'on_page')


        this.options = options;

        //i want to be able to set/ get data like
        //this.data.value = new value


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
        //this.options.name = div_id;
        switch (this.options.type) {
            case 'record':
                this.recordTable();
                break;
            case 'collection':
                this.collectionTable();
                break;
            case 'searchable':
                this.searchableTable();
                break;
            default:
                console.log('missed the type in the table definition');
        }
    }

    recordTable() {

        let model = new TableModel(this.options);
        let view = new RecordTableView(model);
        let controller = new RecordTableController(model, view);



        //modal is used for a pop up 'edit_display
        let modal_options = this.clone(this.options);
        modal_options.name = modal_options.name + '_modal';
        let modelModal = new TableModel(modal_options);
        let viewModal = new RecordTableView(modelModal);
        let controllerModal = new RecordTableController(modelModal, viewModal);

        this.model = model;
        this.view = view;
        this.controller = controller;
        this.modelModal = modelModal;
        this.viewModal = viewModal;
        this.controllerModal = controllerModal;


        let self = this;
        //this nonsense is to set the focus to the first input..
        $(viewModal.formModal.modal_div).on('shown.bs.modal', function () {
            let q = $(viewModal.formModal.modal_div).find(":input:first");
            q.focus();
            q.select();
        })

        switch (this.options.edit_display) {
            case 'on_page':
                this.div.appendChild(view.createRecordTable());
                model.options.onSaveClick = function () {
                    //we need ajax here....
                    let post_data = {data: controller.getPostData(), _method: 'put'};

                    if (typeof modelModal.options.additionalPostValues !== 'undefined') {
                        post_data['additional_post_values'] = modelModal.options.additionalPostValues;
                    }
                    view.showWaitModal(true);
                    console.log(JSON.stringify(post_data))
                    self.options.getData(
                        {
                            method: 'post',
                            url: controller.model.td.route,
                            entity: post_data,
                            onSuccess(response) {
                                model.original_data = controller.getPostData();
                                view.showWaitModal(false);
                                controller.onSaveSuccess.notify(response);
                            },
                            onError(response){
                                view.showWaitModal(false);
                                view.showErrorModal(response.message);
                            }
                        }
                    );

                }
                break;
            case 'modal':

                viewModal.inputChanged.attach(
                    function () {
                        model.tdo = modelModal.tdo;
                        view.updateTable();
                    }
                );

                this.div.appendChild(view.createRecordTable());

                this.div.appendChild(viewModal.createModalTable(viewModal.createRecordTable()));

                model.options.onEditClick = function () {
                    modelModal.td.access = "write";
                    modelModal.td.table_view = "edit";

                    viewModal.showModalTable();
                    viewModal.updateTable();
                }
                modelModal.options.onSaveClick = function () {
                    //we need ajax here....
                    let post_data = {data: controller.getPostData(), _method: 'put'};

                    if (typeof modelModal.options.additionalPostValues !== 'undefined') {
                        post_data['additional_post_values'] = modelModal.options.additionalPostValues;
                    }
                    viewModal.showWaitModal(true);
                    console.log(JSON.stringify(post_data))

                    //console.log(self.options)


                    self.options.getData(
                        {
                            method: 'post',
                            url: controller.model.td.route,
                            entity: post_data,
                            onSuccess(response) {
                                model.original_data = controller.getPostData();
                                viewModal.showWaitModal(false);
                                viewModal.hideModalTable();
                                controller.onSaveSuccess.notify(response);
                            },
                            onError(response){
                                viewModal.showWaitModal(false);
                                viewModal.showErrorModal(response.message);
                            }
                        }
                    );


                }
                modelModal.options.onSaveSuccess = function () {
                    // self.model.td.access = "read";
                    // self.model.td.table_view = "show";
                    viewModal.hideModalTable();
                    //update the table data object
                    model.tdo = modelModal.tdo;
                    view.updateTable();
                }
                modelModal.options.onCancelClick = function () {
                    // self.model.td.access = "read";
                    // self.model.td.table_view = "show";
                    model.loadOriginalData();
                    view.updateTable();
                    viewModal.hideModalTable();
                }
                break;

            case 'modal_only':


                this.modelModal.options.onEditClick = function () {
                    alert('why is there an edit button on the modal')
                }
                this.modelModal.options.onCancelClick = function () {
                    self.viewModal.hideModalTable();
                }

                this.div.appendChild(this.viewModal.createModalTable(this.viewModal.createRecordTable()));


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


    collectionTable() {
        let self = this;

        let model = new TableModel(this.options);
        let view = new CollectionTableView(model);
        let controller = new CollectionTableController(model, view);

        let modelModal = new TableModel(this.clone(this.options));
        let viewModal = new CollectionTableView(modelModal);
        let controllerModal = new CollectionTableController(modelModal, viewModal);

        $(viewModal.formModal.modal_div).on('shown.bs.modal', function () {
            let q = $(viewModal.formModal.modal_div).find(":input:first");
            q.focus();
            q.select();
        })


        viewModal.inputChanged.attach(
            function () {
                model.tdo = modelModal.tdo;
                view.updateTable();
            }
        );
        switch (this.options.edit_display) {
            case 'on_page':
                this.div.appendChild(this.view.createCollectionTable());
                model.options.onSaveClick = function () {
                    //we need ajax here....
                    let post_data = {data: controller.getPostData(), _method: 'put'};

                    if (typeof modelModal.options.additionalPostValues !== 'undefined') {
                        post_data['additional_post_values'] = modelModal.options.additionalPostValues;
                    }
                    view.showWaitModal(true);
                    console.log(JSON.stringify(post_data))

                    console.log(self.options)

                    self.options.getData(
                        {
                            method: 'post',
                            url: controller.model.td.route,
                            entity: post_data,
                            onSuccess(response) {
                                model.original_data = controller.getPostData();
                                view.showWaitModal(false);
                                controller.onSaveSuccess.notify(response);
                            },
                            onError(response){
                                view.showWaitModal(false);
                                view.showErrorModal(response.responseJSON.message);
                            }
                        }
                    );

                }
                break;
            case 'modal':

                this.div.appendChild(view.createCollectionTable());
                this.div.appendChild(viewModal.createModalTable(viewModal.createCollectionTable()));
                modelModal.options.onSaveClick = function () {
                    //we need ajax here....
                    let post_data = {data: controller.getPostData(), _method: 'put'};

                    if (typeof modelModal.options.additionalPostValues !== 'undefined') {
                        post_data['additional_post_values'] = modelModal.options.additionalPostValues;
                    }
                    viewModal.showWaitModal(true);
                    console.log(JSON.stringify(post_data))

                    console.log(self);

                    self.options.getData(
                        {
                            method: 'post',
                            url: controller.model.td.route,
                            entity: post_data,
                            onSuccess(response) {
                                model.original_data = controller.getPostData();
                                viewModal.showWaitModal(false);
                                viewModal.hideModalTable();
                                controller.onSaveSuccess.notify(response);
                            },
                            onError(response){
                                viewModal.showWaitModal(false);
                                view.showErrorModal(response.responseJSON.message);
                            }
                        }
                    );

                }
                model.options.onEditClick = function () {

                    modelModal.td.access = "write";
                    modelModal.td.table_view = "edit";
                    viewModal.showModalTable();
                    viewModal.updateTable();
                }

                modelModal.options.onSaveSuccess = function () {
                    // self.model.td.access = "read";
                    // self.model.td.table_view = "show";
                    viewModal.hideModalTable();
                    model.tdo = modelModal.tdo;
                    view.updateTable();
                }
                modelModal.options.onCancelClick = function () {
                    model.loadOriginalData();
                    view.updateTable();
                    viewModal.hideModalTable();
                }
                break;

            case 'modal_only':


                modelModal.options.onEditClick = function () {
                    alert('why is there an edit button on the modal')
                }
                modelModal.options.onCancelClick = function () {
                    viewModal.hideModalTable();
                }

                this.div.appendChild(viewModal.createModalTable());


        }


        // return this.view.dataTable();

    }

    searchableTable() {
        let model = new TableModel(this.options);
        let view = new SearchTableView(model);
        let controller = new SearchTableController(model, view);
        this.searchController = controller;
        let self = this;
        let searchTable = view.createSearchTable();
        this.div.appendChild(searchTable);

        $(function () {
            controller.loadPageEvent.notify();
        });
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