// Reducer may also need to store ALL SideBar data for friends & groups into redux store.
const initialState = {
  acc_data: {}
}

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, acc_data: action.payload }
    default:
      return state
  }
}

export default LoginReducer;