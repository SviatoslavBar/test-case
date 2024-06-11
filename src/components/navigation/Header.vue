<template>
    <div class="header">
        <div class="header__logo">
            @x logo
        </div>
        <Search/>
    </div>
</template>

<script>
    import Search from "@/components/search/Search.vue";

    export default {
        name: 'Header',
        components: { Search },

        computed: {
        },
        methods: {
        },
    };
</script>

<style scoped>
    .header{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        gap: 45px;
        border-bottom: 2px solid black;
        background-color: #848b89;
        padding: 10px 30px;
    }
</style>

