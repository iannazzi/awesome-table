   import {AwesomeTable}  from '../src/table/AwesomeTable';
   import $ from 'jquery';
   import './app.scss';
   window.jQuery = $;
   window.$ = $;
   require('bootstrap-sass');
   import cd1 from './cd1';
   import data1 from './data1.json';


   import {faker} from './faker';
   let data = faker();


   let recordTable = new AwesomeTable('record');
   let config =  {
       data: [data[0]], //data1.data.records,
       column_definition: cd1(),
       table_buttons: ['edit', 'delete'],
       table_view: 'show', //index, create, edit, and show pages: columns respond differnetly to
       access: 'read', //read vs write
       edit_display: 'on_page', //ok this is to get the table buttons.... hmmmmmm probably do not need this after I get modal under control.....
       getData:function(){
           alert('this is the part where I go to the server.....');
           //show a modal
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
       onCancelCreateClick(){
           alert('canceled');
       }

   }
   recordTable.loadConfiguration(config);
   recordTable.addTo('recordTableOnPageEdit')

   let collectionTable = new AwesomeTable('collection');
   let config2 =  {
       data: data, //data1.data.records,
       column_definition: cd1(),
       table_buttons: [],
       table_view: 'show', //index, create, edit, and show pages: columns respond differnetly to
       access: 'read', //read vs write
       edit_display: 'on_page', //ok this is to get the table buttons.... hmmmmmm probably do not need this after I get modal under control.....
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
       data: data, //data1.data.records,
       column_definition: cd1(),
       table_buttons: ['edit', 'delete'],
       table_view: 'show', //index, create, edit, and show pages: columns respond differnetly to
       access: 'read', //read vs write
       edit_display: 'on_page', //ok this is to get the table buttons.... hmmmmmm probably do not need this after I get modal under control.....
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
       data: data, //data1.data.records,
       column_definition: cd1(),
       table_buttons: ['edit', 'delete'],
       table_view: 'show', //index, create, edit, and show pages: columns respond differnetly to
       access: 'read', //read vs write
       edit_display: 'on_page', //ok this is to get the table buttons.... hmmmmmm probably do not need this after I get modal under control.....
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
       }

   }
   searchabletable.loadConfiguration(config4);
   searchabletable.addTo('searchableTableNotEditable')





