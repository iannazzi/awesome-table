export class SearchTableUriController{
    constructor(controller){
        //possible names
        //SearchTableStorageController
        this.controller=controller;
        this.jsUri = require('jsuri');

    }

    getStoredSearchName(){
        return this.controller.model.td.name + '_search';
    }
    getQueryValues(){
        //terrible name..... this returns an object of the paramaters that should be stored
        let sort_data = this.controller.getSortUri();
        let search_data = this.controller.getSearchFormData();
        return Object.assign(search_data , sort_data);
    }
    getQueryString(){
        let params = this.getQueryValues();
        var queryString = Object.keys(params).map(function(key) {
            return key + '=' + params[key]
        }).join('&');
        return queryString;

    }

    checkUri(search_query) {
        //what does this do?
        let uri = new JsUri(search_query)
        for (let i = 0; i < this.controller.view.search_elements_array.length; i++) {
            if (uri.getQueryParamValue(this.controller.view.search_elements_array[i].name)) {
                return true;
            }
        }
        return false;
    }
    loadFromUri(search_query){
        console.log('loading from uri')
        this.loadSearchValuesFromUri(search_query)
        this.controller.sort.loadSortFromUri(search_query);
        this.storeSearch();

    }
    loadSearchValuesFromUri(search_query) {
        //pass in query starting with ?
        // console.log('loading search from uri')
        let uri = new this.jsUri(search_query)
        this.controller.view.search_elements_array.forEach(element => {
            if (uri.getQueryParamValue(element.name)) {
                element.value = uri.getQueryParamValue(element.name)
            }
        })

    }

    checkStorage() {
        return window.localStorage[this.getStoredSearchName()]
    }
    clearStorage(){
        delete window.localStorage[this.getStoredSearchName()];
    }
    deleteStoredSearch(){
        delete window.localStorage[this.getStoredSearchName()];
    }
    retrieveSearch() {
        return JSON.parse(window.localStorage[this.getStoredSearchName()]);
    }
    storeSearch() {
        let search_values = this.controller.getSearchFormValues();
        window.localStorage[this.getStoredSearchName()] = JSON.stringify(search_values);
        //sessionStorage[this.getStoredSearchName()] = JSON.stringify(search_values);
    }
    loadSearchFromStorage() {
        console.log('loading search values from storage')
        console.log(window.localStorage[this.getStoredSearchName()])
        let stored_values = this.retrieveSearch();
        this.controller.view.search_elements_array.forEach(element => {
            if (stored_values[element.name]) {
                element.value = stored_values[element.name]
            }
        })
        return stored_values;


    }

    // removeSortFromUri(uri, th = false) {
    //     this.controller.view.header_elements_array.forEach(th_element => {
    //         if (th != th_element) {
    //             let name = th_element.col_def.db_field;
    //             uri.deleteQueryParam(name + '_sort')
    //         }
    //     })
    // }





    //uri
    // onSearch(){
    //
    //     let uri = new JsUri(window.location.href);
    //     this.addSearchToUri(uri);
    //     // this.removeSortFromUri(uri)
    //     this.pushState(uri);
    //     // this.resetStoredSort();
    //     this.storeSearch();
    // }
    // addSearchToUri(uri) {
    //     let search_values = this.controller.getSearchFormValues();
    //     this.controller.view.search_elements_array.forEach(element => {
    //         uri.deleteQueryParam(element.name)
    //     })
    //     for (let i in search_values) {
    //         uri.addQueryParam(i, search_values[i])
    //     }
    //
    // }
    // deleteSearchValuesFromUri(uri, search_elements_array) {
    //     this.controller.view.search_elements_array.forEach(element => {
    //         uri.deleteQueryParam(element.name)
    //     })
    // }







}