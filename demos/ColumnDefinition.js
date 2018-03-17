export class ColumnDefinition {
    //the column definition defines the data, the view and controller functions
    constructor() {

    }

    allOptions() {

        var cd = [];
        cd.push(this.row_checkbox());
        cd.push(this.row_number());
        cd.push(this.select());
        cd.push(this.tree_select());
        cd.push(this.individual_select());
        cd.push(this.button());
        cd.push(this.link());
        cd.push(this.checkbox());
        cd.push(this.radio());
        cd.push(this.input());
        cd.push(this.date());
        cd.push(this.time());
        cd.push(this.datetime());
        cd = cd.concat(this.password());
        cd.push(this.textarea());
        cd = cd.concat(this.numbers());

        return cd;
    }
    adjustableColumn(){  var cd = [];
        cd.push(this.row_checkbox());
        cd.push(this.row_number());
        cd = cd.concat(this.sizes());
        cd.push(this.total());

        return cd;

    }


    total(){
        return {
            "db_field":"total",
            "type":"text",
            "caption" : "Total"
        }
    }
    //move these to a data faker class.....
    select_values() {
        let s = [
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
        return s;
    }

    tree_select_values() {
        let s = [
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
                    {
                        "name": "two_child_one", "value": "2_1", "children": [
                        {"name": "two_child_one_child_one", "value": "2_1_1"},
                        {"name": "two_child_two_child_two", "value": "2_1_2"},
                    ]
                    },
                    {"name": "two_child_two", "value": "2_2"}
                ]
            }

        ]

        return s;
    }

    button() {
        return {
            "db_field": "button",
            "type": "button",
            "button_caption": "button",
            "th_width": 100,
            "caption": "Button",

        };
    }

    link() {
        return {
            "db_field": "link",
            "type": "link",
            "caption": "Link",
            "default_value": 'link',
            "editable": false,
            "search": true,
            "search_default": "",


        };
    }

    checkbox() {
        return {
            "db_field": "checkbox",
            "type": "checkbox",
            "caption": "Checkbox",
            "default_value": 1,
            "search": true,
            "search_default": "",

        };
    }

    radio() {
        return {
            "db_field": "radio",
            "type": "radio",
            "caption": "Radio",
        };
    }

    input() {
        return {
            "db_field": "input",
            "type": "text",
            "caption": "Text Input",
            "placeholder": "",
            "search": true,
            "search_default": "",
        };
    }
    sizes(){
        return [ {
            "db_field": "sizes",
            "caption": [["XS", "S", "M", "L", ""], ["40", "42", "44", "46", ""], ["1", "2", "3", "4", "5"]],
            //caption should be json or decoded json
            "type": "number",
            "array": true,
            "default_value": '1',
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": true,
            "th_width": '10px',
            "td_tags": "",
            "class": "",
            "events": [{"keyup": "updateQuantity"}],
            "search": "LIKE ANY BETWEEN EXACT",
            "properties": [],
            "word_wrap": true
        },
            {
                "db_field": "qty",
                "caption": "Quantity",
                "type": "text",
                "array": false,
                "default_value": '',
                "show_on_list": true,
                "show_on_view": true,
                "show_on_edit": true,
                "show_on_create": true,
                "th_width": '',
                "td_tags": "",
                "class": "",
                "events": [],
                "search": "LIKE ANY BETWEEN EXACT",
                "properties": [{"readOnly": true}],
                "total": 2,
                "round": 2,
                "word_wrap": true
            },];
    }

    date() {
        return {
            "db_field": "date",
            "type": "date",
            "caption": "Date",
            "placeholder": "YYYY-MM-DD",
            "search": true,
            "search_default": "",

        };
    }

    time() {
        return {
            "db_field": "time",
            "type": "text",
            "caption": "Time",
            "placeholder": "HH:MM:SS 24 hour or 12 hour with PM",
            "search": true,
            "search_default": "",
        };
    }

    datetime() {
        return {
            "db_field": "date_time",
            "type": "text",
            "caption": "Date Time",
            "placeholder": "YYYY-MM-DD HH:MM",
            "search": true,
            "search_default": "",
        };
    }

    password() {
        return [{
            "db_field": "password",
            "type": "password",
            "caption": "Password",
            "show_on_edit": false,
            "show_on_list": false,
            "show_on_view": false,
            "show_on_create": true,


        }, {
            "db_field": "password_confirmation",
            "type": "password",
            "caption": "Password Confirmation",
            "show_on_edit": false,
            "show_on_list": false,
            "show_on_view": false,
            "show_on_create": true,

        }
        ]

    }
    textarea(){
        return             {
            "db_field": "textarea",
            "type": "textarea",
            "caption": "Textarea",
            "search": true,
            "search_default": "",

        };
    }
    numbers(){
        return [{
            "db_field": "number",
            "type": "number",
            "caption": "Number",
            "search": true,
            "search_default": "",
        },
            {
                "db_field": "number_round_2",
                "type": "number",
                "caption": "Number Rounded 2 Places",
                "default_value": 10,
                "round": 2,
                "total": 2,
                "search": true,
                "search_default": "",

            },
            {
                "db_field": "number_round_0",
                "type": "number",
                "caption": "Number Rounded 0 Places",
                "default_value": 20,
                "round": 0,
                "total": 0,
                "search": true,
                "search_default": "",

            }]
    }


    row_number() {
        return {
            "type": "row_checkbox",
            "db_field": "row_checkbox",
        }
    }

    row_checkbox() {
        return {
            "type": "row_number",
            "db_field": "row_number",
            "caption": "row",
        };

    }

    select() {

        return {
            "db_field": "select",
            "type": "select",
            "select_values": this.select_values(),
            "caption": "select",
            "default_value": false,
            "search": true,
            "search_default": "",

        };

    }

    tree_select() {
        let obj = {
            "db_field": "tree_select",
            "type": "tree_select",
            "select_values": this.tree_select_values(),
            "caption": "Tree Select",
            "default_value": 1,
            "search": true,
            "search_default": "",
        }
        return obj;
    }

    individual_select() {
        let obj = {
            "db_field": "individual_select",
            "type": "select",
            "select_values": this.select_values(),
            "individual_select_options": true,
            "caption": "Individual Select",
            "search": true,
            "search_default": "",

        };
        return obj;
    }

}

