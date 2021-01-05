// Reducer may also need to store ALL SideBar data for friends & groups into redux store.
const initialState = {
  acc_data: {},
  token_data: {}
}

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, acc_data: action.payload }
    // case 'REMOVE_FR':
    //   return { ...state, acc_data: action.payload }
    case 'UPDATE_ACCOUNT_DETAILS':
      return { ...state, acc_data: action.payload }
    case 'REINITIALIZE_CLIENT':
      console.log('LOGINREDUCER');
      return { ...state, acc_data: {} }
    case 'UPDATE_TOKEN_DATA':
      return { ...state, token_data: action.payload }
    default:
      return state
  }
}

export default LoginReducer;

// acc_data: {
// state.acc_data
// }

// acc_freqs.filter()