function leaveGroupStore(data) {
  return (dispatch, getState) => {
    let { AccountDetails } = getState();

    let acc_grps = AccountDetails.acc_data.acc_grps;
    acc_grps = acc_grps.filter((grp) => grp._id !== data.g_id);
    AccountDetails.acc_data.acc_grps = acc_grps;

    dispatch({
      type: 'UPDATE_ACCOUNT_DETAILS',
      payload: AccountDetails.acc_data
    })
    dispatch({
      type: 'RESET_SELECTED_CHATITEM'
    })
  }
}

function leaveGroup(data) {
  return ({
    type: 'SEND_WEBSOCKET_MESSAGE',
    eventName: 'LEAVE_GROUP',
    payload: data
  })
}

export { leaveGroup, leaveGroupStore };