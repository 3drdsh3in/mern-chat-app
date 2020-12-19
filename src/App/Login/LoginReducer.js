const initialState = {
  acc_id: ''
}

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, acc_id: action.payload._id }
    default:
      return state
  }
}

export default LoginReducer;