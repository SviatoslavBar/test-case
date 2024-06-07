<template>
    <div>
        <div>
            <!-- 👉 Link to API example  -->
            <h3>Link to "API" : </h3>
            <p style="color: #1313aa">{{ linkToApi }}</p>
        </div>
        <div class="container">
            <div>
                <h2>Filters</h2>

                <Filters
                        :original-filters="originalFilters"
                        :options="options"
                        :selected-values="selectedValues"
                        :price-filter="priceFilter"
                        :name-filter="nameFilter"
                        :items-per-page="itemsPerPage"
                        :filters-changed="filtersChanged"

                        @update-selected-values="updateSelectedValues"
                        @update-price-filter="updatePriceFilter"
                        @update-items-per-page="updateItemsPerPage"
                        @update-name-filter="updateNameFilter"

                        @is-filters-change="isFiltersChange"
                        @apply-filters="applyFilters"
                        @reset-filters="resetFilters"
                />

                <div class="divider"></div>
            </div>
            <div>

                <!-- 👉  preview table -->
                <h2>Preview table</h2>
                <Table :items="paginatedItems"/>

                <!-- 👉  table pagination -->
                <Pagination
                        :current-page="currentPage"
                        :total-pages="totalPages"
                        @change-page="changePage"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Table from '@/components/Table.vue';
    import Pagination from '@/components/Pagination.vue';
    import Filters from '@/components/Filters.vue';


    function memoize(fn) {
        const cache = new Map();

        return function(...args) {
            const key = JSON.stringify(args);

            // 👉 перевірка чи ключ існує в сесії
            if (cache.has(key)) {
                console.warn('Returning from cache:', cache.get(key));
                return cache.get(key);
            }

            // 👉 перевірка чи ключ існує в localStorage
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                console.warn('Returning from localStorage:', JSON.parse(storedValue));
                cache.set(key, JSON.parse(storedValue));
                return JSON.parse(storedValue);
            }

            const result = fn(...args);
            cache.set(key, result);
            localStorage.setItem(key, JSON.stringify(result));
            return result;
        };
    }

    export default {
        name: 'Home',
        components: { Table, Pagination, Filters },
        setup() {
            const route = useRoute();
            const router = useRouter();

            const options = ref([
                { id: 1, type: 'hatchback', active: false },
                { id: 2, type: 'sedan', active: false },
                { id: 3, type: 'SUV', active: false },
            ]);

            const linkToApi = ref('');
            const currentPage = ref(1);
            const itemsPerPage = ref(5);
            const filtersChanged = ref(false)

            const items = ref([
                { id: 1, name: 'car 1', price: 10, type: 'hatchback' },
                { id: 2, name: 'car 2', price: 16, type: 'SUV' },
                { id: 3, name: 'car 3', price: 22, type: 'sedan' },
                { id: 4, name: 'car 4', price: 24, type: 'sedan' },
                { id: 5, name: 'car 5', price: 41, type: 'SUV' },
                { id: 6, name: 'car 6', price: 26, type: 'sedan' },
                { id: 7, name: 'car 7', price: 43, type: 'SUV' },
                { id: 8, name: 'car 8', price: 34, type: 'SUV' },
                { id: 9, name: 'car 9', price: 22, type: 'hatchback' },
                { id: 10, name: 'car 10', price: 54, type: 'sedan' },
                { id: 11, name: 'car 11', price: 32, type: 'hatchback' },
                { id: 12, name: 'car 12', price: 54, type: 'SUV' },
                { id: 13, name: 'car 13', price: 35, type: 'sedan' },
                { id: 14, name: 'car 14', price: 74, type: 'SUV' },
                { id: 15, name: 'car 15', price: 34, type: 'hatchback' },
                { id: 16, name: 'car 16', price: 55, type: 'SUV' },
                { id: 17, name: 'car 17', price: 23, type: 'sedan' },
                { id: 18, name: 'car 18', price: 11, type: 'hatchback' },
                { id: 19, name: 'car 19', price: 23, type: 'sedan' },
                { id: 20, name: 'car 20', price: 43, type: 'SUV' },
                { id: 21, name: 'car 21', price: 54, type: 'sedan' },
                { id: 22, name: 'car 22', price: 32, type: 'hatchback' },
                { id: 23, name: 'car 23', price: 54, type: 'SUV' },
                { id: 24, name: 'car 24', price: 35, type: 'sedan' },
                { id: 25, name: 'car 25', price: 74, type: 'SUV' },
                { id: 26, name: 'car 26', price: 34, type: 'hatchback' },
                { id: 27, name: 'car 27', price: 55, type: 'SUV' },
                { id: 28, name: 'car 28', price: 23, type: 'sedan' },
                { id: 29, name: 'car 29', price: 11, type: 'hatchback' },
                { id: 30, name: 'car 30', price: 23, type: 'sedan' },
            ]);

            const selectedValues = ref([]);
            const priceFilter = ref(null);
            const nameFilter = ref('');
            const originalFilters = ref({ selected: [], price: null, name: '', itemsPerPage: 5 });

            const applyFilters = (resetPage) => {
                if (resetPage) currentPage.value = 1;

                const query = {
                    selected: selectedValues.value.map(item => item.id).join(','),
                    price: priceFilter.value || '',
                    name: nameFilter.value || '',
                    page: currentPage.value,
                    itemsPerPage: itemsPerPage.value
                };

                originalFilters.value = {
                    selected: [...selectedValues.value],
                    price: priceFilter.value,
                    name: nameFilter.value,
                    itemsPerPage: itemsPerPage.value
                };
                filtersChanged.value = false;

                router.push({ path: '/', query });
            };
            const resetFilters = () => {
                router.push({ path: '/' });
            }

            const getQueryParamsMemo = memoize((params, options, fullPath) => {

                let memo = {
                    options,
                    selectedValues: '',
                    selectedIds: params.selected ? params.selected.split(',').map(Number) : [],
                    linkToApi: fullPath,
                    priceFilter: params.price ? Number(params.price) : null,
                    nameFilter: params.name ? params.name : '',
                    currentPage: params.page ? Number(params.page) : 1,
                    itemsPerPage: params.itemsPerPage ? Number(params.itemsPerPage) : 5,
                    originalFilters: ''
                }

                memo.selectedValues = memo.options.filter((option) => memo.selectedIds.includes(option.id));
                memo.options.forEach(option => {
                    const isSelected = selectedValues.value.some(selected => selected.id === option.id);
                    if (isSelected) option.active = true;
                });

                console.warn('return memo',memo)

                return memo;
            });

            const parseData = () => {
                const memoData = getQueryParamsMemo(route.query, options.value, route.fullPath);
                console.log('parse data', memoData)

                linkToApi.value = route.fullPath;
                selectedValues.value = memoData.selectedValues;
                priceFilter.value = memoData.priceFilter ? Number(memoData.priceFilter) : null;
                nameFilter.value = memoData.nameFilter || '';

                currentPage.value = memoData.currentPage ? Number(memoData.currentPage) : 1;
                itemsPerPage.value = memoData.itemsPerPage ? Number(memoData.itemsPerPage) : 5;

                options.value.forEach(option => {
                    const isSelected = selectedValues.value.some(selected => selected.id === option.id);
                    if (isSelected) option.active = true;
                });

                originalFilters.value = {
                    selected: [...selectedValues.value],
                    price: priceFilter.value,
                    name: nameFilter.value,
                    itemsPerPage: itemsPerPage.value
                };
            }

            const updateSelectedValues= (newValue) => {
                selectedValues.value = newValue;
            }
            const updatePriceFilter= (newValue) => {
                priceFilter.value = newValue;
            }
            const updateItemsPerPage= (newValue) => {
                itemsPerPage.value = newValue;
            }
            const updateNameFilter= (newValue) => {
                nameFilter.value = newValue;
            }

            const isFiltersChange = () => {
                let isTrue =
                    selectedValues.value.length !== originalFilters.value.selected.length ||
                    selectedValues.value.some((v, i) => v.id !== originalFilters.value.selected[i].id) ||
                    priceFilter.value !== originalFilters.value.price ||
                    nameFilter.value !== originalFilters.value.name ||
                    itemsPerPage.value !== originalFilters.value.itemsPerPage;

                filtersChanged.value = isTrue;
            }

            // onMounted(() => {
            //     parseData()
            // });

            watch(() => route.query, () => {
                parseData();
            });

            const filteredItems = computed(() => {
                return items.value.filter((item) => {
                    const matchesSelected = selectedValues.value.length === 0 ||
                        selectedValues.value.some((selected) => selected.type === item.type);

                    const matchesPrice = priceFilter.value === null || item.price >= priceFilter.value;
                    const matchesName = nameFilter.value === '' || item.name.toLowerCase().includes(nameFilter.value.toLowerCase());
                    return matchesSelected && matchesPrice && matchesName;
                });
            });

            const paginatedItems = computed(() => {
                const start = (currentPage.value - 1) * itemsPerPage.value;
                const end = start + itemsPerPage.value;
                return filteredItems.value.slice(start, end);
            });

            const totalPages = computed(() => {
                return Math.ceil(filteredItems.value.length / itemsPerPage.value);
            });

            const changePage = (page) => {
                if (page >= 1 && page <= totalPages.value) {
                    currentPage.value = page;
                    applyFilters();
                }
            };

            return {
                options,
                selectedValues,
                priceFilter,
                nameFilter,
                filteredItems,
                applyFilters,
                resetFilters,
                linkToApi,
                paginatedItems,
                currentPage,
                totalPages,
                itemsPerPage,
                changePage,
                originalFilters,
                updateSelectedValues,
                updatePriceFilter,
                updateItemsPerPage,
                updateNameFilter,
                isFiltersChange,
                filtersChanged,
                getQueryParamsMemo,
                parseData
            };
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #2c3e50;
        margin-top: 60px;
    }

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
    .container {
        width: 800px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 40px 14px;
        gap: 20px;
        border: 1px solid gray;
        border-radius: 8px;
    }
    .divider {
        padding: 16px 0;
    }
</style>
