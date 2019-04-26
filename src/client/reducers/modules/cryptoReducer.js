import { GET_CRYPTO, CRYPTO_ERROR } from '../../actions/types';

const Inital_State = {
    crypto_data: {},
    error: ''
}

export default (state = Inital_State, action) => {
    switch (action.type) {
        case GET_CRYPTO:
            return {...state, crypto_data: action.payload, error:''};

        case CRYPTO_ERROR:
            return {...state, error: action.payload};

        default:
            return state;
    }
}
