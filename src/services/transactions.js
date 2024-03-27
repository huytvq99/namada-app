import axios from 'axios';
import {BASE_URL_QUERY, TRANSACTION_ENDPOINT} from '../constant';

export const fetchTransaction = async (index?: number, pageSize?: number) => {
    return axios
        .get(`${BASE_URL_QUERY}/${TRANSACTION_ENDPOINT}?page=${(index || 0) + 1}&page_size=${pageSize || 10}`,)
        .then((res) => res.data)
        .catch((err) => err);
};

export const fetchDetailTransaction = async (txh: string) => {
    return axios
        .get(`${BASE_URL_QUERY}/${TRANSACTION_ENDPOINT}/${txh}`)
        .then((res) => res.data)
        .catch((err) => err);
};
