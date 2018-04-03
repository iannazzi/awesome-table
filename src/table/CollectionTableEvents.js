import {TableEvent} from './TableEvent'
import {TableEvents} from './TableEvents'


export class CollectionTableEvents extends TableEvents {

    constructor(controller) {
        super(controller);

        let view = controller.view;
        let model = controller.model;
        this.controller = controller;
        this.view = view;
        this.model = model;
        controller.loadPageEvent = new TableEvent(controller);
        view.deleteColumnClicked = new TableEvent(view);
        view.addRowClicked = new TableEvent(view);
        view.deleteRowClicked = new TableEvent(view);
        view.moveRowUpClicked = new TableEvent(view);
        view.moveRowDownClicked = new TableEvent(view);
        view.copyRowClicked = new TableEvent(view);
        view.deleteAllClicked = new TableEvent(view);
        view.makeTableWriteable = new TableEvent(view);
        view.makeTableReadable = new TableEvent(view);
        view.inputChanged = new TableEvent(view);
        view.individualSelectChanged = new TableEvent(view);
        view.dataTableChanged = new TableEvent(view);


        //##################   EDIT
        view.onEditClick = new TableEvent(view);
        controller.view.onEditClick.attach(
            function() {
            if (typeof model.td.onEditClick === 'function') {
                model.td.onEditClick();
            }
            else {
                controller.makeEditable()
                view.showRowModifyButtons();
            }

        }
        );

        //##################   CANCEL
        view.onCancelClick = new TableEvent(view);
        controller.view.onCancelClick.attach(
            function () {

                controller.model.loadBackupData();
                controller.makeReadable();
                view.hideRowModifyButtons();

            }
        );


        //##################   SAVE SUCCESS
        controller.onSaveSuccess = new TableEvent(controller);
        controller.onSaveSuccess.attach(
            function (sender, result) {
                controller.model.td.access = 'read';
                view.drawTable();
                controller.model.original_data = controller.getPostData();
                //     if (controller.model.td.edit_display == 'on_page') {
                //         controller.model.td.access = 'read';
                //         view.drawTable();
                //         controller.model.original_data = controller.getPostData();
                //     }
                //     else if (controller.model.td.edit_display == 'modal') {
                //         if(typeof controller.model.td.onSaveSuccess === 'function'){
                //             controller.model.td.onSaveSuccess(result.id);
                //
                //         }
                //
                //     }
                //     else if (controller.model.td.edit_display == 'modal_only') {
                //
                //         console.log(result);
                //         console.log(JSON.stringify(controller.getPostData()))
                //         console.log(controller.model.td.table_view);
                //         console.log(controller.model.td.edit_display);
                //         console.log(JSON.stringify(controller.model.tdo))
                //         console.log(result.id)
                //
                //         controller.model.td.onSaveSuccess(result.id);
                //     }
            }
        )


        let self = controller;
        view.onHeaderClick = new TableEvent(view);

        view.onHeaderClick.attach(
            function (sender, args) {
                console.log('collection table controller on sort');


                controller.uri.onSort(args);


                let uri_array = controller.uri.getUri();
                console.log('uri array')
                console.log(uri_array)

                //this will mofify the url....
                if (typeof controller.model.td.onSortClick === 'function') {
                    //this callback has router
                    controller.model.td.onSortClick(controller.uri.getUri());
                }


                controller.model.sortData()
                controller.view.updateHeaderSortView();
                //this function sucks, i think you want updateTableValues();
                //controller.view.drawTable();


            }
        )


        view.selectAllClicked = new TableEvent(view);
        controller.view.selectAllClicked.attach(
            function () {
                controller.selectAll();
            }
        )

        view.selectNoneClicked = new TableEvent(view);
        controller.view.selectNoneClicked.attach(
            function () {
                controller.selectNone();
            }
        )


        view.addColumnClicked = new TableEvent(view);
        controller.view.addColumnClicked.attach(
            function () {
                controller.model.addColumnToArray(controller.view.array_col);
                controller.view.drawTable();
            }
        )
        controller.view.deleteColumnClicked.attach(
            function () {
                controller.model.deleteColumnFromArray(controller.view.array_col);
                controller.view.drawTable();
            }
        )
        controller.view.addRowClicked.attach(
            function () {
                let row = controller.addRow();


                return row;
            }
        );
        controller.view.deleteRowClicked.attach(
            function () {
                    if (confirm("Confirm Delete Row(s)")) {
                        self.deleteRow(confirm)
                    }
            }
        );
        controller.view.moveRowUpClicked.attach(
            function () {
                self.moveRowUp()
            }
        );
        controller.view.moveRowDownClicked.attach(
            function () {
                self.moveRowDown()
            }
        );
        controller.view.copyRowClicked.attach(
            function () {
                self.copyRow()
            }
        );
        controller.view.deleteAllClicked.attach(
            function (args) {
                if (confirm("Confirm Delete All Rows")) {
                    self.deleteAllRows(args)
                }
            }
        );
        controller.view.inputChanged.attach(
            function (sender, args) {
                console.log('inputChanged Event...  copyTable then updateTotals ... then the cd event');
                let element = args.element;

                //what is the elments row and column?
                let cell = element.parentNode;
                let c = cell.cellIndex;

                let row = cell.parentNode;
                let r = row.sectionRowIndex;

                self.copyTable()
                self.view.updateTotals()
                if (typeof controller.model.td.onChange === 'function') {
                    //this callback has router
                    controller.model.td.onChange(args, r, c);
                }
            }
        );
        controller.view.individualSelectChanged.attach(
            function () {
                //console.log('individual select changed');
                self.copyTable();
                self.view.updateIndividualSelectOptions();
                self.view.inputChanged.notify();
            }
        );


    }



}