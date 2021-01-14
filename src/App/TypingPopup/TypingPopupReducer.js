const initialState = {
  // Should be an array of objects where each object has a group _id and typer's name
  typingUsers = []
}

function TypingPopupReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TYPING_USER':
      return { ...state, typingUsers: [...typingUsers, action.payload] }
    case 'REMOVE_TYPING_USER':
      break;
    default:
      return { ...state }
  }
}