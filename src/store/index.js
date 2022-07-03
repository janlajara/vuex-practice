import {createStore} from 'vuex';
import {currency} from './currency.js';

export default createStore({
    modules: {
        currency
    }
});