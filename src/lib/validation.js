/**
 * Created by embrasse-moi on 1/20/17.
 */
export function validateMYSQLInsertForm()
{
    //there needs to be an array passed to this function that tells us what values are acceptable
    // ex: can't be empty, has to be a date, has to be a number, has to be selected, can't be false, has to be unique (need to check the dbase)
    errors = '';

    for (i=0; i<json_table_def.length;i++)
    {
        if (typeof json_table_def[i]['db_field'] !== 'undefined')
        {
            if (typeof json_table_def[i]['validate'] !== 'undefined')
            {
                if (typeof json_table_def[i]['validate']['unique_group'] !== 'undefined')
                {
                    //probably create the sql here
                    //array('unique_group' => array('style_number', 'pos_manufacturer_brand_id'),
                    sql = "SELECT * ";
                    sql += " FROM " + json_table_def[i]['db_table'];
                    sql += " WHERE ";

                    sql_array = [];
                    for (vi=0;vi<json_table_def[i]['validate']['unique_group'].length;vi++)
                    {
                        //now find the value for the unique field
                        if (typeof document.getElementsByName(json_table_def[i]['validate']['unique_group'][vi])[0] !== 'undefined')
                        {
                            sql_array[vi] = json_table_def[i]['validate']['unique_group'][vi] + "='" + addslashes(document.getElementsByName(json_table_def[i]['validate']['unique_group'][vi])[0].value) + "'";
                        }
                        /*for(vii=0; vii< json_table_def.length;vii++)
                         {
                         if(json_table_def[vii]['db_field']==json_table_def[i]['validate']['unique_group'][vi])
                         {
                         //this matches the unique group field
                         //need to escape

                         sql_array[vi] = json_table_def[i]['validate']['unique_group'][vi] + "='" + addslashes(document.getElementsByName(json_table_def[i]['validate']['unique_group'][vi])[0].value) + "'";
                         }
                         }*/
                    }
                    sql += sql_array.join(' AND ');
                    //get the name and value of the id
                    if (typeof  json_table_def[i]['validate']['id'] !== 'undefined')
                    {
                        for (var prop in json_table_def[i]['validate']['id'])
                        {
                            id_name = prop;
                        }
                        sql += " AND " + id_name +"!='" + json_table_def[i]['validate']['id'][id_name] + "'";

                    }
                    //alert(sql);
                    var get_string = {'sql':encodeURI(sql)};
                    //alert(encodeURI(sql));
                    $.ajaxSetup({async: false});
                    $.get("../../includes/php/ajax_check_unique_sql.php", get_string,
                        function(response) {
                            //alert(response);
                            if(response == 'exists')
                            {
                                errors += json_table_def[i]['db_field'] + ' ' + document.getElementsByName(json_table_def[i]['db_field'])[0].value + ' already exists - please create a unique value' + newline();
                                //set focus to the offender
                                document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                            }
                            else if (response == 'does not exist')
                            {
                            }
                            else
                            {
                                console.log(get_string);
                                alert("error in unique_group validation response: " + response);

                            }
                        });

                    /*				var post_string = {};
                     post_string['sql'] = sql;
                     var url = POS_ENGINE_URL + '/includes/php/ajax_check_unique_sql.php';
                     $.ajax({
                     type: 'POST',
                     url: url,
                     data: post_string,
                     async: false,
                     success: 	function(response)
                     {
                     alert(response + '2');
                     if(response == 'exists')
                     {
                     errors += json_table_def[i]['db_field'] + ' ' + document.getElementsByName(json_table_def[i]['db_field'])[0].value + ' already exists - please create a unique value' + newline();
                     //set focus to the offender
                     document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                     }
                     else if (response == 'does not exist')
                     {
                     }
                     else
                     {
                     console.log(get_string);
                     alert("error in unique_group validation response: " + response);

                     }
                     }
                     });	*/




                }
                if (typeof json_table_def[i]['validate']['unique'] !== 'undefined')
                {
                    //alert(json_table_def[i]['db_table'] + ' ' +json_table_def[i]['db_field'] + ' ' + document.getElementsByName(json_table_def[i]['db_field'])[0].value);

                    var get_string = {'table':json_table_def[i]['db_table'],'field' : json_table_def[i]['db_field'],'value': document.getElementsByName(json_table_def[i]['db_field'])[0].value};

                    if (typeof json_table_def[i]['validate']['id'] !== 'undefined')
                    {
                        for (var prop in json_table_def[i]['validate']['id']){id_name = prop;}
                        get_string['id_name'] = id_name;
                        get_string['id'] = json_table_def[i]['validate']['id'][id_name];
                    }
                    $.ajaxSetup({async: false});
                    $.get("../../includes/php/ajax_check_unique_table_field_value.php", get_string,
                        function(response) {
                            //alert(response);
                            if(response == 'exists')
                            {
                                errors += json_table_def[i]['db_field'] + ' ' + document.getElementsByName(json_table_def[i]['db_field'])[0].value + ' already exists - please create a unique value' + newline();
                                //set focus to the offender
                                document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                            }
                            else if (response == 'does not exist')
                            {
                            }
                            else
                            {
                                console.log(get_string);
                                alert("error in unique response: " + response);

                            }
                        });
                }
                if (typeof json_table_def[i]['validate']['min_length'] !== 'undefined')
                {
                    if(document.getElementsByName(json_table_def[i]['db_field'])[0].value.length < json_table_def[i]['validate']['min_length'])
                    {
                        errors += json_table_def[i]['db_field'] +' needs a minumum length of ' + json_table_def[i]['validate']['min_length'] + ' charaters' + newline();
                        document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                    }
                }
                if (typeof json_table_def[i]['validate']['select_value'] !== 'undefined')
                {
                    if(document.getElementsByName(json_table_def[i]['db_field'])[0].value == json_table_def[i]['validate']['select_value'])
                    {
                        errors += 'You must select a value from the drop down' + newline();
                        document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                    }
                }
                if (typeof json_table_def[i]['validate']['dynamic_table_not_zero'] !== 'undefined')
                {

                    //this is for the dynamic table only
                    var elems = document.getElementsByName(json_table_def[i]['db_field']+'[]');
                    console.log(elems);
                    for(el=0;el<elems.length;el++)
                    {
                        if(document.getElementsByName(json_table_def[i]['db_field']+'[]')[el].value == '' ||
                            round2(document.getElementsByName(json_table_def[i]['db_field']+'[]')[el].value,0) == 0)
                        {
                            errors += 'Unacceptable Zero or Empty Value in Row ' + (el+1) + newline();
                        }

                    }

                }
                if (typeof json_table_def[i]['validate']['multi_select_value'] !== 'undefined')
                {
                    var selectedArray = new Array();
                    var selObj = document.getElementById(json_table_def[i]['db_field']+'[]');
                    var mi;
                    var count = 0;
                    var selected = false;
                    for (mi=0; mi<selObj.options.length; mi++)
                    {

                        if (selObj.options[mi].selected)
                        {
                            selectedArray[count] = selObj.options[mi].value;
                            if (selectedArray[count] == 'false')
                            {
                                errors += 'Error in Multi-Select value ' + newline();
                                document.getElementById(json_table_def[i]['db_field']+'[]').focus();
                            }
                            else
                            {
                                selected = true;
                            }
                            count++;
                        }
                    }
                    if (selected == false)
                    {
                        errors += 'Must Select a value from the multi-select ' + newline();
                        document.getElementById(json_table_def[i]['db_field']+'[]').focus();
                    }

                }
                if ( json_table_def[i]['validate'] == 'number')
                {
                    //check if it is a valid number
                    if (isNaN(document.getElementsByName(json_table_def[i]['db_field'])[0].value))
                    {
                        errors += json_table_def[i]['db_field'] +' needs to be a value.' + newline();
                        document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                    }
                    /*if (document.getElementsByName(json_table_def[i]['db_field'])[0].value == '')
                     {
                     errors += json_table_def[i]['db_field'] +' can\'t be empty.' + newline();
                     document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                     }*/
                }
                if ( json_table_def[i]['validate'] == 'date')
                {
                    if (!isDate(trim(document.getElementsByName(json_table_def[i]['db_field'])[0].value)) && document.getElementsByName(json_table_def[i]['db_field'])[0].value !='')
                    {
                        errors += json_table_def[i]['db_field'] +' needs to be a date in YYYY-MM-DD format.' + newline();
                        //document.getElementsByName(json_table_def[i]['db_field'])[0].focus();
                    }
                }
            }
        }
    }
    if (errors == '')
    {
        needToConfirm=false;
        //disable the submit button: (id'd as submit)
        if(document.getElementById('submit'))
        {
            document.getElementById('submit').disabled = true;
            //create hidden post value
            str_hidden_name = "submit";
            str_hidden_value = "submit";
            //creating the hidden elements for POST
            element = document.createElement("input");
            element.type = "hidden";
            element.name = str_hidden_name;
            element.value = str_hidden_value;
            document.getElementById(formId).appendChild(element);
        }
        else
        {
        }
        /*else if(typeof document.getElementsByName('submit')[0] !== 'undefined')
         {

         document.getElementsByName('submit')[0].disabled = true;

         }*/
        return true;
    }
    else
    {
        alert(errors);
        needToConfirm=true;
        return false;
    }
}
export function validateDynamicTable()
{
    //this should be the same function as above, but check each row....
    errors = '';

    for (i=0; i<json_table_def.length;i++)
    {
        if (typeof json_table_def[i]['db_field'] !== 'undefined')
        {
            if (typeof json_table_def[i]['validate'] !== 'undefined')
            {
                // go through each row
                var elements = document.getElementsByName(json_table_def[i]['db_field']+'[]');
                for(el=0;el<elements.length;el++)
                {
                    if (typeof json_table_def[i]['validate']['not_blank_or_zero_or_false_or_null'] !== 'undefined')
                    {
                        if(elements[el].value == '' ||
                            round2(elements[el].value,0) == 0 || elements[el].value == 'false' || elements[el].value == 'NULL')
                        {
                            errors += 'Bad Value For ' +json_table_def[i]['caption'] + ' Row ' + (el+1) + newline();
                        }
                    }
                    else if  (typeof json_table_def[i]['validate']['acceptable_values'] !== 'undefined')
                    {
                        acceptable_values = json_table_def[i]['validate']['acceptable_values'][0];
                        if(acceptable_value == 'number')
                        {
                            if (isNaN(elements[el].value))
                            {
                                errors += json_table_def[i]['db_field'] +' needs to be a value.' + newline();
                                elements[el].focus();
                            }
                        }
                        else if(acceptable_values == 'text')
                        {
                        }
                        else if(acceptable_values == 'specific')
                        {
                        }
                    }
                }
            }
        }
    }
    if (errors == '')
    {
        needToConfirm=false;
        //disable the submit button: (id'd as submit)
        if(document.getElementById('submit'))
        {
            document.getElementById('submit').disabled = true;
            //create hidden post value
            str_hidden_name = "submit";
            str_hidden_value = "submit";
            //creating the hidden elements for POST
            element = document.createElement("input");
            element.type = "hidden";
            element.name = str_hidden_name;
            element.value = str_hidden_value;
            document.getElementById(formId).appendChild(element);
        }
        else
        {
        }
        /*else if(typeof document.getElementsByName('submit')[0] !== 'undefined')
         {

         document.getElementsByName('submit')[0].disabled = true;

         }*/
        return true;
    }
    else
    {
        alert(errors);
        needToConfirm=true;
        return false;
    }

}
export function checkInput(objName,validInput)
{

    //Function will check input against the valid input.... use to check for numeric, currency, miles, letters

    // originally created to watch for cup sizes.....

    // First conver to uppercase
    objName.value=objName.value.toUpperCase();
    //get the last charachter entered and evaulate it....
    ch = objName.value.slice(objName.value.length -1, objName.value.length);
    //alert(ch);
    charOK = "false";
    //if the characther matches the cupSizes, then allow it. Otherwise ignore it all
    for (j = 0;  j < validInput.length;  j++)
    {

        if (ch == validInput.charAt(j))
        {
            //charachter is ok, do nothing
            charOK = "true";
        }

    }
    // check if we found an OK match, otherwise erase it
    if (charOK != "true")
    {
        //erase the incoming value
        objName.value = objName.value.slice(0, objName.value.length-1);
    }


}
export function checkInput2(objName,validInput)
{

    //Function will check input against the valid input.... use to check for numeric, currency, miles, letters

    //get the last charachter entered and evaulate it....
    ch = objName.value.slice(objName.value.length -1, objName.value.length);
    //alert(ch);
    charOK = "false";
    //if the characther matches the cupSizes, then allow it. Otherwise ignore it all
    for (j = 0;  j < validInput.length;  j++)
    {

        if (ch == validInput.charAt(j))
        {
            //charachter is ok, do nothing
            charOK = "true";
        }

    }
    // check if we found an OK match, otherwise erase it
    if (charOK != "true")
    {
        //erase the incoming value
        objName.value = objName.value.slice(0, objName.value.length-1);
    }


}