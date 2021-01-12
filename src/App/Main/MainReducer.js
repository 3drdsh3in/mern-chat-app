const initialState = {
  clients: []
}

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] }
    case 'REMOVE_CLIENT':
      return { ...state, clients: [...state.clients].filter((client) => client !== action.payload) }
    default:
      return state;
  }
}

export default MainReducer;