import axios from 'axios';
import {
    USER_ERROR,
    GET_USER,
    OAUTH_USER
} from './types';

export const getUser = ()=> {
    return async(dispatch) => {
        try {
            const user_response = await axios.get('/api/getUser');
            const payload = user_response.data.user_res;
            
            dispatch({
                type: GET_USER,
                payload: payload
            });

            return payload;
        } catch(err) {
            dispatch(authError(err));
        }
    };
}

export const oauthUser = ()=> {
    return async(dispatch) => {
        try {
            const oauth_response = await axios.get('/api/oauthUser');
            const payload = oauth_response.data.auth_user;

            dispatch({
                type: OAUTH_USER,
                payload: payload
            });

            return payload;
        } catch(err) {
        dispatch(authError(err));
        }
    };
}

export const authError = (err) => {
    return {
        type: USER_ERROR,
        payload: err
    }
}