function createNewGroup(data) {
  return ({
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'CREATE_NEW_GROUP',
    payload: data
  })
}

export { createNewGroup };