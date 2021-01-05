function storeAccountDetails(data) {
  return {
    type: 'LOGIN',
    payload: data,
  }
}

function storeTokenDetails(data) {
  return {
    type: 'UPDATE_TOKEN_DATA',
    payload: data
  }
}

export { storeAccountDetails, storeTokenDetails };