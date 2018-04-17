/**
 * Created by embrasse-moi on 1/24/17.
 */

export class TableDefinition {

    td() {
        let td = {
            "name": "name",
            "access": "READ WRITE",
            "buttons": ['selectRows', 'addRow','deleteRow','deleteAllRows', 'moveRows','copyRows', 'addColumn', 'deleteColumn', 'edit'],
            "table_view": "index show create edit",
            "route": "vendors  routes: vendor post is search, vendor put vendor patch vendor delete ",
            "footer": [],
            "header": [],
            "column_definition": this.cd(),
            onChange: function (args, r, c) {
            },
            onSaveClick(){
                alert('save')
            },
            onSaveSuccess(){
                alert('saved')
            },
            onDeleteClick(){
                alert('delete');
            },
            onDeleteSuccess(){
                alert('deleted');
            },
            onCreateSaved(id){
                alert('deleted');
            },
            onCancelClick(){
                //cancel create, cancel edit, anything else?
                alert('canceled');
            },
            onCancelCreateClick(){
                alert('canceled');
            },
            onHeaderArrayClick(args){
            }


        };
        return td;
    }



}