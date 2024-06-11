<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            currentPage: Number,
            totalPages: Number
        },
        emits: ['change-page'],
        methods: {
            prevPage() {
                if (this.currentPage > 1) {
                    this.$emit('change-page', this.currentPage - 1);
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.$emit('change-page', this.currentPage + 1);
                }
            }
        }
    };
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
</style>
