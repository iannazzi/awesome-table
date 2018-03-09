export class UriController{
    constructor(controller){
        this.controller=controller;
        let name = controller.model.td.name;
        this.stored_search_key = name + '_search';
        this.stored_sort_key = name + '_sort';
    }

    getUri(){
        let sort_data = this.getSortUri();
        let search_data = this.getSearchUrlData();
        return Object.assign(search_data , sort_data);
    }
    getSearchUrlData(){
        let url_data = {};
        this.controller.view.search_elements.forEach(element => {
            url_data[element.name] = element.value;
        })
        url_data['table_name'] = this.controller.view.name;
        return url_data;
    }




    checkUri(search_query) {
        let uri = new JsUri(search_query)
        for (let i = 0; i < this.controller.view.search_elements.length; i++) {
            if (uri.getQueryParamValue(this.controller.view.search_elements[i].name)) {
                return true;
            }
        }
        return false;
    }




    loadFromUri(search_query){
        console.log('loading from uri')
        this.loadSearchValuesFromUri(search_query)
        this.loadSortFromUri(search_query);
    }
    loadSearchValuesFromUri(search_query) {
        // console.log('loading search from uri')

        let uri = new JsUri(search_query)

        this.controller.view.search_elements.forEach(element => {
            if (uri.getQueryParamValue(element.name)) {
                element.value = uri.getQueryParamValue(element.name)
            }
        })

    }

    onSort(args, search_query){
        // console.log('uri on sort')
        //coming in from click the header
        //set the uri and stored uri
        //let uri = new JsUri(search_query)
        let event = args[0];
        let th = args[1];
        //this code is the tri-selector: switches between none, asc, and desc
        let sort_array = ['none', 'asc', 'desc'];
        let i = th.sort;
        i = ++i % sort_array.length;
        th.sort = i;

        let name = th.col_def.db_field
        let self = this;

        if (!event.shiftKey) {
            //this.removeSortFromUri(uri,th)
            this.controller.view.header_elements_array.forEach(th_element => {
                if (th != th_element) {
                    self.removeSort(th_element.col_def.db_field);
                }
            })
        }
        console.log('sort array: ' + sort_array[i])
        switch (sort_array[i]) {
            case 'none':
                // uri.deleteQueryParam(name + '_sort')
                this.removeSort(name);
                break;
            case 'asc':
                this.addSort(name, 'asc')
                // uri.addQueryParam(name + '_sort', 'asc')
                break;
            case 'desc':
                // uri.deleteQueryParam(name + '_sort')
                // uri.addQueryParam(name + '_sort', 'desc')
                this.removeSort(name)
                this.addSort(name, 'desc')
                break;
        }
        sessionStorage[this.stored_sort_key] = JSON.stringify(this.controller.model.sort);
        // this was bad.... this.pushState(uri);


    }
    getSortUri(){

        let url_data = {};
        this.controller.model.sort.forEach(sort => {
            let keys = Object.keys(sort);
            url_data[this.controller.view.name + '_' + keys[0] + '_sort'] = sort[keys[0]];
        })
        return url_data;
    }
    loadSortFromUri(search_query) {
        // console.log('loading sort from uri')

        //go through the params in order....
        let uri = new JsUri(search_query);
        let params = uri.queryPairs
        let self = this;
        params.forEach(param => {
            let name = param[0];
            if (name.includes('_sort')) {
                name = name.replace('_sort', '')
                //take  off the front
                name = name.substring(this.controller.view.name.length +1, name.length);
                let value = param[1];
                //remove sort
                self.addSort(name, value);
            }
        })

    }
    checkStorage() {
        // console.log('checkStorageForSearch ' + this.stored_search_key);
        return window.storage[this.stored_search_key]

    }

    retrieveSearch() {
        return JSON.parse(window.storage[this.stored_search_key]);
    }

    storeSearch() {
        let search_values = this.controller.getSearchFormValues();
        window.storage[this.stored_search_key] = JSON.stringify(search_values);
        //sessionStorage[this.stored_search_key] = JSON.stringify(search_values);
    }
    loadSearchFromStorage() {
        console.log('loading search values from storage')
        console.log(window.storage[this.stored_search_key])
        let stored_values = this.retrieveSearch();
        this.controller.view.search_elements.forEach(element => {
            if (stored_values[element.name]) {
                element.value = stored_values[element.name]
            }
        })
        return stored_values;


    }

    addSort(name, value) {
        let save = {};
        save[name] = value;
        this.controller.model.sort.push(save);
        // console.log('this.controller.model.sort')

        // console.log(this.controller.model.sort)

    }
    // removeSortFromUri(uri, th = false) {
    //     this.controller.view.header_elements_array.forEach(th_element => {
    //         if (th != th_element) {
    //             let name = th_element.col_def.db_field;
    //             uri.deleteQueryParam(name + '_sort')
    //         }
    //     })
    // }
    loadSortFromStorage() {
        if(window.storage[this.stored_sort_key]){
            this.controller.model.sort = JSON.parse(window.storage[this.stored_sort_key]);
        }
    }
    removeSort(name) {
        // console.log('remove sort' + name)
        // console.log(JSON.stringify(this.controller.model.sort));
        this.controller.model.sort = this.controller.model.sort.filter(function (el) {
            let keys = Object.keys(el);
            return keys[0] !== name;
        });
    }

    onReset(){

        //let uri = new JsUri(window.location.href)
        //this.deleteSearchValuesFromUri(uri);
        //this.removeSortFromUri(uri);
        //console.log('pushing ' + uri.toString())
        //this.pushState(uri);
        delete window.storage[this.stored_search_key];
        delete window.storage[this.stored_sort_key];
        this.resetStoredSort();

        //this callback should send it
        if(typeof this.controller.model.td.onResetClick === 'function'){
            this.controller.model.td.onResetClick();
        }
    }
    resetStoredSort(){
        this.controller.model.sort = [];
    }




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
    //     this.controller.view.search_elements.forEach(element => {
    //         uri.deleteQueryParam(element.name)
    //     })
    //     for (let i in search_values) {
    //         uri.addQueryParam(i, search_values[i])
    //     }
    //
    // }
    // deleteSearchValuesFromUri(uri, search_elements) {
    //     this.controller.view.search_elements.forEach(element => {
    //         uri.deleteQueryParam(element.name)
    //     })
    // }







}