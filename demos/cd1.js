export default function(component){
    //the column definition defines the data, the view and controller functions

    let column_definition = [
        {
            "db_field": "id",
            "caption": "Id",
            "type": "link",
            "onClick":  function(id){
                return id;
            },
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
        }, {
            "db_field": "name",
            "caption": "Name",
            "type": "text",
            "show_on_list": true,
            "show_on_view": true,
            "show_on_edit": true,
            "show_on_create": true,
            "th_width": "150px",
            "td_tags": "",
            "class": "",
            "events": [],
            "search": "LIKE",
            "search_default": "",
            "properties": [],
            "word_wrap": true,
            "post": true
        },
        ];
    return column_definition;
}