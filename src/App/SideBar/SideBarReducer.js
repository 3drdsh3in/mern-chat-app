import SideBar from "./SideBar"

const initialState = {
  selectedChatItem: 0
}

function SideBarReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SELECTED_CHATITEM':
      console.log('UPDATE SELECTED CHATITEM REDUCER')
      return { ...state, selectedChatItem: action.payload }
    default:
      return state
  }

}

export default SideBarReducer;