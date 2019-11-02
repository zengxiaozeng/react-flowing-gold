import * as types from './actionstype.js';

export const getCaseData = (data) => {
    return { type: types.GET_CASE_DATA, payload: data };
};

export const getCaseDataSuccess = (data) => {
    return { type: types.GET_CASE_DATA_SUCCESS, payload: data };
};

export const getSearch = (data) => {
    return { type: types.GET_SEARCH_DATA, payload: data };
};

export const getCaseDetailRequest = (data) => {
    return { type: types.GET_CASE_DETAIL_REQUEST, payload: data };
};

export const getCaseDetailSuccess = (data) => {
    return { type: types.GET_CASE_DETAIL_SUCCESS, payload: data };
};

// 草稿表格数据
export const getDraftDataRequest = (data) => {
    return { type: types.GET_DRAFT_DATA, payload: data };
};

export const getDraftDataSuccess = (data) => {
    return { type: types.GET_DRAFT_DATA_SUCCESS, payload: data };
};

// 草稿详情数据
export const getDraftDetailRequest = (data) => {
    return { type: types.GET_DRAFT_DETAIL_REQUEST, payload: data };
};

export const getDraftDetailSuccess = (data) => {
    return { type: types.GET_DRAFT_DETAIL_SUCCESS, payload: data };
};

// 清空详情数据
export const resetDraftDetail = () => {
    return { type: types.RESET_DRAFT_DETAIL_SUCCESS };
};


