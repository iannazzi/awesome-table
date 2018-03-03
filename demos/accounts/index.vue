<template>


    <div>
        <div v-if="dataReady">
            <div id="data_table_view">
                <button class="btn-new" @click="$router.push('/'+ route + '/create')"><i class="fa fa-plus"
                                                                                      aria-hidden="true"></i>New
                    {{modelName}}
                </button>
                <div id="searchableTable"></div>
                <zzi-matrix2 v-if="loading"></zzi-matrix2>
            </div>
        </div>
        <div v-else>
            <zzi-matrix></zzi-matrix>
        </div>
    </div>


</template>

<script>

    import columnDefinition from './columnDefinition'
    import searchPageMixins from '../../controllers/searchPageMixins'


    export default {
        data() {
            return {
                data: {},
                dataReady: false,
                loading: false,
                searchableTable: null
            }
        },
        mixins: [searchPageMixins],
        props: ['page', 'route'],
        mounted: function () {

            this.dataReady = false;
            AwesomeTableWrapper.getPageDataThenRenderSearchTable(this);

        },
        methods: {
            renderTable(){
                let self = this;
                this.column_definition = columnDefinition(this);
                this.searchableTable = AwesomeTableWrapper.createSearchableCollectionTable(this, 100);

                $(function () {
                    self.searchableTable.addTo('searchableTable')
                })


            }
        },

    }


</script>
