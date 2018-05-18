export class SortController {
    constructor(controller) {
        this.controller = controller;

    }

    getStoredSortName() {
        return this.controller.model.td.name + '_sort';
    }

    onSort(args, search_query) {
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
        // console.log('sort array: ' + sort_array[i])
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
        this.storeSort();
        this.renderSort();


    }

    renderSort() {
        this.controller.model.sortData()
        this.controller.view.updateHeaderSortView();
        this.controller.view.drawTbody();
        this.controller.updateTable()

    }

    addSort(name, value) {
        this.removeSort(name)
        let save = {};
        save[name] = value;
        this.controller.model.sort.push(save);
        // console.log('this.controller.model.sort')
        // console.log(this.controller.model.sort)

    }

    storeSort() {
        let sort_values = this.getSort();
        // localStorage.setItem(this.getStoredSortName(), JSON.stringify(sort_values))
        localStorage[this.getStoredSortName()] = JSON.stringify(sort_values);

    }

    getSortFromStorage() {
        // return JSON.parse(localStorage.getItem(this.getStoredSortName()));
        if (localStorage[this.getStoredSortName()]) {
            return JSON.parse(localStorage[this.getStoredSortName()]);
        }
        else {
            return false
        }

    }


    loadSortFromDefault() {
        //go through the column definition and add each sort...
        this.controller.model.cdo.forEach(col_def => {
            if (typeof col_def.sort !== 'undefined') {
                this.addSort(col_def.db_field, col_def.sort)
            }
        })
    }

    removeSort(name) {
        // console.log('remove sort' + name)
        // console.log(JSON.stringify(this.controller.model.sort));
        this.controller.model.sort = this.controller.model.sort.filter(function (el) {
            let keys = Object.keys(el);
            return keys[0] !== name;
        });
    }

    removeAllSort() {
        this.controller.model.sort = [];
        this.deleteStoredSort();
        this.renderSort();
    }

    getSort() {
        let sort_data = {};
        this.controller.model.sort.forEach(sort => {
            let keys = Object.keys(sort);
            sort_data[this.controller.model.td.name + '_' + keys[0] + '_sort'] = sort[keys[0]];
        })
        return sort_data;
    }

    loadSortFromQuery(query_pairs) {
        this.loadSortFromKvp(query_pairs)
    }

    loadSortFromStorage() {
        console.log(this.getSortFromStorage())
        this.loadSortFromKvp(this.getSortFromStorage())
    }

    loadSortFromKvp(query_pairs) {
        for (var key in query_pairs) {
            if (query_pairs.hasOwnProperty(key)) {
                if (key.includes('_sort')) {
                    let name = key.replace('_sort', '')
                    name = name.substring(this.controller.model.td.name.length + 1, key.length);
                    this.addSort(name, query_pairs[key]);
                }
            }
        }
    }


    resetStoredSort() {
        this.controller.model.sort = [];
    }

    deleteStoredSort() {
        // localStorage.removeItem(this.getStoredSortName());
        delete localStorage[this.getStoredSortName()]
    }
}