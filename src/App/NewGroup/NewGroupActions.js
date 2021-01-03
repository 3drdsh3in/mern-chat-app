function createNewGroup(data) {
  return ({
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'NEW_GROUP',
    payload: data
  })
}

export { createNewGroup };