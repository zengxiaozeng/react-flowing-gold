import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas'
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const createHistory = require('history').createHashHistory;
const history = createHistory();   // 初始化history
const routerWare = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerWare));
const store = createStore(
	reducer,
	enhancer
)

sagaMiddleware.run(sagas)

export default store