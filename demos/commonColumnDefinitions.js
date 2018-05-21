let allOptions = function (awesomeTable) {
    let column_definition = [
        {
            "db_field": "id",
            "type": "link",
            "onClick": function (id) {
                console.log('go somewhere')
            },
            "route": "vendors",
            "caption": "Id",
            "default_value": '',
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": true,
            "td_tags": "",
            "th_width": "40px",
            "class": "",
            "events": [],
            "properties": [],

            "word_wrap": true
        },
        {
            "db_field": 'name',
            "caption": "Name", //this can also be a 2-d array to match data that is in an array
            search: true,
            search_default: 'hi',
            sort: 'desc',
            "type": "text",
        },
        {
            "db_field": 'html',
            "caption": "HTML", //this can also be a 2-d array to match data that is in an array
            "type": "html",
            'default_value': 'default value is set',
        },
        {
            "db_field": 'date',
            "caption": "Date", //this can also be a 2-d array to match data that is in an array
            "type": "date",
            search: true,
            'min': '2018-04-11',   //add a minimum value
            'max': '2020-01-12', //add a maximum value for the browser to handle
        },
        {
            "db_field": 'time',
            "caption": "time", //this can also be a 2-d array to match data that is in an array
            "type": "time",
            "placeholder": "HH:MM AM/PM or 24 Hr"
        },
        {
            "db_field": 'password',
            "caption": "password", //this can also be a 2-d array to match data that is in an array
            "show_on_list": false,
            "show_on_view": false,
            "show_on_edit": false,
            "show_on_create": true,
            "type": "password",
        },
        {
            db_field: 'number',
            caption: "number", //this can also be a 2-d array to match data that is in an array
            type: "number",
            min: 1,   //add a minimum value
            max: 10, //add a maximum value for the browser to handle
            round: 2
        },
        {
            db_field: 'number',
            caption: "number", //this can also be a 2-d array to match data that is in an array
            type: "number",
            min: 1,   //add a minimum value
            max: 10, //add a maximum value for the browser to handle
            round: 0
        },
        {
            "db_field": 'textarea',
            "caption": "textarea", //this can also be a 2-d array to match data that is in an array
            "type": "textarea",
        },
        {
            "db_field": 'checkbox',
            "caption": "checkbox", //this can also be a 2-d array to match data that is in an array
            "type": "checkbox",
            search: true,
            search_default: 1,
        },
        {
            "db_field": 'select',
            "caption": "select", //this can also be a 2-d array to match data that is in an array
            "type": "select",
            'select_values': awesomeTable.ColumnDefinition.select_values(), //or this.tree_select_values();
            search: true,

        },
        {
            "db_field": 'tree_select',
            "caption": "tree <br/> select", //this can also be a 2-d array to match data that is in an array
            "type": "tree_select",
            'select_values': awesomeTable.ColumnDefinition.tree_select_values(), //or this.tree_select_values();
            search: true,

        },
        {
            "db_field": 'button',
            "caption": "button",
            "type": "button",
            button_caption: 'Yo Yo Ma'
        },
        {
            "db_field": 'link',
            "caption": "link", //this can also be a 2-d array to match data that is in an array
            "type": "link",
        },
        {
            "db_field": 'radio',
            "caption": "radio", //this can also be a 2-d array to match data that is in an array
            "type": "radio",
        }

    ];
    return column_definition;
}
let oneTableMultiView = function (awesomeTable) {
    let column_definition = [
        {
            db_field: 'row_checkbox',
            type: "row_checkbox",
            caption: ''
        },
        {
            db_field: 'row_number',
            type: "row_number",
            caption: '#'
        },
        {
            "db_field": "id",
            "type": "id",
            "onClick": function (id) {
                return id;
            },
            "caption": "Id",
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": false,
            "th_width": "40px",
            "class": "",
            "events": [{
                "click": function () {
                    //alert('boo')
                }
            }],
            "properties": [],
            "word_wrap": true
        },
        {
            "db_field": 'name',
            "caption": "Name", //this can also be a 2-d array to match data that is in an array
            search: true,
            search_default: 'hi',
            sort: 'desc',
            "type": "text",
        },
        {
            "db_field": 'password',
            "caption": "password", //this can also be a 2-d array to match data that is in an array
            "show_on_list": false,
            "show_on_view": false,
            "show_on_edit": false,
            "show_on_create": true,
            "type": "password",
        },
        {
            "db_field": 'password_confirmation',
            "caption": "Password Confirmation", //this can also be a 2-d array to match data that is in an array
            "show_on_list": false,
            "show_on_view": false,
            "show_on_edit": false,
            "show_on_create": true,
            "type": "password",
        },
        {
            "db_field": 'checkbox',
            "caption": "checkbox", //this can also be a 2-d array to match data that is in an array
            "type": "checkbox",
            search: true,
            search_default: 1,
        },
        {
            "db_field": 'radio',
            "caption": "radio", //this can also be a 2-d array to match data that is in an array
            "type": "radio",
            "show_on_list": true,
            "show_on_view": false,
            "show_on_edit": false,
            "show_on_create": false,
        }


    ];
    return column_definition;
}

