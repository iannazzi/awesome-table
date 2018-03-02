import {TableEvent} from './TableEvent'
import {TableEvents} from './TableEvents'


export class RecordTableEvents extends TableEvents {

    constructor(controller) {
        super(controller);
        let view = controller.view;

        //##################    LOAD PAGE
        controller.loadPageEvent = new TableEvent(controller);
        controller.loadPageEvent.attach(
            function () {

                console.log('load page event...')


                //view.updateTable();


            }
        );

        //##################   INPUT CHANGED
        view.inputChanged = new TableEvent(view);
        controller.view.inputChanged.attach(
            function () {
                console.log('input changed');
                controller.copyTable()
            }
        );
        view.individualSelectChanged = new TableEvent(view);
        controller.view.individualSelectChanged.attach(
            function () {
                //console.log('individual select changed');
                controller.copyTable();
                //controller.view.updateIndividualSelectOptions();
            }
        );

        //##################   EDIT CLICKED
        view.onEditClick = new TableEvent(view);
        controller.view.onEditClick.attach(
            function () {
                if (typeof controller.model.options.onEditClick == 'function') {

                    controller.model.options.onEditClick();
                    console.log('using custom onEditClick')
                    console.log(controller.model.options)

                }
                else {
                    console.log('using reg onEditClick')
                    controller.model.td.table_view = 'edit';
                    controller.model.td.access = 'write';
                    view.updateTable();
                    view.updateButtons();
                    controller.setFocusToFirstInput();
                }


            }
        );

        //##################   CANCEL CLICKED
        view.onCancelClick = new TableEvent(view);
        view.onCancelClick.attach(
            function () {

                //cancel was clicked
                //hide the modal
                //or set view to read
                switch (controller.model.td.table_view) {
                    case 'edit':
                        controller.model.loadOriginalData();

                        if (controller.model.options.edit_display == 'on_page') {

                            controller.model.td.table_view = 'show';
                            controller.model.td.access = 'read';
                            view.updateTable();
                            //set the original data to the new data

                        }
                        else if (controller.model.options.edit_display == 'modal') {
                            controller.model.options.onCancelClick();
                        }
                        else if (controller.model.options.edit_display == 'modal_only') {
                            controller.model.options.onCancelClick();
                        }

                        break;


                    case 'create':
                        if (typeof controller.model.td.onCancelCreateClick === 'function') {
                            controller.model.td.onCancelCreateClick()
                        }
                        else {
                            console.log('add onCancelCreateClick callback to option array')
                        }
                }


            }
        );

        //##################   SAVE CLICKED
        view.onSaveClick = new TableEvent(view);
        controller.view.onSaveClick.attach(
            function () {

                if (typeof controller.model.options.onSaveClick === 'function') {
                    controller.model.options.onSaveClick();
                }

            }
        );

        //##################   SAVE SUCCESS
        controller.onSaveSuccess = new TableEvent(controller);
        controller.onSaveSuccess.attach(
            function (sender, result) {

                console.log(controller.model.td.table_view);

                switch (controller.model.td.table_view) {
                    case 'create':
                        if (typeof controller.model.options.onCreateSaved === "function") {
                            controller.model.options.onCreateSaved(result.id);
                        }
                        else {
                            alert('add onCreate to table options');
                        }
                        //window.location.href = controller.model.td.route + '/' + result.id;
                        break;
                    case 'edit':
                        //modal or not
                        if (controller.model.options.edit_display == 'on_page') {
                            console.log(result);

                            controller.model.td.table_view = 'show';
                            controller.model.td.access = 'read';
                            //set the original data to the new data
                            controller.model.original_data = controller.getPostData();
                            view.updateTable();

                        }
                        else if (controller.model.options.edit_display == 'modal') {

                            controller.model.options.onSaveSuccess(result.id);

                        }
                        else if (controller.model.options.edit_display == 'modal_only') {

                            console.log(result);
                            console.log(JSON.stringify(controller.getPostData()))
                            console.log(controller.model.td.table_view);
                            console.log(controller.model.td.edit_display);


                            console.log(JSON.stringify(controller.model.tdo))


                            console.log(result.id)
                            controller.model.options.onSaveSuccess(result.id);


                        }


                        break;
                }

                controller.saveComplete.notify();
                //switch the uri to the new id....

            }
        )

        //##################   SAVE COMPLETE
        controller.saveComplete = new TableEvent(controller);

        //##################   DELETE CLICKED
        view.onDeleteClick = new TableEvent(view);
        view.onDeleteClick.attach(function () {
            controller.getConfirm('Are you sure about that delete?', function (result) {
                if (result) {
                    let self = controller;
                    controller.view.showWaitModal(true);
                    //let self2 = self;
                    let post_data = {_method: 'delete', data: {id: self.model.tdo[0]['id']['data']}};
                    //console.log(JSON.stringify(data));
                    if (typeof controller.model.options.onDeleteClick === 'function') {
                        controller.model.options.onDeleteClick();
                    }


                    controller.model.options.getData(
                        {
                            method: 'post',
                            url: controller.model.td.route,
                            entity: post_data,
                            onSuccess(response) {
                                self.view.showWaitModal(false);
                                if (typeof controller.model.options.onDeleteSuccess === 'function') {
                                    controller.model.options.onDeleteSuccess();
                                }
                            },
                            onError(response){

                            }
                        }
                    );
                }

            });
        });

    }
}
