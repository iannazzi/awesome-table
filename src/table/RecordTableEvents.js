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

        //##################   INPUT CHANGED
        view.inputChanged = new TableEvent(view);
        controller.view.inputChanged.attach(
            function (sender, args) {
                console.log('input changed');
                controller.copyTable();
                if (typeof controller.model.td.onChange === 'function') {
                    //this callback has router
                    controller.model.td.onChange(args);
                }
            }
        );



        //##################   EDIT CLICKED
        view.onEditClick = new TableEvent(view);
        controller.view.onEditClick.attach(
            function () {
                if (typeof controller.model.td.onEditClick == 'function') {

                    controller.model.td.onEditClick();
                    console.log('using custom onEditClick')
                    console.log(controller.model.td)

                }
                else {
                    console.log('using reg onEditClick')

                    controller.makeEditable();

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
                        controller.model.td.table_view = 'show';
                        controller.model.td.access = 'read';
                        view.drawTable();

                        // if (controller.model.td.edit_display == 'on_page') {
                        //
                        //     controller.model.td.table_view = 'show';
                        //     controller.model.td.access = 'read';
                        //     view.drawTable();
                        //     //set the original data to the new data
                        //
                        // }
                        // else if (controller.model.td.edit_display == 'modal') {
                        //     controller.model.td.onCancelClick();
                        // }
                        // else if (controller.model.td.edit_display == 'modal_only') {
                        //     controller.model.td.onCancelClick();
                        // }

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



        //##################   SAVE SUCCESS
        controller.onSaveSuccess = new TableEvent(controller);
        controller.onSaveSuccess.attach(
            function (sender, result) {

                console.log(controller.model.td.table_view);

                switch (controller.model.td.table_view) {
                    case 'create':
                        if (typeof controller.model.td.onCreateSaved === "function") {
                            controller.model.td.onCreateSaved(result.id);
                        }
                        else {
                            alert('add onCreateSaved to table options');
                        }
                        //window.location.href = controller.model.td.route + '/' + result.id;
                        break;
                    case 'edit':
                        controller.model.td.table_view = 'show';
                        controller.model.td.access = 'read';
                        //set the original data to the new data
                        controller.model.original_data = controller.getPostData();
                        view.drawTable();

                        //modal or not


                        // if (controller.model.td.edit_display == 'on_page') {
                        //
                        //     controller.model.td.table_view = 'show';
                        //     controller.model.td.access = 'read';
                        //     //set the original data to the new data
                        //     controller.model.original_data = controller.getPostData();
                        //     view.drawTable();
                        //
                        // }
                        // else if (controller.model.td.edit_display == 'modal') {
                        //
                        //     controller.model.td.onSaveSuccess(result.id);
                        //
                        // }
                        // else if (controller.model.td.edit_display == 'modal_only') {
                        //
                        //     console.log(result);
                        //     console.log(JSON.stringify(controller.getPostData()))
                        //     console.log(controller.model.td.table_view);
                        //     console.log(controller.model.td.edit_display);
                        //
                        //
                        //     console.log(JSON.stringify(controller.model.tdo))
                        //
                        //
                        //     console.log(result.id)
                        //     controller.model.td.onSaveSuccess(result.id);
                        //
                        //
                        // }


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

            if (typeof controller.model.td.onDeleteClick === 'function') {
                controller.model.td.onDeleteClick();
            }
            //this has to move
            // controller.getConfirm('Are you sure about that delete?', function (result) {
            //     if (result) {
            //         let self = controller;
            //         controller.view.showWaitModal(true);
            //         //let self2 = self;
            //         let post_data = {_method: 'delete', data: {id: self.model.tdo[0]['id']['data']}};
            //         //console.log(JSON.stringify(data));
            //         if (typeof controller.model.td.onDeleteClick === 'function') {
            //             controller.model.td.onDeleteClick();
            //         }
            //
            //
            //         controller.model.td.getData(
            //             {
            //                 method: 'post',
            //                 url: controller.model.td.route,
            //                 entity: post_data,
            //                 onSuccess(response) {
            //                     self.view.showWaitModal(false);
            //                     if (typeof controller.model.td.onDeleteSuccess === 'function') {
            //                         controller.model.td.onDeleteSuccess();
            //                     }
            //                 },
            //                 onError(response){
            //
            //                 }
            //             }
            //         );
            //     }
            //
            // });
        });

    }
}
