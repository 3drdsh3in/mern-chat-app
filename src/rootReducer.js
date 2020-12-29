import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'
import ChatBodyReducer from './App/ChatBody/ChatBodyReducer'
import socket_message_reducer from './utils/socket-message-reducer';
import socket_error_reducer from './utils/socket-error-reducer';

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
  ChatBodyDetails: ChatBodyReducer,
  SocketMessageDetails: socket_message_reducer,
  SocketErrorDetails: socket_error_reducer,
})

export default rootReducer;