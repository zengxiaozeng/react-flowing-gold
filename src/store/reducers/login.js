import { message } from 'antd';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    GET_ACCOUNT_INFO
} from '../actions/actionstype.js';
import { getToken } from '@/utils/auth'

const id_token = getToken() ? getToken() : '';

const loginReducer = (state = {
    id_token: id_token,
    userInfo: {}
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                id_token: action.payload.id_token
            };
        case LOGIN_FAILURE:
            message.error(action.payload.msg);
            return {
                ...state,
                id_token: ''
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                id_token: ''
            };
        case GET_ACCOUNT_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
};
export default loginReducer;
