// saga模块化引入
import {put, call, take, fork} from 'redux-saga/effects'
import * as api from '@/service/login.servicers.js'
import { LOGIN_REQUEST } from '../actions/actionstype';
import { loginSuccess, loginFailure } from '../actions/login';
import { setToken } from '@/utils/auth'
import { push } from 'react-router-redux';

function* loginRequest(data) {
    try {
        const response = yield call(api.loginMboile, data);
        if (response.status === 200) {

            let isAdmin = false;
            setToken(response.data.data)
            yield put(push('/'))

            yield put(loginSuccess(response.data.data, isAdmin, ''));
        } else {
            yield put(loginFailure({
                code: response.status,
                msg: response.data.message
            }));
        }
    } catch (e) {
        yield put(loginFailure({
            code: 404,
            msg: e.response.data.message
        }));
    }
}

export function* loginSagas() {
    while (true) {
        const resData = yield take(LOGIN_REQUEST);
        yield fork(loginRequest, resData.payload);
    }
}
