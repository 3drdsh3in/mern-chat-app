function updateLogState(newState) {
  return {
    type: 'UPDATE_LOG_STATE',
    payload: newState
  }
}

export { updateLogState };