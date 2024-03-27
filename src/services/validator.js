import axios from 'axios';
import {
    BASE_URL_GET_LASTEST_SIGNATURE,
    BASE_URL_QUERY,
    BASE_URL_QUERY_VAL,
    GET_COMMIT_SIGNATURE,
    VALIDATOR,
    VALIDATOR_ENDPOINT,
} from '../constant';
import {getLastCommit} from './block';

const cookDataToObj = (arr: Array<any>) => {
    if (arr?.length <= 0) return {};
    return arr.reduce((acc, item) => {
        return {...acc, ...item};
    }, {});
};

const transformData = (
    rawValidatorPart: any,
    cookedListSignBlockValue: any,
    cookedListUptimeValue: any,
) => {
    return rawValidatorPart.map((val: any) => {
        return {
            ...val,
            uptime: cookedListUptimeValue?.[val.hex_address],
            signBlock: cookedListSignBlockValue?.[val.hex_address],
        };
    });
};

export const getValidatorCommitSignatures = async (address: string) => {
    return axios
        .get(
            `${BASE_URL_QUERY}/${VALIDATOR}/${address}/${GET_COMMIT_SIGNATURE}`,
        )
        .then((res) => ({
            [address]: res.data || 0,
        }))
        .catch(() => ({[address]: 0}));
};

export const getValidatorUpTime = async (
    address: string,
    lastHeight: number,
) => {
    return axios
        .get(
            `${BASE_URL_QUERY}/${VALIDATOR}/${address}/uptime?start=0&end=${lastHeight}`,
        )
        .then((res) => ({
            [address]: res.data,
        }))
        .catch(() => ({[address]: 0}));
};

export const fetchValidator = async () => {
    try {
        return await axios
            .get(`${BASE_URL_QUERY_VAL}/${VALIDATOR_ENDPOINT}`)
            .then((res) => res.data)
            .catch((err) => err);
    } catch (error) {
        return error;
    }
};

export const fetchPartValidator = async (
    rawValidatorData: any,
    page: {
        index: number;
        pageSize: number;
    },
) => {
    try {
        if (rawValidatorData?.validators?.length > 0) {
            const rawValidatorPart = rawValidatorData.validators.slice(
                page.index * page.pageSize,
                page.pageSize + page.index * page.pageSize,
            );

            const lastBlock = await getLastCommit();
            const lastHeight = lastBlock?.last_commit?.height || 0;
            const listSignBlockValueAsync = rawValidatorPart.map((val: any) => {
                return getValidatorCommitSignatures(val.hex_address);
            });

            const listUptimeValueAsync = rawValidatorPart.map((val: any) => {
                return getValidatorUpTime(val.hex_address, lastHeight);
            });

            const listSignBlockValue = await Promise.all(listSignBlockValueAsync);
            const listUptimeValue = await Promise.all(listUptimeValueAsync);

            const cookedListSignBlockValue = cookDataToObj(listSignBlockValue);
            const cookedListUptimeValue = cookDataToObj(listUptimeValue);

            return transformData(
                rawValidatorPart,
                cookedListSignBlockValue,
                cookedListUptimeValue,
            );
        }
        return [];
    } catch (error) {
        return error;
    }
};

export const fetchLatestSignatureValidator = async (address: string) => {
    return axios
        .get(
            `${BASE_URL_GET_LASTEST_SIGNATURE}/node/${VALIDATOR_ENDPOINT}/${VALIDATOR}/${address}/latestSignatures`,
        )
        .then((res) => res.data)
        .catch((err) => err);
};
