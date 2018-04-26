/**
 * Created by embrasse-moi on 1/24/17.
 */

export class TableDefinition {
    verifyTableDefinition(td){
        let ok = true;
        let errors = [];
        if(typeof td.name === 'undefined'){
            //problem
            ok = false;
            errors.push('name is not defined')
        }


    }
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
            getData: function(){
                //a callback funtion to return either an array or false.
                //for example
                let data = [];
                data [0] = {};
                data[0].name = 'name'
                return data;
                //or return false
            },
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
            },
            onSearchClick(){

            }


        };
        return td;
    }



}