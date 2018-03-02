export function createTableCell(name, td_def)
{			
		var cell=document.createElement('td');
		if(td_def['type'] == 'date')
		{
			var element = document.createElement('input');
			element.name = name;
			element.id = name;				
			cell.appendChild(element);
				
			$('#' + element.id).datepicker(					
			{
				dateFormat: 'yy-mm-dd',
				onSelect: function () 
				{
					$(this).focus();
				},
				onClose: function (dateText, inst) 
				{
					$(this).select();
				}
			});
			
		}
		else if(td_def['type'] == 'checkbox')
		{

			
			element = document.createElement('input');
			element.type = 'checkbox';
			element.name = name;
			element.id = name;
			/*if(this.tdo[r][td_def['db_field']]['data'] == 1)
			{
				element.checked = true;
			}*/
			cell.appendChild(element);		
			
			
			
		}
		else if (td_def['type'] == 'select')
		{
			element = document.createElement('select');
			element.name = name;
			element.id = name;
			var option = document.createElement('option');
			option.value = 'NULL';
			option.appendChild(document.createTextNode("Select..."));
			element.appendChild(option);
			for (var j in td_def['select_names'])
			{
				option = document.createElement('option');
				option.value = td_def['select_values'][j];
				option.appendChild(document.createTextNode(td_def['select_names'][j]));
				element.appendChild(option);
			}
			cell.appendChild(element);
		}
		else if (td_def['type'] == 'tree_select')
		{
			element = document.createElement('select');
			element.id = name;
			element.name = name;
			
			
			var option = document.createElement('option');
			option.value = 'NULL';
			option.appendChild(document.createTextNode("Select..."));
			element.appendChild(option);
			var level = 0;
			//console.log(td_def['select_values']);
			this.addNestedSelectOptions(element, td_def['select_values'], level);
			



			if (typeof td_def['properties'] !== 'undefined')
			{
				for (var index in td_def['properties'])
				{
					eval('element.' + index + '= ' + td_def['properties'][index] + ';');
					
				}
			}
			cell.appendChild(element);
		}				
		else if (td_def['type'] == 'input')
		{
			element = document.createElement('input');
			element.type = 'text';
			element.id = name;
			element.name = name;
			cell.appendChild(element);
			
			
			
			if(typeof td_def['autoComplete'] != 'undefined')
			{
				
				//console.log('attempting Autocomplete');
							//is the auto complete open?
			/*$("#" + id ).bind('autocompleteopen', function(event, ui) 
			{
				$(this).data('is_open',true);
			});

			$("#" + id ).bind('autocompleteclose', function(event, ui) 
			{
				$(this).data('is_open',false);
			});*/	
			/*$( "#" + id ).bind( "keydown", function( event ) 
			{
				//what is this for ?
				if ( event.keyCode === $.ui.keyCode.TAB && $(this).data('is_open') ) 
				{
					event.preventDefault();
				}
				if ( event.keyCode === $.ui.keyCode.ENTER  && !$(this).data('is_open')) 
				{
					//do what?
				}
			});*/
				$( element).autocomplete({
					source: function( request, response ) 
					{
					 $.ajax(
					 {
							url: td_def['autoComplete']['url'],
							type: 'GET',
							async: true,
							data: 
							{
								ajax_request: td_def['autoComplete']['ajax_request'],
								featureClass: "P",
								style: "full",
								maxRows: 12,
								search_terms: request.term
							},
							success: function( data ) 
							{
								console.log(data);
								parsed_autocomplete_data = parseJSONdata(data);
								response( parsed_autocomplete_data);
							}
						});
					},
					search: function() 
					{
						// custom minLength
						var term = this.value;
						//console.log(term);
						if(typeof td_def['minLength'] != 'undefined')
						{
							var minL =   td_def['minLength'];
						}
						else
						{
							var minL =  1;
						}
						if ( term.length < minL ) 
						{
							return false;
						}
					},
					focus: function() 
					{
					// prevent value inserted on focus
						return false;
					},
					open: function(event, ui)
					{
						var dialog = $(this).closest('.ui-dialog');
						if(dialog.length > 0){
							$('.ui-autocomplete.ui-front').zIndex(dialog.zIndex()+1);
						}
					},
					select: function( event, ui ) 
					{
						selected_autocomplete_index = $.inArray(ui.item.value, parsed_autocomplete_data);
					}
				});
			}
			
			
			
		}
		else if (td_def['type'] == 'textarea')
		{
			element = document.createElement('TEXTAREA');
			element.id = name;
			element.name = name;
			cell.appendChild(element);
			
		}
		else if (td_def['type'] == 'td')
		{
			
			cell.innerHTML = 'TBD';
			cell.name = name;
			cell.id = name;	
			
		}
		else
		{
			alert(td_def['type'] + ' have not coded that.....');
		}
		
		return cell;
		
		function addNestedSelectOptions(element, category_array, level)
		{
			for (var key in category_array)
			{
				option = document.createElement('option');
				option.value = key;
				name = category_array[key]['name'];
		
		
				for(i=0;i<level;i++)
				{
					name = "\u00A0" + name;
					name =  "\u00A0" + name;
				}
				option.appendChild(document.createTextNode(name));
				element.appendChild(option);
				if(!$.isEmptyObject(category_array[key]['children']))
				{
					addNestedSelectOptions(element, category_array[key]['children'], level+1);
				}
			}
		}
			
}
export function changeRowAndColumnWithArrow(e, control, tBodyId)
{
		//get rid of the return
		
		//this.tBodyId = 'poc_tbody';
		var tBody = document.getElementById(tBodyId);
		var tBodyRowCount = tBody.rows.length;
		//get the number of columns
		var colCount = tBody.parentNode.rows[0].cells.length;
		//var tHead = document.getElementById('poc_thead');
		//var theadRowCount = tHead.rows.length;
		
		rowCount = tBodyRowCount;
	
		var col = control.parentNode.cellIndex;
		var tmp_row =  control.parentNode.parentNode.rowIndex;
		
		//var new_row = parseInt(tmp_row) - parseInt(theadRowCount);
		var new_row = parseInt(tmp_row) -1;
		var final_col = col;
		var final_row = new_row;
		//alert("in arrows" + e.keyCode);
		//alert ("Row count: " + rowCount);
		//alert ("Header Count: " + theadRowCount);
		//alert ("Current row: " + new_row);
		
		//depending on the arrow key  we just need to set focus
		 if (!e) e=window.event;
		 //alert(e.keyCode);
		  switch(e.keyCode)
		  {
		  case 37:
			// Key left.
			if (col-1 >= 0)
			{
				final_col = col - 1;
			}
	
			break;
		  case 38:
			// Key up.
			if (new_row-1 >= 0)
			{
				final_row = new_row - 1;
			}
			break;
		  case 39:
			// Key right.
			if (col+1 < colCount)
			{
				final_col = col + 1;
			}
			break;
		  case 40:
			// Key down.
			if (new_row+1 < rowCount)
			{
				final_row = new_row + 1;
			}
			break;
		  }
		  document.getElementById(tBodyId).rows[final_row].cells[final_col].childNodes[0].focus();
		  //document.getElementById(this.tBodyId).rows[final_row].cells[final_col].childNodes[0].select();
		 return noEnter(e);
	}
export function clearSelect(selectID)
{
	element = document.getElementById(selectID);
	alert(element.value);	
	if( element.options != 'null')
	{
		element.options.length = 0;
	}
}
export function moveArrayRow(tableData, RowToMove, RowToMoveTo)
{
	//ex row 2 row 3
	newTable = new Array();
	newTableObject = {};
	for (i=0;i<tableData.length;i++)
	{
		newTable[i] = new Array();
		for(j=0;j<tableData[0].length;j++)
		{
			if (RowToMove == i)
			{
				newTable[i][j] = tableData[RowToMoveTo][j];
			}
			else if (RowToMoveTo == i)
			{
				newTable[i][j] = tableData[RowToMove][j];
			}
			else
			{
				newTable[i][j] = tableData[i][j];
			}
		}
	}
	return newTable;
}
export function deleteArrayRows(array,rows)
{
	var newRowCounter = 0;
	var newArray = [];
	for (var i = 0;i<array.length;i++)
	{
		bln_delete = false;
		for(var r = 0;r<rows.length;r++)
		{
			if(i == rows[r])
			{
				//delete
				bln_delete = true;
			}
		}
		//transfer original if bln_delete is false
		if (!bln_delete)
		{
			newArray[newRowCounter] = array[i];
			newRowCounter++;
		}
	}
	return newArray;
}
export function getCurrentColumn(control)
{
	return control.parentNode.cellIndex;
}
export function getCurrentRow(control)
{
	//need to back the number of thead rows off in order to get the "correct" tbody row index starting at 0
	var thead = getCellTHead(control);
	var theadRowCount = thead.rows.length;
	return  control.parentNode.parentNode.rowIndex - theadRowCount;	
}
export function getCellTHead(control)
{
	var table = getCellTable(control);
	var thead = table.tHead;
	//alert('thead:' + thead.id);
	return thead;
}
export function getCellTable(control)
{
	var table = control.parentNode.parentNode.parentNode.parentNode;
	//alert('table:' + table.id);
	return table;
}
export function getCellTFoot(control)
{
	var table = getCellTable(control);
	var tfoot = table.tFoot;
	//this is how to check if the footer is there...
	if(typeof tfoot !== 'undefined')
	{
		alert('tfoot:' + tfoot.id);
	}
	else
	{
		alert('no footer');
	}
}
export function getCellTBody(control)
{
	var tbody = control.parentNode.parentNode.parentNode;
	//alert("tbody:" + tbody.id);
	return tbody;
}
export function getCellTBodies(control)
{
	var table = getCellTable(control);
	var tBodies = table.tBodies;
	var num_tbodies = tBodies.length;
	//alert('tbodies[0]:' + tBodies[0].id);
}
export function checkValidInput(control)
{
	
	column = getTableArrayColumnNumberFromHTMLColumnNumber(getCurrentColumn(control));
	if (typeof tbody_def[column]['valid_input'] !== 'undefined')
	{
		
		validInput = tbody_def[column]['valid_input'];
		checkInput2(control,validInput);
	}
}
export function clone(obj)
{
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
export function calculateColumnTotal(tbodyID, column)
{

    var tbody = document.getElementById(tbodyID);
    var rowCount = tbody.rows.length;
    var total =0;
    for(var i = 0;i<rowCount;i++)
    {
        tmp_value = parseFloat(tbody.rows[i].cells[column].childNodes[0].value.replace(/,/g, ''));
        total=total+tmp_value;
    }
    return total;

}
export function calculateinnerHTMLColumnTotal(tbodyID, column)
{

    var tbody = document.getElementById(tbodyID);
    var rowCount = tbody.rows.length;
    var total =0;
    for(var i = 0;i<rowCount;i++)
    {
        tmp_value = parseFloat(tbody.rows[i].cells[column].innerHTML);
        total=total+tmp_value;
    }
    return total;

}