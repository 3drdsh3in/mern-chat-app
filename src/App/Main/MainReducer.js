const initialState = {
  clients: []
}

function MainReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] }
    case 'REMOVE_CLIENT':
      console.log(action.payload);
      console.log(state.clients);
      console.log(state.clients.filter((client) => client !== action.payload));
      return { ...state, clients: state.clients.filter((client) => client !== action.payload) }
    case 'RESET_CLIENT':
      return { ...state, clients: [] }
    default:
      return state;
  }
}

export default MainReducer;