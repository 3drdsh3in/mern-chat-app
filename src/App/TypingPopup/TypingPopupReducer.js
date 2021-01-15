const initialState = {
  // Should be an array of objects where each object has a group _id and typer's name
  typingClients: []
}

function TypingPopupReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TYPING_USER':
      let isFound = false;
      let i;
      for (i = 0; i < state.typingClients.length; i++) {
        if (action.payload.emitter === state.typingClients[i].emitter && action.payload.g_id === state.typingClients[i].g_id) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        return {
          ...state, typingClients: [...state.typingClients, action.payload]
        }
      } else {
        return { ...state };
      }
    case 'REMOVE_TYPING_USER':
      return {
        ...state,
        typingClients: state.typingClients.filter((typingClient) => typingClient.g_id !== action.payload.g_id && typingClient.emitter !== action.payload.emitter)
      }
    default:
      return { ...state }
  }
}

export default TypingPopupReducer;