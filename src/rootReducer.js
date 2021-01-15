import { combineReducers } from 'redux';

// ALL OF THE APPLICATION'S REDUCERS:
import LoginReducer from './App/Login/LoginReducer'
import socket_error_reducer from './utils/socket-error-reducer';
import SideBarReducer from './App/SideBar/SideBarReducer';
import MainReducer from './App/Main/MainReducer';
import TypingPopupReducer from './App/TypingPopup/TypingPopupReducer';

const rootReducer = combineReducers({
  AccountDetails: LoginReducer,
  SocketErrorDetails: socket_error_reducer,
  SideBarDetails: SideBarReducer,
  ClientDetails: MainReducer,
  TypingPopupDetails: TypingPopupReducer
})

export default rootReducer;