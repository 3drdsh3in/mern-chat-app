function emitAccountDetails(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'connection_update',
    payload: data
  }
}

export default emitAccountDetails;