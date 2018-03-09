/**
 * Created by embrasse-moi on 1/31/17.
 */
export class TableController {
    constructor(model){
        this.model = model;

        //i need to get the value of an element....
    }
    findElement(element) {
        let arr = this.view.elements_array;
        let col;
        let row;
        let tmpArr = arr.find(function(subArr){
            col = subArr.indexOf(element);
            return col > -1;
        });
        row = arr.indexOf(tmpArr);
        return [row, col];
    }

    getElementRow(element){
        //the element is named element_r0c0 etc, so pull out the int between r and c
        let rc = element.name.substring('element_'.length);
        let row = parseInt(rc.substr(rc.indexOf('r')+1,rc.indexOf('c')-1));
        return row;

    }
    getElementColumn(element)
    {
        let rc = element.name.substring('element_'.length);
        let col = rc.substr(rc.indexOf('c') +1 ,rc.length);
        return col;
    }
    copyElementValueToModel(element, col_def, r, array = false)
    {
        if(this.view.checkWrite())
        {

            if (col_def['type'] == 'row_checkbox'
                || col_def['type'] == 'checkbox'
                || col_def['type'] == 'radio') {
                let val = 0;
                if(element.checked){
                    val = 1;
                }
                if(array === false)
                {
                    this.model.tdo[r][col_def['db_field']]['data'] = val;
                }
                else
                {
                    this.model.tdo[r][col_def['db_field']]['data'][array] = val;
                }

            }
            else if (col_def['type'] == 'text'
                || col_def['type'] == 'number'
                || col_def['type'] == 'password'
                || col_def['type'] == 'select'
                || col_def['type'] == 'tree_select'
                || col_def['type'] == 'textarea'
                || col_def['type'] == 'date'
            ){
                if(array === false)
                {
                    this.model.tdo[r][col_def['db_field']]['data'] = element.value;
                }
                else
                {
                    this.model.tdo[r][col_def['db_field']]['data'][array] = element.value;
                }
            }
            else {
                //do nothing
            }
        }

    }
    getPostData() {
        let postData = [];
        this.model.tdo.forEach((row,r) => {
            postData[r] = {};
            this.model.cdo.forEach((col,c) => {
                if (typeof col['post'] !== 'undefined' && ! col['post']) {
                    //post no
                }
                else {

                    postData[r][col['db_field']] = row[col['db_field']]['data'];
                }
            });
        });
        return postData;
    }



}