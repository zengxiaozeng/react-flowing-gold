import {
    GET_APPLY_DATA,
    GET_APPLY_DATA_SUCCESS,
    GET_CONTACT_DATA,
    GET_CONTACT_DATA_SUCCESS,
    ADD_CONTACT_DATA,
    ADD_CONTACT_DATA_SUCCESS
} from './actionstype.js';

export const getApplyData = (data) => {
    return { type: GET_APPLY_DATA, payload: data };
};

export const getApplyDataSuccess = (data) => {
    return { type: GET_APPLY_DATA_SUCCESS, payload: data };
};

export const getContactData = (data) => {
    return { type: GET_CONTACT_DATA, payload: data };
};

export const getContactDataSuccess = (data) => {
    return { type: GET_CONTACT_DATA_SUCCESS, payload: data };
};

export const addContactData = (data) => {
    return { type: ADD_CONTACT_DATA, payload: data };
};

export const addContactDataSuccess = (data) => {
    return { type: ADD_CONTACT_DATA_SUCCESS, payload: data };
};
