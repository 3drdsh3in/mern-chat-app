// Emit new message to socket server. (Which will send to
// corresponding client on the other end of chat)

function sendNewMessage(data) {
  // Dispatch Message to socket-server & current client's state
  return (dispatch, getState) => {
    let { AccountDetails } = getState();
    let m_sender = AccountDetails.acc_data._id;
    let m_dt = new Date();
    let g_id = data.g_id;
    let msg_string = data.msg_string;
    dispatch({
      type: 'SEND_WEBSOCKET_MESSAGE',
      eventName: 'NEW_MESSAGE', // Socket Endpoint
      payload: {
        m_sender: m_sender,
        m_dt: m_dt,
        g_id: g_id,
        msg_string: msg_string
      }
    })
  }
}

export { sendNewMessage }