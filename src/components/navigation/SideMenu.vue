<template>
    <div class="sideMenu">
        <div>
            <div>
                <h2>Filters</h2>
                <div class="filters">
                    <h3>Select "Type" filters</h3>

                    <SelectType
                            :options="options"
                            :selected-values="selectedValues"
                            @update-selected-values="updateSelectedValues"
                    />

                    <h3>Filter by car price ( >= )</h3>

                    <PriceFilter :price-filter="priceFilter"
                                 @update-price-filter="updatePriceFilter"
                    />

                    <div class="buttons">
                        <button class="button--apply" @click="resetFilters">
                            Reset Link
                        </button>
                    </div>
                </div>

                <div class="divider"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    import SelectType from '@/components/tableFilters/SelectType.vue';
    import PriceFilter from '@/components/tableFilters/PriceFilter.vue';

    export default {
        name: 'SideMenu',
        components: { SelectType, PriceFilter },

        setup() {
            const route = useRoute();
            const router = useRouter();
            const store = useStore();

            // variables from VUEX
            const searchValue = computed(() => store.state.search.searchValue);
            const priceValue = computed(() => store.state.sideMenu.price);
            const selectedValue = computed(() => store.state.sideMenu.selectedValues);
            const triggerInitSideMenu = computed(() => store.state.sideMenu.triggerInitSideMenu);

            // local variables
            const options = ref([
                { id: 1, type: 'hatchback', active: false },
                { id: 2, type: 'sedan', active: false },
                { id: 3, type: 'SUV', active: false },
            ]);
            const currentPage = ref(1);
            const selectedValues = ref(selectedValue);
            const priceFilter = ref(priceValue);

            // VUEX functions
            const setPrice = (value) => {
                store.dispatch('sideMenu/setPrice', value);
            };
            const selectValues = (value) => {
                store.dispatch('sideMenu/selectValues', value);
            };

            // local functions
            const updateOptions = () => {
                options.value = options.value.map(option => {
                    const selected = selectedValue.value.find(selectedVal => selectedVal.id === option.id);
                    if (selected) {
                        return { ...option, active: true };
                    }

                    return option;
                });
            };

            // оновлення даних з компонентів
            const updateSelectedValues = (newValue) => {
                console.warn('updateSelectedValues', updateSelectedValues)
                selectedValues.value = newValue;
                selectValues(newValue)
            }
            const updatePriceFilter = (newValue) => {
                priceFilter.value = newValue;
                setPrice(newValue)
            }
            const resetFilters = () => {
                router.push({ path: '/' });
            }

            watch(() => triggerInitSideMenu.value, () => {
                console.warn('watch triggerInitSideMenu')
                updateOptions();
            })

            return {
                options,
                selectedValues,
                selectedValue,
                priceFilter,
                resetFilters,
                currentPage,
                updateSelectedValues,
                updatePriceFilter,
                searchValue,
                updateOptions
            };
        },
    };
</script>

<style>
    .sideMenu{
        padding: 8px 10px;
        border: 1px solid gray;
        border-radius: 8px;
        background-color: #e9e9e9;
    }
</style>
