const _axios = require('axios')

const AXIOS =  {
    execute: async (method, url, data, params)=> {
        const methods = ["post", "put", "get", "delete", "options"];
        const config = {
            url: url,
            method: methods[method],
            data, params
        }; 
        let response; 
        try {
            response = await _axios.request(config);
        } catch (err) {
            AXIOS._show_error(err);
        }
        return response;
    },
    _show_error: (err) => {
        let error = 'An unexpected error occurred.'
        if (err) {
            error = err;
        }
        return {
            error
        };
    },
    POST: 0,
    PUT: 1,
    GET: 2,
    DELETE: 3,
    OPTIONS: 4,
}


export {AXIOS};