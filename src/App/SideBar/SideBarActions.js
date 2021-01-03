// Action needs to run an HTTP fetch request to get all the data
// from a given ChatGroup (Search via a given database 'g_id' value.)

function updateSelectedChatItem(data) {
  // data should be the index of the newly selected item.
  return {
    type: 'UPDATE_SELECTED_CHATITEM',
    payload: data
  }
}

export { updateSelectedChatItem };