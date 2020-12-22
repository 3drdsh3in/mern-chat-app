// Action needs to run an HTTP fetch request to get all the data
// from a given ChatGroup (Search via a given database 'g_id' value.)

const loadChat = payload => ({
  type: 'LOAD_CHAT_BODY',
  payload
})

export const getChatData = url => {
  return dispatch => {
    fetch(url)
      .then(results => results.json())
      .then(data => dispatch(loadChat(data)))
      .catch(err => console.log(err))
  }
}