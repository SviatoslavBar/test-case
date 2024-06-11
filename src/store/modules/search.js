export default {
    namespaced: true,
    state() {
        return {
            searchValue: ''
        };
    },
    mutations: {
        SET_SEARCH (state, payload) {
            state.searchValue = payload
        }
    },
    actions: {
        StartSearch({commit, dispatch}, searchValue) {
            commit('SET_SEARCH', searchValue);
        },
    },
    getters: {
        getSearchValue(state) {
            return state.searchValue;
        }
    }
};

