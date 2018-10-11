import {CollectionTableView} from './CollectionTableView'

export class SearchTableView extends CollectionTableView {
    constructor(model){
        super(model);

    }
    createSearchTable() {
        let name = this.model.td.name;
        this.searchDiv = this.createSearchDiv();
        this.searchTableElement = this.createSearchTableElement(name);
        this.searchDiv.appendChild(this.searchTableElement);
        this.searchThead = this.createSearchThead(name);
        this.searchTableElement.appendChild(this.searchThead);
        this.searchTbody = this.createSearchTbody(name);
        this.searchTableElement.appendChild(this.searchTbody);
        this.updateSearchTable();
        this.searchDiv.appendChild(this.createSearchButtons())
        this.searchDataTableDiv = this.createDataTableDiv();
        this.searchDiv.appendChild(this.searchDataTableDiv);



        return this.searchDiv;
    }
createSearchButtons(){
    let self = this;
    this.searchButtonDiv = document.createElement('div');
    this.searchButtonDiv.className = "search_buttons";
    this.searchButton = document.createElement('button');
    this.searchButton.className = 'search'
    this.searchButton.id = 'search_' + this.model.td.name

    this.searchButton.onclick = function () {
        self.searchClicked.notify();
    }
    this.searchButton.innerHTML = `<i class="fa fa-binoculars" aria-hidden="true"></i><p>Search</p>`;
    this.searchButtonDiv.appendChild(this.searchButton);
    this.searchResetButton = document.createElement('button');
    this.searchResetButton.onclick = function () {
        self.resetClicked.notify();
    }

    this.searchResetButton.innerHTML = '<p>Reset</p>';
    this.searchResetButton.className = 'reset'
    this.searchButton.id = 'reset_' + this.model.td.name

    this.searchButtonDiv.appendChild(this.searchResetButton);
    return this.searchButtonDiv;
}
    updateSearchTable() {
        this.updateSearchThead(this.searchThead);
        this.updateSearchTbody(this.searchTbody);
    }

    createSearchDiv() {
        let div = document.createElement('div');
        let self = this;
        div.addEventListener('keyup', function (event) {
            if (event.which == 13) {
                console.log('enter pressed');
                self.searchClicked.notify();
            }
        });
        return div;
    }

    createSearchTableElement(name) {

        let tbl = document.createElement('table');
        tbl.id = name + '_search';
        tbl.classList.add('awesome-search-table')
        tbl.classList.add('table')

        return tbl;
    }

    createSearchThead(name) {
        let thead = document.createElement('thead');
        thead.id = name + '_search_thead';
        return thead;
    }

    createSearchTbody(name) {
        let tbody = document.createElement('tbody');
        tbody.id = name + '_search_tbody';
        return tbody;
    }
    createDataTableDiv(){
        return document.createElement('div')
    }

    updateSearchThead(thead) {
        let tr = thead.insertRow();
        this.model.cdo.forEach(col_def => {
            if (typeof col_def['search'] !== 'undefined') {

                let th_width = '';
                if (typeof col_def['th_width'] != 'undefined') {
                    th_width = col_def['th_width'];
                }
                let caption = '';
                if (typeof col_def['caption'] != 'undefined') {
                    caption = col_def['caption'];
                }

                if (col_def['type'] == 'date') {

                    let th = document.createElement('th');
                    th.innerHTML = caption + ' Start Date';
                    th.style.width = th_width;
                    tr.appendChild(th);

                    let th2 = document.createElement('th');
                    th.style.width = th_width;
                    th2.innerHTML = caption + ' END Date';
                    tr.appendChild(th2);

                }
                else {
                    let th = document.createElement('th');
                    th.innerHTML = caption;
                    th.style.width = th_width;
                    tr.appendChild(th);
                }

            }
        })
    }

    updateSearchTbody(tbody) {
        let tr = tbody.insertRow();
        let col_counter = 0;
        this.search_elements_array = [];
        this.search_elements_by_name = {};

        this.model.cdo.forEach(col_def => {
            if (typeof col_def['search'] != 'undefined') {
                let th_width = '';
                let cell_html = '';
                let cell = tr.insertCell(col_counter);
                cell.id = "sr0" + "sc" + col_counter;
                col_counter++;
                if (col_def['type'] == 'date') {
                    let element = document.createElement('input');
                    element.type = 'date';
                    element.name = this.model.td.name + '_' + col_def['db_field'] + '_date_start';
                    cell.appendChild(element);
                    this.search_elements_array.push(element)
                    this.search_elements_by_name[col_def['db_field'] + '_date_start']=element;
                    col_def['search_element'] = [];


                    col_def['search_element'][0] = element;



                    cell = tr.insertCell(col_counter);
                    cell.id = "sr0" + "sc" + col_counter;
                    col_counter++;

                    let element2 = document.createElement('input');
                    element2.type = 'date';
                    element2.name = this.model.td.name + '_' + col_def['db_field'] + '_date_end';

                    cell.appendChild(element2);
                    this.search_elements_array.push(element2)
                    this.search_elements_by_name[col_def['db_field'] + '_date_end']=element2;

                    col_def['search_element'][1] = element2;


                }
                else if (col_def['type'] == 'checkbox') {
                    let element = document.createElement('select');
                    element.name = this.model.td.name + '_' + col_def['db_field']

                    let option = document.createElement('option');
                    option.value = 'null';
                    option.appendChild(document.createTextNode("Either"));
                    element.appendChild(option);
                    option = document.createElement('option');
                    option.value = '1';
                    option.appendChild(document.createTextNode('Checked'));
                    element.appendChild(option);
                    option = document.createElement('option');
                    option.value = '0';
                    option.appendChild(document.createTextNode('Not Checked'));
                    element.appendChild(option);
                    cell.appendChild(element);
                    this.search_elements_array.push(element);
                    this.search_elements_by_name[col_def['db_field']]=element;
                    col_def['search_element'] = element;
                }
                else if (col_def['type'] == 'select') {
                    let element = this.createSelect(col_def);
                    element.name = this.model.td.name + '_' + col_def['db_field']
                    cell.appendChild(element);
                    this.search_elements_array.push(element)
                    col_def['search_element'] = element;
                    this.search_elements_by_name[col_def['db_field']]=element;


                }
                else if (col_def['type'] == 'tree_select') {
                    let element = this.createTreeSelect(col_def);
                    element.name = this.model.td.name + '_' + col_def['db_field']
                    cell.appendChild(element);
                    this.search_elements_array.push(element)
                    this.search_elements_by_name[col_def['db_field']]=element;
                    col_def['search_element'] = element;

                }
                else {
                    let element = document.createElement('input');
                    element.type = col_def.type;
                    element.name = this.model.td.name + '_' + col_def['db_field']
                    cell.appendChild(element);
                    this.search_elements_array.push(element)
                    this.search_elements_by_name[col_def['db_field']]=element;
                    col_def['search_element'] = element;

                }
            }
        })

    }




    addMessageInsteadOfTable(message)
    {
        let div = document.createElement('div');
        div.innerHTML = message;
        this.searchDataTableDiv.innerHTML = '';
        this.searchDataTableDiv.appendChild(div);
    }
    addDataTable()
    {
        this.searchDataTableDiv.innerHTML = '';
        this.searchDataTableDiv.appendChild(this.createCollectionTable())
    }

    destroyCollectionTable(){
        this.searchDataTableDiv.innerHTML = '';
    }
    searching()
    {
        this.addMessageInsteadOfTable('searching...')

    }




}