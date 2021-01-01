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
    let { AccountDetails } = getState();

    let acc_freqs = AccountDetails.acc_data.acc_freqs;
    AccountDetails.acc_data.acc_freqs = acc_freqs.filter((freq) => freq.fr_sender_id._id !== data.sender_id);

    dispatch({
      type: 'UPDATE_ACCOUNT_DETAILS',
      payload: AccountDetails.acc_data
    });
  };
}

function addFriendToStore(data) {
  return (dispatch, getState) => {
    let { AccountDetails } = getState();
    // Modify for data needs:
    let acc_friends = AccountDetails.acc_data.acc_friends;
    acc_friends.push(data);
    AccountDetails.acc_data.acc_friends = acc_friends;

    dispatch({
      type: 'UPDATE_ACCOUNT_DETAILS',
      payload: AccountDetails.acc_data
    })
  };
}

export { acceptFriendRequest, rejectFriendRequest, removeFriendReqFromStore, addFriendToStore };