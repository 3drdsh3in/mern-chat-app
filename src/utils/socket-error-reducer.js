const initialState = {
  errorType: '',
  errorMessage: ''
}

function socket_reducer(state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_ERROR_RECEIVED':
      console.log(action);
      return {
        ...state,
        errorType: action.payload.messageType,
        errorMessage: action.payload.message
      }
    default:
      return state
  }
}

export default socket_reducer;