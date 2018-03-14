/**
 * Created by embrasse-moi on 1/24/17.
 */

export default class TableDefinition {
    tree_select(){
        let select_values = [
            {
                'value': 1,
                'name': 'liliana'
            },
            {
                'value': 2,
                'name': 'two'
            }, {
                'value': 3,
                'name': 'three'
            }, {
                'value': 4,
                'name': 'four'
            }, {
                'value': 5,
                'name': 'five'
            }, {
                'value': 6,
                'name': 'six'
            }, {
                'value': 7,
                'name': 'seven'
            }, {
                'value': 8,
                'name': 'eight'
            }, {
                'value': 9,
                'name': 'nine'
            },
        ]
        let tree_select = [
            {
                "name": "one",
                "value": "1",
                "children": [
                    {"name": "one_child_one", "value": "1_1"},
                    {"name": "one_child_two", "value": "1_2"},
                ]
            },
            {
                "name": "two",
                "value": "2",
                "children": [
                    {"name": "two_child_one", "value": "2_1"},
                    {"name": "two_child_two", "value": "2_2"}
                ]
            }

        ]
    }
    td() {
        let td = {
            "name": "name",
            "access": "READ WRITE",
            "buttons": ['addRow','deleteRow','deleteAllRows', 'moveRows','copyRows', 'addColumn', 'deleteColumn', 'edit'],
            "table_view": "index show create edit",
            "route": "vendors  routes: vendor post is search, vendor put vendor patch vendor delete ",
            "footer": [],
            "header": [],
            "column_definition": this.cd()
        };
        return td;
    }

    cd() {
        let td = {
            "db_field": 'replace',
            "caption": "replace",
            "type": "html date time password text number textarea row_checkbox row_number checkbox select tree_select button link radio",
            "route": "needed for link",
            'array': "true or not set caption has to then be set in 2d array [[]]",
            'default_value': 'default value is set',
            "show_on_list": true,  //true or ommitted, false
            "show_on_view": true, //true or ommitted, false
            "show_on_create": true, //true or ommitted, false
            "show_on_edit": true, //true or ommitted, false

            "th_width": 10,
            "td_tags": '',
            "class": '',
            "events": [],
            "search": "LIKE ANY BETWEEN EXACT",
            "search_default" : "",
            "properties": [],
            "total": 0,
            "round": 0,
            'word_wrap': true,
            'post': true
        };
        return td;
    }

}