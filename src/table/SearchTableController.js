import {CollectionTableController} from './CollectionTableController'
import {SearchTableEvents} from './SearchTableEvents';


export class SearchTableController extends CollectionTableController {
    constructor(model, view) {
        super(model, view)
        this.jsUri = require('jsuri');
        this.show_records_autmatically_below = 50;
        this.searchTableEvents = new SearchTableEvents(this);
    }
    getSearchFormData(){
        let url_data = {};
        this.view.search_elements_array.forEach(element => {
            url_data[element.name] = element.value;
        })
        url_data['table_name'] = this.model.td.name;
        return url_data;
    }
    getSearchPostData(){
        let post_data = {};
        post_data['search_fields'] = {};
        post_data['table_name'] = this.model.td.name;
        this.view.search_elements_array.forEach(element => {
            post_data.search_fields[element.name] = element.value;
        })
        console.log('I need controller for testing.... search post data');
        console.log(JSON.stringify(post_data))
        return post_data;
    }
    onSearchReturned(data){
        // console.log(data)
        let ret_data = data.data;
        this.number_of_records_available = ret_data.length;
        this.model.loadData(ret_data)
        this.loadInitialData();
    }
    loadInitialData() {


        //bad bad bad function, really confusing. abort..
        if (this.number_of_records_available > 0 && this.model.tdo.length == 0) {
            //if there are only a small amount of records go ahead and grab those....
            if (this.number_of_records_available < this.show_records_autmatically_below) {
                this.view.searchClicked.notify()
            }
            else {

                this.view.addMessageInsteadOfTable(`There are ${this.number_of_records_available} records available... please search to see the data. To sort data returned click on the column header. You may also use shift+click for multiple column sorting.`)
            }


        }
        else if (this.number_of_records_available == 0 && this.model.tdo.length == 0) {
            this.view.addMessageInsteadOfTable(`There are 0 records available.`)
        }
        else {
            //these should be all the records
            this.view.addDataTable();
            this.setFocusToFirstInputOfSearch()

        }
    }
    populateSearchValuesFromDefaultValues() {
        // console.log('populating search values');
        this.model.cdo.forEach(col_def => {
            if (typeof col_def['search'] != 'undefined' && typeof col_def['search_default'] != 'undefined') {
                if (col_def['type'] == 'date'){
                    col_def.search_element[0].value = col_def.search_default;
                    col_def.search_element[1].value = col_def.search_default;
                }
                else
                {
                    col_def.search_element.value = col_def.search_default;
                }
            }
        })
    }
    renderSearch(data){
        this.model.loadData(data)
        if(data.length>0){
            this.view.addDataTable();
            this.setFocusToFirstInputOfSearch()

        }
        else{
            this.view.addMessageInsteadOfTable(`There are no search results`)
            this.setFocusToFirstInputOfSearch()


        }
        if(typeof this.model.td.onLoadPageComplete === 'function'){
            this.model.td.onLoadPageComplete();
        }
        this.setFocusToFirstInputOfSearch()
    }
    onSearchClicked(){
        this.storeSearch();
        let search_fields = this.getSearchFormData()
        let query = this.getQueryString();
        if (typeof this.model.td.onSearchClick === 'function') {
            this.model.td.onSearchClick(query);
        }
    }
    getAndRenderSearch(){
        let controller = this;
        //call a user supplied function to grab the data
        let data = controller.model.td.getData(controller.getSearchPostData());
        if(data !== false){
            controller.renderSearch(data)
        }

        // controller.model.td.getData({
        //     method: 'post',
        //     url: '/' + controller.model.td.search_route,
        //     entity: controller.getSearchPostData(),
        //     onSuccess: function (response) {
        //         controller.renderSearch(response.data.records)
        //     }
        //
        // })
    }
    onResetClicked() {
        this.view.search_elements_array.forEach(element => {
            switch (element.type) {
                case 'tree_select':
                case 'select-multiple':
                case 'select-one':
                    element.value = 'null'
                    break
                default:
                    element.value = ''
            }
        })
        this.setFocusToFirstInputOfSearch()
        this.view.addMessageInsteadOfTable(`Press search to display results`)

        this.uri.deleteStoredSearch();
        this.deleteStoredSort();
        this.resetStoredSort();

        if(typeof this.controller.model.td.onResetClick === 'function'){
            this.controller.model.td.onResetClick();
        }

    }
    getSearchFormValues() {
        let search_values = {};

        this.view.search_elements_array.forEach(element => {
            switch (element.type) {
                case 'text':
                case 'number':
                case 'date':
                    name = element.name
                    search_values[name] = element.value;
                    if (element.value != '') {
                    }
                    break;
                case 'tree_select':
                case 'select-multiple':
                case 'select-one':
                    name = element.name
                    search_values[name] = element.value;
                    if (element.value != 'null') {
                    }
                    break;
                default:
            }
        })
        return search_values;

    }
    setFocusToFirstInputOfSearch() {

        if(this.view.search_elements_array[0].nodeName.toLowerCase() === 'input'){
            this.view.search_elements_array[0].focus();
            this.view.search_elements_array[0].select();
        }
        else if (this.view.search_elements_array[0].nodeName.toLowerCase() === 'select'){
            console.log('select.......');
            this.view.search_elements_array[0].focus();
        }
        else{
            this.view.search_elements_array[0].focus();
            this.view.search_elements_array[0].select();
        }

    }
    getStoredSearchName(){
        return this.model.td.name + '_search';
    }
    getQueryValues(){
        //terrible name..... this returns an object of the paramaters that should be stored
        let sort_data = this.sort.getSort();
        let search_data = this.getSearchFormData();
        return Object.assign(search_data , sort_data);
    }
    getQueryString(){
        let params = this.getQueryValues();
        var queryString = Object.keys(params).map(function(key) {
            return key + '=' + params[key]
        }).join('&');
        return queryString;

    }
    checkQuery(search_query) {
        //are there any key value pairs that match the search elements?
        for (let i = 0; i < this.view.search_elements_array.length; i++) {
            if (search_query[this.view.search_elements_array[i].name]) {
                return true;
            }
        }
        return false;
    }
    loadFromUri(search_query){
        console.log('loading from uri')
        this.loadSearchValues(search_query)
        //this.sort.loadSortFromUri(search_query);
        this.storeSearch();

    }
    loadSearchValues(search_query) {
        this.view.search_elements_array.forEach(element => {
            if (search_query[element.name]) {
                element.value = search_query[element.name]
            }
        })
    }
    checkStorage() {
        return localStorage.getItem(this.getStoredSearchName());
    }
    clearStorage(){
        localStorage.removeItem(this.getStoredSearchName());
    }
    retrieveSearch() {
        return JSON.parse(localStorage.getItem(this.getStoredSearchName()))
    }
    storeSearch() {
        let search_values = this.getSearchFormValues();
        // window.localStorage[this.getStoredSearchName()] = JSON.stringify(search_values);
        localStorage.setItem(this.getStoredSearchName(),JSON.stringify(search_values))
    }
    loadSearchFromStorage() {
        console.log('loading search values from storage')
        let stored_values = this.retrieveSearch();
        this.view.search_elements_array.forEach(element => {
            if (stored_values[element.name]) {
                element.value = stored_values[element.name]
            }
        })
        return stored_values;


    }
}