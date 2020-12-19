const INCREMENT = 'counter/increment'

function LoginActions(data) {
  return {
    type: 'LOGIN',
    payload: data,
  }
}

export default LoginActions;