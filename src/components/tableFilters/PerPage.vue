<template>
    <div class="filters">
        <select :value="itemsPerPage" @change="updateItemsPerPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'PerPage',
        props: {
            itemsPerPage: Number,
        },
        emits: ['update-items-per-page'],

        methods:{
            updateItemsPerPage(event) {
                this.$emit('update-items-per-page', +event.target.value);
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
