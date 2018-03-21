import { getData } from './getData'
import {AwesomeTable} from '../elements/tables/AwesomeTable';


export class AwesomeTableWrapper
{
    constructor() {
        // this.component = component;
        this.AwesomeTable = AwesomeTable;
        this.getData = getData;
    }

    //most pages with tables need to get data then display it
    loadDataAndRenderTable(component) {
        return function (response) {
            //this is page data.....
            console.log(response)
            transfomer.removeNull(response.data.records);
            component.data = response.data;
            component.renderTable();
            component.dataReady = true;

        }

    }

    //most record pages have show edit and create with corresponding tables
    createShowEditOrCreateRecordTable(component) {
        let access, edit_display;
        if (component.page == 'show') {
            access = 'read';
            edit_display = 'modal';
        }
        else {
            access = 'write';
            edit_display = 'on_page';
        }
        return new this.AwesomeTable({
            //name: "role",
            data: component.data.records,
            route: component.route,
            name: component.route,
            column_definition: component.column_definition,
            table_buttons: ['edit', 'delete'],
            type: 'record', //record, collection or searchable
            table_view: component.page, //index, create, edit, and show pages: columns respond differnetly to
            access: access, //read vs write
            edit_display: edit_display,
            getData:this.getData,
            onSaveSuccess(){
                delete cached_page_data[component.route]
            },
            onDelete(){
                component.loading = true;
            },
            onDeleteSuccess(){
                //back to roles
                component.loading = false;
                delete cached_page_data[component.route]
                component.$router.push('/' + component.route);
            },
            onCreateSaved(id){
                //pop up a modal
                // this.create() //check the display
                //back to roles
                console.log('saving....')
                component.dataReady = false;
                delete cached_page_data[component.route]
                component.$router.push({path: '/' + component.route + '/' + id, props: {justcreated: 'true'}});

            },
            onCancelCreateClick(){
                component.$router.push('/' + component.route);
            }

        })
    }

    loadRecordTableDataThenCallRenderTable(component) {
        component.dataReady = false;
        let  url = '/' + component.route + '/create';
        if (component.page != 'create') {
            url = '/' + component.route + '/' + component.$route.params.id;
        }
        let self = this;
        this.getData( {
            method: 'get',
            url: url,
            entity: false,
            onSuccess: self.loadDataAndRenderTable(component)
        })
    }

    getPageDataThenRenderSearchTable(component){

        if(cached_page_data[component.route])
        {
            //for components that need no data i can just set the page cache once....
            console.log('cached page data');
            component.renderTable();
            component.dataReady = true;
        }
        else
        {
            let self = this;
            this.getData( {
                method: 'get',
                url:  component.route,
    //            params: {number_of_records:number_of_records},
                onSuccess: self.loadDataAndRenderTable(component)

            })
        }


    }

    createSearchableCollectionTable(component, number_of_records_to_automatically_get = 100){
        return new this.AwesomeTable({

            name: component.route,
            access: "read",
            table_buttons: [],
            table_view: 'index', //component.page,
            edit_display: 'on_page',
            route: component.route, //so far this needs replacement
            footer: [],
            header: [],
            column_definition: component.column_definition,
            type: 'searchable',
            data: component.data,
            number_of_records_available: component.data.number_of_records_available,
            number_of_records_to_automatically_get,
            getData:this.getData,
            search_query: component.$root.$route.fullPath,
            search_route: component.route + '/search',
            //initial_page_load_data: component.data.records,
            onUriLoadPageStart(){
                //we came to a page with a search in the uri
                //this could have come from the stored search
                console.log('onLoadPageStart')
                component.loading = true;
            },
            onLoadPageComplete(){
                console.log('onLoadPageComplete')
                component.dataReady = true;
                component.loading = false;
            },
            loadPageFromStorage(query){
                console.log('awsome table wrapper load from storage')
                component.$router.replace({ path: '/' + component.route , query:query } )
            },
            onSearching(){
                console.log('searching')

                component.loading = true;

            },
            onInitialLoadPage(){
                //we came into the page with no search stored,
                //from the server we may have retrieved some data

            },
            onSearchClick(query){

                console.log('awesome table wrapper on search click query will only change if url changes')
                //console.log(query);
                component.$router.push({ path: '/' + component.route , query:query } )
            },
            onSortClick(data){
                //we need to add to the url
                console.log(data)
                console.log('sort click')
                data['sort']=true;
                component.$router.push({ path: '/' + component.route , query:data})
            },
            onResetClick(){
              //kill storage and push to
                component.$route.meta['reset'] = true;
                component.$router.push({ path: '/' + component.route , query:{} } )
            },
            router(data){
                component.$router.push({ path: '/' + component.route +'/search', query:{data} } )
            },
            onSearchSuccess(){
                component.searching = false;
            },
            beforeSearchClicked(){
                component.searching = true;
            }

        })
    }

}