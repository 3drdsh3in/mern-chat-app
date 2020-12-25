import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'
import ChatBodyReducer from './App/ChatBody/ChatBodyReducer'
import socket_reducer from './utils/socket-reducer';

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
  ChatBodyDetails: ChatBodyReducer,
  SocketDetails: socket_reducer
})

export default rootReducer;