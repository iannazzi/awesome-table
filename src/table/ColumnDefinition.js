export class ColumnDefinition {
    //the column definition defines the data, the view and controller functions
    constructor(awesomeTable) {
        this.awesomeTable=awesomeTable;
    }
    cd() {
        let cd = {
            "db_field": 'replace',
            "caption": "replace", //this can also be a 2-d array to match data that is in an array
            "type": "id html date time password text number textarea row_checkbox row_number checkbox select tree_select button link radio",
            'min': 1,   //add a minimum value
            'max': '2018-01-12', //add a maximum value for the browser to handle
            'readonly': true,
            'select_values': this.select_values(), //or this.tree_select_values();
            'individual_select_options':true, //in a collection table this will limit the choices
            button_caption: 'only for a button',
            'default_value': 'default value is set',
            "show_on_list": true,  //true or ommitted, false
            "show_on_view": true, //true or ommitted, false
            "show_on_create": true, //true or ommitted, false
            "show_on_edit": true, //true or ommitted, false
            "th_width": 10,
            "search": "LIKE ANY BETWEEN EXACT",
            search_default : "",
            "total": 0,
            "round": 0,
            "events": [],
            "properties": [],
            'word_wrap': true,
            'post': true
        };
        return cd;
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

    purchaseOrder(updateQuantity, updateTotal) {
        var cd = [];
        cd.push(this.row_checkbox());
        cd.push(this.row_number());
        cd.push(this.style());
        cd = cd.concat(this.sizes(updateQuantity));
        cd.push(this.cost(updateTotal));
        cd.push(this.total());
        return cd;

    }

    //select formats
    select_values(){
        return [
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

    }



    style() {
        return {
            "db_field": "style",
            "type": "text",
            'default_value': 'default value',
            "caption": "Style",
            "width": "100px"
        }
    }

    cost(updateTotal) {
        let self = this;

        let updateRow = function (event, custom_parameters) {
            let r = self.awesomeTable.getRow(event.srcElement);
            console.log(custom_parameters);
            updateTotal(r);
        }
        return {
            "db_field": "cost",
            "type": "number",
            "caption": "Cost",
            "width": '100px',
            "events": {
                "change": updateRow,
                "keyup": updateRow,
                "click": updateRow,
            }
        }
    }

    total() {
        let self = this;
        let getTotal = function(){
            let total_sum = self.awesomeTable.model.sumColumn('total');
            return total_sum
        }
        let getTax = function(){
            return 0.08 * getTotal();
        }


        return {
            "db_field": "total",
            "type": "text",
            "properties": [{"readOnly": true}],
            "caption": "Total",
            "width": '100px',
            "footer": [
                {
                    caption: 'Subtotal',
                    round:2,
                    getValue: function () {
                        return getTotal();
                    }
                },
                {
                    caption: 'Tax',
                    round:2,
                    getValue: function () {
                        return getTax()
                    }
                },
                {
                    caption: 'Total',
                    round:2,
                    getValue: function () {
                        return  getTotal() + getTax();
                    }
                },

            ],
            "total": 2,
            "round": 2,
        }
    }

    sizes(updateQuantity) {

        let updateRow = function (event,custom_parameters) {
            //we want to update values only if we are changing something that adjusts totals,
            //otherwise I would need to call calculate blindly on all input...
            updateQuantity(custom_parameters.r)
        }
        let self = this;

        return [{
            db_field: "sizes",
            caption: [["XS", "S", "M", "L", ""], ["40", "42", "44", "46", ""], ["1", "2", "3", "4", "5"]],
            min: 0,
            //'max':5,
            type: "number",
            "default_value": '',
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": true,
            width: '50px',
            "class": "",
            "events": {
                "keyup": updateRow,
                "click": updateRow,
                "change": updateRow,
            },
            "properties": [],
            "word_wrap": true
        },
            {
                "db_field": "qty",
                "caption": "Quantity",
                "type": "text",
                "default_value": '',
                footer:[
                    {   caption: 'Total Quantity',
                        round:0,
                        getValue: function(){
                        return self .awesomeTable.model.sumColumn('qty')
                    }}
                ],
                "width": '100px',
                "td_tags": "",
                "class": "",
                "events": [],
                "search": "LIKE ANY BETWEEN EXACT",
                "properties": [{"readOnly": true}],
                "total": 0,
                "round": 0,
                "word_wrap": true
            },];
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

    textarea() {
        return {
            "db_field": "textarea",
            "type": "textarea",
            "caption": "Textarea",
            "search": true,
            "search_default": "",

        };
    }

    numbers() {
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
            "type": "row_number",
            "db_field": "row_number",
            "caption": "Row",
            width: "100px"
        };
    }

    row_checkbox() {

        return {
            type: "row_checkbox",
            db_field: "row_checkbox",
            width: "100px"

        }

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

