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
            "caption": "row",

        },
        {
            "type": "row_checkbox",
        },
        {
            "db_field": "select",
            "type": "select",
            "select_values" : select_values,
            "caption": "select"

        },
        {
            "db_field": "tree_select",
            "type": "tree_select",
            "select_values" : tree_select,
            "caption": "Tree Select",

        },
        {
            "db_field": "individual_select",
            "type": "individual_select",
            "select_values" : select_values,
            "caption": "Individual Select",

        },
        {
            "db_field": "button",
            "type": "button",
            "button_caption": "button",
            "th_width": 100,
            "caption": "Button",


        },
        {
            "db_field": "link",
            "type": "link",
            "caption": "Link",

        },
        {
            "db_field": "checkbox",
            "type": "checkbox",
            "caption": "Checkbox",

        },
        {
            "db_field": "radio",
            "type": "radio",
            "caption": "Radio",

        },
        {
            "db_field": "date",
            "type": "date",
            "caption": "Date",

        },
        {
            "db_field": "time",
            "type": "time",
            "caption": "Time",

        },
        {
            "db_field": "date_time",
            "type": "datetime",
            "caption": "Date Time",

        },
        {
            "db_field": "password",
            "type": "password",
            "caption": "Password",
        },
        {
            "db_field": "textarea",
            "type": "textarea",
            "caption": "Textarea",

        },
        {
            "db_field": "number",
            "type": "number",
            "caption": "Number",
        },
        {
            "db_field": "number_round_2",
            "type": "number",
            "caption": "Number Rounded 2 Places",
            "round":2,
            "total":2,

        },
        {
            "db_field": "number_round_0",
            "type": "number",
            "caption": "Number Rounded 0 Places",
            "round":0,
            "total":0,

        },
        ];
    return column_definition;
}