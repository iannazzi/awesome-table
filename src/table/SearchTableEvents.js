import {TableEvent} from './TableEvent'

export class SearchTableEvents {
    constructor(controller) {

        controller.searchReturned = new TableEvent(controller)
        controller.searching = new TableEvent(controller)
        controller.view.searchClicked = new TableEvent(controller.view);
        controller.view.resetClicked = new TableEvent(controller.view);


        controller.view.searchClicked.attach(
            function () {
                controller.uri.storeSearch();
                let search_fields = controller.uri.getSearchUrlData()


                //push a url change, then watch for the change, then fire page load event
                //shit url change really????? document.reload here????? that seems funcked up???




                if (typeof controller.model.td.onSearchClick === 'function') {
                    controller.model.td.onSearchClick(search_fields);
                }
            }
        )
        controller.searching.attach(
            function () {
                //controller.view.searching();
            }
        )
        controller.searchReturned.attach(
            function (sender, results) {
                controller.onSearchReturned(results);
            }
        )
        controller.loadPageEvent = new TableEvent(controller)

        controller.loadPageEvent.attach(
            function () {


                //USER CAME IN FROM A LINK
                    //POPULATE SEARCH BOXES
                    //GO GET IT STORE THE SEARCH

                //USER CAME IN FROM INTERNAL ROUTE
                    //CHECK IF THERE IS A STORED SEARCH IF SO POPULATE STORAGE THEN GO GET IT
                    //OTHERWISE POPULATE DEFAULT VALUES AND GO GET IT

                //USER CLICKS SEARCH
                    //GO GET IT STORE THE SEARCH



                if (controller.uri.checkUri(controller.model.td.search_query)) {
                    console.log('there is data on the uri')
                    if (typeof controller.model.td.onLoadPageStart === 'function') {
                        controller.model.td.onLoadPageStart();
                    }

                    //this loads data to the search table fields
                    //and the sort array
                    controller.uri.loadFromUri(controller.model.td.search_query);
                    controller.uri.storeSearch();

                    if(typeof controller.model.td.onSearching=== 'function'){
                        controller.model.td.onSearching();
                    }
                    controller.getAndRenderSearch();






                    // if(typeof controller.model.td.onLoadPage === 'function'){
                    //     controller.model.td.onLoadPage()
                    // }
                }

                else if (controller.uri.checkStorage()) {

                    //Here we need to replace the route, then react to the route change....
                    // which should then call the function above....
                    console.log('loading search from storage');
                    let search_fields = controller.uri.loadSearchFromStorage();
                    controller.uri.loadSortFromStorage();
                    if (typeof controller.model.td.loadPageFromStorage === 'function') {
                        controller.model.td.loadPageFromStorage(search_fields);
                    }


                }
                else {
                    //no search set, we should NOW hit the server for Data
                    console.log('no search set, populate defaults then get records')
                    controller.populateSearchValuesFromDefaultValues();
                    if(controller.model.td.number_of_records_available <= controller.model.td.number_of_records_to_automatically_get)
                    {
                        controller.getAndRenderSearch();
                    }
                    else{
                        let message = "There are " + controller.model.td.number_of_records_available + " records available, please search to limit the results.";
                        controller.view.addMessageInsteadOfTable(message)
                        controller.setFocusToFirstInputOfSearch()


                        // focus

                    }












                }
            }
        )
        controller.view.resetClicked.attach(
            function () {
                controller.onReset()
            }
        )
    }
}