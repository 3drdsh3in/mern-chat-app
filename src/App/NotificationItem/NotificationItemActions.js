function acceptFriendRequest(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'FR_ACCEPT',
    payload: data,
  }
}
function rejectFriendRequest(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'FR_ACCEPT',
    payload: data,
  }
}

export { acceptFriendRequest, rejectFriendRequest };