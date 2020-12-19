import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
})

export default rootReducer;