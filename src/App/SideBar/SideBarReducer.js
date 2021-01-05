import SideBar from "./SideBar"

const initialState = {
  selectedChatItem: 0
}

function SideBarReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SELECTED_CHATITEM':
      return { ...state, selectedChatItem: action.payload }
    case 'REINITIALIZE_CLIENT':
      return { ...state, selectedChatItem: 0 }
    case 'RESET_SELECTED_CHATITEM':
      return { ...state, selectedChatItem: 0 }
    default:
      return state
  }

}

export default SideBarReducer;