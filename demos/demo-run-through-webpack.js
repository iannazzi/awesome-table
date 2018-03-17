   import {AwesomeTable}  from '../src/table/AwesomeTable';

   import $ from 'jquery';
   import './app.scss';
   window.jQuery = $;
   window.$ = $;
   require('bootstrap-sass');
   import {ColumnDefinition} from './ColumnDefinition';
   import data1 from './data1.json';






   import {faker} from './faker';
   let data = faker();

   //use a class to build up the different column definitions.....
   let column_definition = new ColumnDefinition();

   let recordTable = new AwesomeTable('record');
   let config =  {
       name: 'recordTable',
       data: [data[0]], //data1.data.records,
       column_definition: column_definition.allOptions(),
       table_buttons: ['edit', 'delete'],
       access: 'read', //read vs write
       getData:function(){
           alert('this is the part where I go to the server.....');
           //show a modal
       },
       onChange(element){
           //here I can get the element, but not sure who that is......
           // console.log(recordTable.controller.getPostData());
           recordTable.setValue('textarea',0,recordTable.getValue('input',0));
       },
       onSaveClick(){
           let post_data = {data: recordTable.controller.getPostData(), _method: 'put'};
            //here we could pop up our own modal..... not part of table code though.... separate.....
           //view.showWaitModal(true);
           console.log(JSON.stringify(post_data))
           //set to read....
           //in a larger project you would ajax the data...
           recordTable.controller.makeReadable();

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
       }

   }
   recordTable.loadConfiguration(config).addTo('recordTableOnPageEdit');

   document.getElementById('recordTableWriteAccess').onclick = function () { recordTable.controller.makeEditable(); };

   let collectionTable = new AwesomeTable('collection');
   let config2 =  {
       name: 'collectionTable',
       data: data, //data1.data.records,
       column_definition: column_definition.allOptions(),
       table_buttons: [],
       access: 'read', //read vs write
       getData:function(){
           alert('this is the part where I go to the server.....');
           //show a modal
       },
       onSaveClick(){
           let post_data = {data: collectionTable.controller.getPostData(), _method: 'put'};
           //here we could pop up our own modal..... not part of table code though.... separate.....
           //view.showWaitModal(true);
           console.log(JSON.stringify(post_data))
           //set to read....
           //in a larger project you would ajax the data...
           collectionTable.controller.makeReadable();

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
       onCancelCreateClick(){
           alert('canceled');
       }

   }
   collectionTable.loadConfiguration(config2);
   collectionTable.addTo('collectionTableNotEditable')

   let collectionTableEditable = new AwesomeTable('collection');
   let config3 =  {
       name: 'collectionTableEditable',
       data: data, //data1.data.records,
       column_definition: column_definition.allOptions(),
       table_buttons: ['edit'],
       access: 'read', //read vs write
       getData:function(){
           alert('this is the part where I go to the server.....');
           //show a modal
       },
       onSaveClick(){
           let post_data = {data: collectionTableEditable.controller.getPostData(), _method: 'put'};
           //here we could pop up our own modal..... not part of table code though.... separate.....
           //view.showWaitModal(true);
           console.log(JSON.stringify(post_data))
           //set to read....
           //in a larger project you would ajax the data...
           collectionTableEditable.controller.makeReadable();

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
       onCancelCreateClick(){
           alert('canceled');
       }

   }
   collectionTableEditable.loadConfiguration(config3);
   collectionTableEditable.addTo('collectionTableEditable')

   let searchabletable = new AwesomeTable('searchable');
   let config4 =  {
       name: 'searchabletable',
       data: data, //data1.data.records,
       column_definition: column_definition.allOptions(),
       table_buttons: ['edit', 'delete'],
       access: 'read', //read vs write
       getData:function(){
           alert('this is the part where I go to the server.....');
           //show a modal
       },
       onSaveClick(){
           let post_data = {data: searchabletable.controller.getPostData(), _method: 'put'};
           //here we could pop up our own modal..... not part of table code though.... separate.....
           //view.showWaitModal(true);
           console.log(JSON.stringify(post_data))
           //set to read....
           //in a larger project you would ajax the data...
           searchabletable.controller.makeReadable();

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
       onCancelCreateClick(){
           alert('canceled');
       },
       onSearchClick(query){

            let return_data = [];
            let field;
            for(let i = 0; i<data.length; i++){
                if(data[i].name.search(query.searchabletable_name)>-1){
                    return_data.push(data[i]);
                }
            }

           //the bad news is there is a ton of code to consider here...
           //hitting the server for the data
           //storing the search

           searchabletable.model.loadData(return_data);
           searchabletable.view.addDataTable();




       },
       onSearchResetClick(){

       }

   }
   searchabletable.loadConfiguration(config4);
   searchabletable.addTo('searchableTableNotEditable')

   //this should automatically have a row checkbox..... wrong...
   let adjustableRow = new AwesomeTable('collection');
   let config5 =  {
       name: 'adjustableRow',
       data: [], //data1.data.records,
       column_definition: column_definition.allOptions(),
       table_buttons: ['addRow','deleteRow','copyRows','moveRows','deleteAllRows'],
       access: 'write', //read vs write


   }
   adjustableRow.loadConfiguration(config5);
   adjustableRow.addTo('adjustableRow')

   let adjustableColumn = new AwesomeTable('collection');
   let config6 =  {
       name: 'adjustableColumn',
       data: [], //data1.data.records,
       column_definition: column_definition.adjustableColumn(),
       table_buttons: ['addColumn','deleteColumn'],
       access: 'write', //read vs write
   }
   adjustableColumn.loadConfiguration(config6);
   adjustableColumn.addTo('adjustableColumn')



