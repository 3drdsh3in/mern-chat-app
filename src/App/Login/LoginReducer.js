// Reducer may also need to store ALL SideBar data for friends & groups into redux store.
const initialState = {
  acc_data: {}
}

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, acc_data: action.payload }
    // case 'REMOVE_FR':
    //   return { ...state, acc_data: action.payload }
    case 'UPDATE_ACCOUNT_DETAILS':
      return { ...state, acc_data: action.payload }
    default:
      return state
  }
}

export default LoginReducer;

// acc_data: {
// state.acc_data
// }

// acc_freqs.filter()