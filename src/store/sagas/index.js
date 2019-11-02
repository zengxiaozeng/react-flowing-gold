// saga模块化引入
import { fork, all } from 'redux-saga/effects'

// 异步逻辑
import { loginSagas } from './login'
import { applySagas } from './apply'
import { caseSagas } from './case'


// 单一进入点，一次启动所有Saga
export default function* rootSaga() {
	yield all([
		fork(loginSagas),
		fork(applySagas),
		fork(caseSagas)
	])
}