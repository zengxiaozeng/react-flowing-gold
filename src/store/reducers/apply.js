import {
    GET_APPLY_DATA_SUCCESS,
    GET_CONTACT_DATA_SUCCESS
} from '../actions/actionstype.js';

const applyReducer = (state = {
    applyData: [],
    total: 0,
    contactRecord: []
}, action) => {
    switch (action.type) {
        case GET_APPLY_DATA_SUCCESS:
            return {
                ...state,
                applyData: action.payload.data.data.list,
                total: action.payload.data.data.total
            };
        case GET_CONTACT_DATA_SUCCESS:
            return {
                ...state,
                contactRecord: action.payload.data.data
            };
        default:
            return state;
    }
};
export default applyReducer;
