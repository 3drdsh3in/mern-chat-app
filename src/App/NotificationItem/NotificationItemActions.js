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
    eventName: 'DELETE_FRIEND_REQUEST',
    payload: data,
  }
}
function removeFriendReqFromStore(data) {
  return (dispatch, getState) => {
    const { AccountDetails } = getState();

    let acc_freqs = AccountDetails.acc_data.acc_freqs;
    AccountDetails.acc_data.acc_freqs = acc_freqs.filter((freq) => freq.fr_sender_id._id !== data.sender_id);

    dispatch({
      type: 'REMOVE_FR',
      payload: AccountDetails.acc_data
    });
  };
}

export { acceptFriendRequest, rejectFriendRequest, removeFriendReqFromStore };