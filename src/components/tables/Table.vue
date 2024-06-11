<template>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Car type</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.price }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'Table',
        props: {
            items: Array
        }
    };
</script>

<style scoped>
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
</style>
