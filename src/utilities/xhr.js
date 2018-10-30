import axios from 'axios';
import * as URL from '../utilities/commonUrl';

class ApiService {
    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    api(param) {
        const { params, apiName, method, headerData, ipAdd } = param;
        let header = {};
        if (headerData)
            header = headerData;

        let url = "";
        if (ipAdd === 'atom') {
            url = URL.atom;
        }

        /** POST request */
        if (method == "POST") {
            return axios.post(url + apiName, params, { headers: header });
        }

        /** PUT request */
        if (method == "PUT") {
            return axios.put(url + apiName, params, { headers: header });
        }

        /** GET request */
        if (method == "GET") {
            return axios.get(url + apiName, { headers: header });
        }

        /** DELETE request */
        if (method == "DELETE") {
            return axios.delete(url + apiName, { headers: header, data: params })
        }
    }
}
const instance = new ApiService();
Object.freeze(instance);
export default instance;