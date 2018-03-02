/**
 * Created by embrasse-moi on 1/24/17.
 */

export default class TableDefinition {
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
            "type": " html date text number row_checkbox row_number checkbox select tree_select button link radio",
            "route": "needed for link",
            'array': "true or not set caption has to then be set in 2d array [[]]",
            'default_value': 'default value is set',
            "show_on_list": true,
            "show_on_view_edit": true,
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