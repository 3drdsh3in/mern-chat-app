
const initialState = {
  messageType: '',
  message: ''
}

function socket_reducer(state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_MESSAGE_RECEIVED':
      return {
        ...state,
        messageType: action.payload.messageType,
        message: action.payload.message
      }
    default:
      return state
  }
}

export default socket_reducer;