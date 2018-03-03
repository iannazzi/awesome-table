// import {AwesomeTable}  from '../dist/bundle.js';
require('awesome-table');


    let name = 'test1';
    let data = [];
    let column_definition = [
        {
            "db_field": "id",
            "caption": "Id",
            "type": "link",
            "onClick":  function(id){
                alert('go somewhere')
            },
            "route": "accounts",
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": true,
            "th_width": "150px",
            "td_tags": "",
            "class": "",
            "events": [],
            "properties": [],
            "word_wrap": true,
            "post": true
        }, ];

    let page = 'show';
    let access = 'read';
    let edit_display = 'on_page';
    let getData = {};

    let collectionTable = new AwesomeTable({
        data: data,
        // route: component.route,
        name: name,
        column_definition: column_definition,
        table_buttons: ['edit', 'delete'],
        type: 'record', //record, collection or searchable
        table_view: page, //index, create, edit, and show pages: columns respond differnetly to
        access: access, //read vs write
        edit_display: edit_display,
        getData:getData,
        onSaveSuccess(){
           alert('saved')
        },
        onDelete(){
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

    })

    collectionTable.addTo('collectionTable')
