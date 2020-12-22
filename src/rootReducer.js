import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'
import ChatBodyReducer from './App/ChatBody/ChatBodyReducer'

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
  ChatBodyDetails: ChatBodyReducer
})

export default rootReducer;