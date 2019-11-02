// saga模块化引入
import { put, call, take, fork, all } from 'redux-saga/effects'
import {
    getAccountRecords,
    getContactRecord,
    addContactRecord
} from '@/service/apply.servicers.js'
import {
    GET_APPLY_DATA,
    GET_CONTACT_DATA,
    ADD_CONTACT_DATA
} from '../actions/actionstype';
import {
    getApplyDataSuccess,
    getContactDataSuccess,
    addContactDataSuccess
} from '../actions/apply';

function * getApplyRecordRequest() {
    while(true){
        const resData = yield take(GET_APPLY_DATA);
        const response = yield call(getAccountRecords, resData.payload)
        if (response.data.data.list) {
            yield put({
                type: GET_CONTACT_DATA,
                payload: {
                    applyId: response.data.data.list[0].id
                }
            })
        }
        yield put(getApplyDataSuccess(response));
    }
}

function * getContactRecordRequest() {
    while(true){
        const resData = yield take(GET_CONTACT_DATA);
        const response = yield call(getContactRecord, resData.payload)
        yield put(getContactDataSuccess(response));
    }
}

function * addContactRecordRequest() {
    while(true){
        const resData = yield take(ADD_CONTACT_DATA);
        const response = yield call(addContactRecord, resData.payload)
        yield put({
            type: GET_CONTACT_DATA,
            payload: {
                applyId: resData.payload.applyId
            }
        })
    }
}

export function* applySagas() {
    yield all([
        fork(getApplyRecordRequest),
        fork(getContactRecordRequest),
        fork(addContactRecordRequest)
    ]);
}
