import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'
import ChatBodyReducer from './App/ChatBody/ChatBodyReducer'
import socket_error_reducer from './utils/socket-error-reducer';
import SideBarReducer from './App/SideBar/SideBarReducer';

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
  ChatBodyDetails: ChatBodyReducer,
  SocketErrorDetails: socket_error_reducer,
  SideBarDetails: SideBarReducer
})

export default rootReducer;