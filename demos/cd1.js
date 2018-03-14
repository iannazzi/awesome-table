export default function(component){
    //the column definition defines the data, the view and controller functions
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
                {"name": "two_child_one", "value": "2_1",  "children": [
                    {"name": "two_child_one_child_one", "value": "2_1_1"},
                    {"name": "two_child_two_child_two", "value": "2_1_2"},
                ]},
                {"name": "two_child_two", "value": "2_2"}
            ]
        }

    ]
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

    let column_definition = [
        {
            "type": "row_number",
        },
        {
            "type": "row_checkbox",
        },
        {
            "type": "select",
            "select_values" : select_values
        },
        {
            "type": "tree_select",
            "select_values" : tree_select
        },
        {
            "type": "button",
        },
        {
            "type": "link",
        },
        {
            "type": "checkbox",
        },
        {
            "type": "radio",
        },
        {
            "type": "date",
        },
        {
            "type": "password",
        },
        {
            "type": "textarea",
        },
        {
            "type": "number",
        },
        ];
    return column_definition;
}