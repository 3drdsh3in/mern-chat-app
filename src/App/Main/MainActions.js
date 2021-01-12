function emitAccountDetails(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SEND_WEBSOCKET_MESSAGE',
      eventName: 'connection_update',
      payload: data
    })
  }
}
function initializeClient() {
  return (dispatch, getState) => {
    dispatch({
      type: 'INITIALIZE_CLIENT'
    })
  }
}
function addClientToStore(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_CLIENT',
      payload: data
    })
  }
}


export { emitAccountDetails, initializeClient, addClientToStore };