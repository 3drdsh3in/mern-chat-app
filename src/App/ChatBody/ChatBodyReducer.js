// Reducer may also need to store ALL SideBar data for friends & groups into redux store.
const initialState = {
  g_id: '',
  chat_messages: []
}

function ChatBodyReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CHAT_BODY':
      return { ...state, g_id: action.payload.g_id, chat_messages: action.payload.chat_messages }
    case 'REINITIALIZE_CLIENT':
      console.log('CHATBODYREDUCER');
      return { ...state, g_id: '', chat_messages: [] }
    default:
      return state
  }
}

export default ChatBodyReducer;