import axios from 'axios';
import {
    GET_CRYPTO,
    CRYPTO_ERROR
} from './types';

export const getCrypto = ()=> {
    return async(dispatch) => {
        try {
            const crypto_response = await axios.get('/api/getCryptoData');
            const payload = crypto_response.data;
            dispatch => ({
                type:  GET_CRYPTO,
                payload: payload
            });

            return payload;
        } catch(err) {
            dispatch(cryptoError(err));
        }
    }
}

export const cryptoError = (err) => {
    return {
        type: CRYPTO_ERROR,
        payload: err
    }
}