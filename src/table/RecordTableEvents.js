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
                switch (controller.model.td.table_view) {
                    case 'edit':
                        controller.onCancelEdit();
                        break;
                    case 'create':
                        controller.onCancelCreate();
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
        });

    }
}
