function sendFriendReq(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'SEND_FRIEND_REQUEST',
    payload: data,
  }
}

function deleteFriendReq(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'DELETE_FRIEND_REQUEST',
    payload: data,
  }
}

function removeFriend(data) {
  return {
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'DELETE_FRIEND',
    payload: data,
  }
}

export { sendFriendReq, deleteFriendReq, removeFriend };