import { put, call, take, fork, all } from 'redux-saga/effects'
import { getRecordsData, seachCaseData, getCaseDetail, pageDraftRecords, searchDraftDetail } from '@/service/case.servicers.js'
import * as types from '../actions/actionstype';
import { getCaseDataSuccess, getCaseDetailSuccess, getDraftDataSuccess, getDraftDetailSuccess } from '../actions/case';

function * getCaseRecordRequest() {
    while(true){
        const resData = yield take(types.GET_CASE_DATA);
        const response = yield call(getRecordsData, resData.payload)
        if (response.data.data.list && response.data.data.list.length > 0) {
            yield put({
                type: types.GET_CASE_DETAIL_REQUEST,
                payload: {
                    caseId: response.data.data.list[0].id
                }
            })
        } else {
            const params = {
                data: {
                    data: {}
                }
            }
            yield put({
                type: types.GET_CASE_DETAIL_SUCCESS,
                payload: {
                    ...params
                }
            })
            // yield put(getCaseDetailSuccess(response));
        }
        yield put(getCaseDataSuccess(response));
    }
}

function * getSearchRequest() {
    while(true){
        const resData = yield take(types.GET_SEARCH_DATA);
        const response = yield call(seachCaseData, resData.payload)
        yield put(getCaseDataSuccess(response))
    }
}

function * getCaseDetailRequest() {
    while(true){
        const resData = yield take(types.GET_CASE_DETAIL_REQUEST);
        const response = yield call(getCaseDetail, resData.payload)
        yield put(getCaseDetailSuccess(response));
    }
}

function * getDraftRecordRequest() {
    while(true){
        const resData = yield take(types.GET_DRAFT_DATA);
        const response = yield call(pageDraftRecords, resData.payload)
        if (response.data.data.list && response.data.data.list.length > 0) {
            yield put({
                type: types.GET_DRAFT_DETAIL_REQUEST,
                payload: {
                    id: response.data.data.list[0].id
                }
            })
        } else {
            const params = {
                data: {
                    data: {}
                }
            }
            yield put({
                type: types.GET_DRAFT_DETAIL_SUCCESS,
                payload: {
                    ...params
                }
            })
            // yield put(getCaseDetailSuccess(response));
        }
        yield put(getDraftDataSuccess(response));
    }
}

function * getDraftDetailRequest() {
    while(true){
        const resData = yield take(types.GET_DRAFT_DETAIL_REQUEST);
        const response = yield call(searchDraftDetail, resData.payload)
        yield put(getDraftDetailSuccess(response));
    }
}

export function * caseSagas() {
    yield all([
        fork(getCaseRecordRequest),
        fork(getSearchRequest),
        fork(getCaseDetailRequest),
        fork(getDraftRecordRequest),
        fork(getDraftDetailRequest)
    ]);
}
