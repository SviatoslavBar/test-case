<template>
    <div>
        <input type="number"
               :value="priceFilter"
               placeholder="Filter by price"
               @input="updatePriceFilter"
        />
    </div>
</template>

<script>

    export default {
        name: 'PriceFilter',
        props: {
            priceFilter: Number,
        },
        emits: ['selected-values', 'update-selected-values',
            'price-filter', 'update-price-filter',
            'items-per-page', 'update-items-per-page',
            'reset-filters'
        ],
        data(){
            return{
                timeout: null
            }
        },

        methods:{
            selectValue(option) {
                const index = this.selectedValues.findIndex(item => item.id === option.id);
                index !== -1 ? this.selectedValues.splice(index, 1) : this.selectedValues.push(option);

                this.updateSelectedValues(this.selectedValues)
            },
            updateSelectedValues(values) {
                this.$emit('update-selected-values', values);
            },
            updatePriceFilter(event) {
                if (this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(async () => {
                    this.$emit('update-price-filter', +event.target.value);
                }, 700)
            },
            resetFilters() {
                this.$emit('reset-filters');
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
        border: 1px solid red;
        border-radius: 3px;
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
