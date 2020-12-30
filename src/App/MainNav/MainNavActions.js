function reInitializeStore() {
  // No Payload needed to provide reducers with information to
  // reinitialize redux store.
  return ({
    type: 'REINITIALIZE_CLIENT',
    payload: null
  })
}

export { reInitializeStore };