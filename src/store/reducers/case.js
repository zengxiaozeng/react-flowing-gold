import * as types from '../actions/actionstype.js';

const caseReducer = (state = {
    caseData: [],
    total: 0,
    caseDetail: {},
    draftData: [],
    draftDetail: {}
}, action) => {
    switch (action.type) {
        case types.GET_CASE_DATA_SUCCESS:
            return {
                ...state,
                caseData: action.payload.data.data.list,
                total: action.payload.data.data.total
            };
        case types.GET_CASE_DETAIL_SUCCESS:
            return {
                ...state,
                caseDetail: action.payload.data.data
            }
        case types.GET_DRAFT_DATA_SUCCESS:
            return {
                ...state,
                draftData: action.payload.data.data.list
            }
        case types.GET_DRAFT_DETAIL_SUCCESS:
            return {
                ...state,
                draftDetail: action.payload.data.data
            }
        case types.RESET_DRAFT_DETAIL_SUCCESS:
            return {
                ...state,
                draftDetail: {}
            }
        default:
            return state;
    }
};
export default caseReducer;
