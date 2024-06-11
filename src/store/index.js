// store/index.js
import { createStore } from 'vuex';
import search from './modules/search';
import sideMenu from './modules/sideMenu';

const store = createStore({
    modules: {
        search,
        sideMenu,
    },
});

export default store;
