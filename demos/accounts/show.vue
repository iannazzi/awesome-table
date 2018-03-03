<template>

    <div>
        <div v-if="dataReady">

            <button class="btn-back" @click="$router.push('/'+route)"><i class="fa fa-arrow-left" aria-hidden="true"></i>Back
                To {{modelName}} List
            </button>
            <button v-if="page!='create'" class="btn-new" @click="$router.push('/'+ route + '/create')"><i class="fa fa-plus"
                                                                                                    aria-hidden="true"></i>New
                {{modelName}}
            </button>

            <div id="record_table" class="recordTableView">
                <h2 v-if="page==='create'">New {{modelName}}</h2>
                <h2 v-else-if="page==='edit'">Edit {{modelName}} {{data.records[0].name}} </h2>
                <h2 v-else-if="page==='show'">{{modelName}} {{data.records[0].name}}</h2>
            </div>

        </div>
        <div v-else>
            <zzi-matrix></zzi-matrix>
        </div>

    </div>
</template>


<script>
    import columnDefinition from './columnDefinition'
    import recordPageMixins from '../../controllers/recordPageMixins'


    export default {
        data() {
            return {
                data: {},
                dataReady: false,
            }
        },
        mixins: [recordPageMixins],
        props: ['page','justcreated', 'route'],
        mounted: function () {
            AwesomeTableWrapper.loadRecordTableDataThenCallRenderTable(this)

        },
        methods: {
            renderTable(){
                let self = this;
                this.column_definition = columnDefinition(this);
                let recordTable = AwesomeTableWrapper.createShowEditOrCreateRecordTable(this);


                $(function(){
                    recordTable.addTo('record_table');
                    bus.$emit('zzwaitoverevent');
                })
            }
        }
    }

</script>
