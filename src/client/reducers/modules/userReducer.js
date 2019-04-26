import { OAUTH_USER, USER_ERROR, GET_USER,  } from '../../actions/types';

const Inital_State = {
    user_data: {},
    oauth_data: {},
    error: ''
}

export default (state = Inital_State, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user_data: action.payload, error:''}

        case OAUTH_USER:
            return {...state, oauth_data: action.payload, error: ''}

        case USER_ERROR:
            return {...state, error: action.payload}

            default:
            return state;
    }
}