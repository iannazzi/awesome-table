import {CollectionTableController} from './CollectionTableController'
import {SearchTableEvents} from './SearchTableEvents';
import {SearchTableUriController} from './SearchTableUriController';


export class SearchTableController extends CollectionTableController {
    constructor(model, view) {
        super(model, view)
        let self = this;
        this.show_records_autmatically_below = 50;

        this.uri = new SearchTableUriController(this);


        this.searchTableEvents = new SearchTableEvents(this);

        //this piece of code rots... it is trying to reload the page
        //when using the back button the url says the right thing, but page will not reload
        //adding this code will allow the back button to work once.

        // window.onpopstate = function (event) {
        //     window.location.href = window.location.href;
        // };
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
    populateSearchValuesFromDefaultValues()
    {
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

    //this has to pull out..... table code does not get data....
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
        this.uri.storeSearch();
        let search_fields = this.uri.getSearchFormData()

        //push a url change, then watch for the change, then fire page load event
        //shit url change really????? document.reload here????? that seems funcked up???


        //these look redundant..... probalbly go with onSearchClick...
        //either case the data should be returned....
        // if(typeof this.model.td.getData === 'function'){
        //     this.model.td.getData(search_fields);
        // }
        if (typeof this.model.td.onSearchClick === 'function') {
            let data = this.model.td.onSearchClick(search_fields);
            if (data === false){
                this.view.addMessageInsteadOfTable('no data')
            }
            else{
                this.renderSearch(data)
            }
        }
    }
    //ok... this part is fucked.....


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


    onReset() {
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
        this.uri.onReset();

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




}