import {TableEvent} from './TableEvent'

export class TableEvents {
    constructor(controller) {
        let view = controller.view;
        let model = controller.model;




        //##################   SAVE
        view.onSaveClick = new TableEvent(view);
        controller.view.onSaveClick.attach(
            function () {
                if(typeof controller.model.td.onSaveClick === 'function'){
                    return controller.model.td.onSaveClick();
                }

            }
        );






    }



}