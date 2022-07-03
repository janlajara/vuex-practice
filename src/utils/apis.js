import {AXIOS} from './axios.js';

class FakeStoreApi {
    static base_url = 'https://fakestoreapi.com';

    static async getProducts(limit=30) {
        const url = FakeStoreApi.base_url + '/products';
        const response = await AXIOS.execute(AXIOS.GET, url, null, {'limit': limit});
        return response;
    }
}

class CurrencyApi {
    static base_url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

    static async getRates(fromCode) {
        const url = CurrencyApi.base_url + `/${fromCode.toLowerCase()}.json`;
        const response = await AXIOS.execute(AXIOS.GET, url);
        return response
    }
}

export {
    FakeStoreApi,
    CurrencyApi
}