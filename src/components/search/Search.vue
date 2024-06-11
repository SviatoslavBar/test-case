<template>
    <div class="search">
        <input
                type="text"
                v-model="nameFilter"
                placeholder="Search by name"
                @input="search()"
        />
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import {watch} from "vue";

    export default {
        name: 'Search',
        data(){
            return{
                nameFilter: '',
                timeout: null
            }
        },
        emits: ['update-name-filter'],

        computed: {
            ...mapGetters('search', ['getSearchValue']),
            ...mapState('search', ['searchValue']),
            ...mapState('sideMenu', ['triggerInitSideMenu']),
        },
        methods:{
            ...mapActions('search', ['StartSearch']),
            ...mapActions('sideMenu', ['triggerParseData']),

            search(){
                if (this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(async () => {
                    this.StartSearch(this.nameFilter)
                    this.triggerParseData()
                }, 700)
            },
            updateNameFilter(event) {
                this.$emit('update-name-filter', event.target.value);
            },
        },

        watch: {
            triggerInitSideMenu() {
                this.nameFilter = this.getSearchValue
            }
        },
    };
</script>

<style>
    .search input{
        margin-bottom: 0;
    }
</style>
