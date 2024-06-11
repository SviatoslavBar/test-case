export default {
    namespaced: true,
    state() {
        return {
            selectedValues: [],
            price: null,
            triggerParsing: 0,
            triggerInitSideMenu: 0,
        };
    },
    mutations: {
        SET_SELECTED_VALUES (state, payload) {
            console.log('sel.values mutation', payload)
            state.selectedValues = payload
        },
        SET_PRICE(state, payload){
            state.price = payload
        },
        TRIGGER_PARSING(state){
            state.triggerParsing = state.triggerParsing + 1;
        },
        TRIGGER_SIDE_MENU(state){
            state.triggerInitSideMenu = state.triggerInitSideMenu + 1;
        },
    },
    actions: {
        selectValues({commit}, payload) {
            commit('SET_SELECTED_VALUES', payload);
            commit('TRIGGER_PARSING');
        },
        setPrice({commit}, payload) {
            commit('SET_PRICE', payload);
            commit('TRIGGER_PARSING');
        },
        initSideMenu({commit}, payload) {
            commit('SET_SELECTED_VALUES', payload.selectedValues);
            commit('SET_PRICE', payload.price);
            commit('TRIGGER_SIDE_MENU');
        },
        triggerParseData({commit}) {
            commit('TRIGGER_PARSING');
        },
    },
};

