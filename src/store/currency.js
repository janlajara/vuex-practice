import {CurrencyApi} from '@/utils/apis.js';

const CURRENCY = {
    USD: 'USD', 
    EUR: 'EUR', 
    AUD: 'AUD', 
    PHP: 'PHP', 
    CNY: 'CNY', 
    JPY: 'JPY', 
    KRW: 'KRW', 
}

const state = {
    currencyChoices: CURRENCY,
    currencyRates: [],
    fromCurrencyCode: CURRENCY.USD,
    toCurrencyCode: CURRENCY.USD
}

const getters = {
    currencyCodes: (state) => {
        return Object.entries(state.currencyChoices).map(x => x[1])
    },
    toCurrency: (state) => {
        const obj = state.currencyRates.find(
            ({code}) => state.toCurrencyCode == code);
        if (obj) {
            const {code, rate} = obj;
            return {code, rate}
        }
        return {
            code: CURRENCY.USD, rate: 1, 
        };
    },
    convert: (_state, getters) => {
        const format = (amount) => {
            const number = Number(amount)
            const formatted = number.toLocaleString("en-PH", {
                style: 'currency',
                currency: getters.toCurrency.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            return formatted;
        }
        return (amount) => format(amount * getters.toCurrency.rate)
    }
}

const mutations = {
    setCurrencyRates: (state, rates) => {
        state.currencyRates = rates;
    },
    setToCurrencyCode: (state, code) => {
        state.toCurrencyCode = code;
    }
}

const actions = {
    initializeCurrencyRates: async ({state, commit}) => {
        const fromCode = state.fromCurrencyCode.toLowerCase();
        const response = await CurrencyApi.getRates(fromCode);
        if (response && response.status == 200 && fromCode in response.data) {
            let rates = [];
            Object.entries(response.data[fromCode])
                .forEach(x => {
                    const code = x[0].toUpperCase();
                    const rate = x[1];
                    if (code in state.currencyChoices) {
                        rates.push({code, rate})
                    }
                });
            commit('setCurrencyRates', rates);
        }
    },
    changeCurrency: ({commit}, code) => {
        commit('setToCurrencyCode', code);
    }
}

const currency = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export {CURRENCY, currency};