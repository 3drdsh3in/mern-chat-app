const initialState = {
  messageType: '',
  message: ''
}

function socket_reducer(state = initialState, action) {
  switch (action.type) {
    case 'NEW_FRIEND_REQUEST':
      // Update
      return {
        ...state,
        messageType: action.payload.messageType,
        message: action.payload
      }
    default:
      return state
  }
}

export default socket_reducer;