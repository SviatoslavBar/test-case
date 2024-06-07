<template>
    <div class="filters">

        <h3>Select "Type" filters</h3>
        <div class="select">
            <label v-for="option in options">
                <input type="checkbox" :checked="option.active" @change="selectValue(option)">
                <span>{{option.type}}</span>
            </label>
        </div>

        <p>======================</p>
        <h3>Search by name</h3>
        <input
                type="text"
                :value="nameFilter"
                placeholder="Search by name"
                @input="updateNameFilter"
        />

        <h3>Filter by car price ( >= )</h3>
        <input
                type="number"
                :value="priceFilter"
                placeholder="Filter by price"
                @input="updatePriceFilter"
        />

        <h3>Items per page</h3>
        <select :value="itemsPerPage" @change="updateItemsPerPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
        </select>

        <!-- 👉 Action buttons  -->
        <div class="buttons">
            <button class="button--apply" @click="applyFilters" :disabled="!filtersChanged">
                Apply Filters
            </button>
            <button class="button--apply" @click="resetFilters">
                Reset Filters link
            </button>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import {computed} from "vue";

    export default {
        name: 'Filters',
        components: { Multiselect },
        props: {
            options: Array,
            selectedValues: Array,
            priceFilter: Number,
            nameFilter: String,
            itemsPerPage: Number,
            filtersChanged: Boolean
        },
        emits: ['selected-values', 'price-filter',
                'name-filter', 'items-per-page',
                'apply-filters', 'is-filters-change',
                'update-selected-values', 'update-name-filter',
                'update-price-filter', 'update-items-per-page',
                'reset-filters'
        ],

        methods:{
            selectValue(option) {
                const index = this.selectedValues.findIndex(item => item.id === option.id);
                index !== -1 ? this.selectedValues.splice(index, 1) : this.selectedValues.push(option);

                this.updateSelectedValues(this.selectedValues)
            },
            applyFilters() {
                this.$emit('selected-values', this.selectedValues);
                this.$emit('price-filter', this.priceFilter);
                this.$emit('name-filter', this.nameFilter);
                this.$emit('items-per-page', this.itemsPerPage);
                this.$emit('apply-filters');
            },
            resetFilters() {
                this.$emit('reset-filters');
            },
            isFiltersChange() {
                this.$emit('is-filters-change');
            },


            updateSelectedValues(values) {
                this.$emit('update-selected-values', values);
                this.isFiltersChange()
            },
            updatePriceFilter(event) {
                this.$emit('update-price-filter', +event.target.value);
                this.isFiltersChange()
            },
            updateItemsPerPage(event) {
                this.$emit('update-items-per-page', +event.target.value);
                this.isFiltersChange()
            },
            updateNameFilter(event) {
                this.$emit('update-name-filter', event.target.value);
                this.isFiltersChange()
            },
        },
    };
</script>

<style>
    input, select {
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
    }
    table {
        width: 300px;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
    }


    .button--apply {
        padding: 8px 16px;
    }
    .buttons{
        display: flex;
        gap: 16px;
    }
    .select{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px
    }
    .select input{
        margin-bottom: 0;
        margin-right: 4px;
    }
</style>
