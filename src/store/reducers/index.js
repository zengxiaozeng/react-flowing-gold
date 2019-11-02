import { combineReducers } from 'redux'
import loginReducer from './login'
import applyReducer from './apply'
import caseReducer from './case'

const rootReducer = combineReducers({
    loginReducer,
    applyReducer,
    caseReducer
})

export default rootReducer