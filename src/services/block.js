import axios from 'axios';
import {BASE_URL_QUERY, BLOCK_ENDPOINT} from '../constant';

export const fetchBlock = async (index?: number, pageSize?: number) => {
    return axios
        .get(
            `${BASE_URL_QUERY}/${BLOCK_ENDPOINT}?page=${(index || 0) + 1}&page_size=${pageSize || 10}`,
        )
        .then((res) => res.data)
        .catch((err) => err);
};

export const fetchDetailBlockByBlockHeight = async (blockHeight: number) => {
    return axios
        .get(`${BASE_URL_QUERY}/${BLOCK_ENDPOINT}/height/${blockHeight}`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const fetchDetailBlockByBlockHash = async (blockHash: string) => {
    return axios
        .get(`${BASE_URL_QUERY}/${BLOCK_ENDPOINT}/hash/${blockHash}`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const getLastCommit = async () => {
    return axios
        .get(`${BASE_URL_QUERY}/${BLOCK_ENDPOINT}/last`)
        .then((res) => res.data)
        .catch((err) => err);
};
