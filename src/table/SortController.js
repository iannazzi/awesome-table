export class SortController{
    constructor(controller){
        this.controller=controller;
        this.jsUri = require('jsuri');

    }
    getStoredSortName(){
        return this.controller.model.td.name + '_sort';
    }

    onSort(args, search_query){
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
        //now store the sort for future use....
        sessionStorage[this.getStoredSortName()] = JSON.stringify(this.controller.model.sort);
        // this was bad.... this.pushState(uri);

        this.renderSort();


    }
    renderSort()
    {
        this.controller.model.sortData()
        this.controller.view.updateHeaderSortView();
        this.controller.view.drawTbody();
        this.controller.updateTable()

    }
    addSort(name, value) {
        let save = {};
        save[name] = value;
        this.controller.model.sort.push(save);
        // console.log('this.controller.model.sort')
        // console.log(this.controller.model.sort)

    }
    loadSortFromStorage() {
        if(window.localStorage[this.getStoredSortName()]){
            this.controller.model.sort = JSON.parse(window.localStorage[this.getStoredSortName()]);
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
        let uri = new this.jsUri(search_query);
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
    resetStoredSort(){
        this.controller.model.sort = [];
    }
    deleteStoredSort(){
        delete window.localStorage[this.getStoredSortName()];
    }
}