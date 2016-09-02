function createAsyncActionTypes (type) {
  return {
    request: `${type}_REQUEST`,
    success: `${type}_SUCCESS`,
    error: `${type}_ERROR`,
  }
}

function request (type) {
  return { type: type.request }
}

function requestSuccess (type, payload) {
  return {
    type: type.success,
    payload,
  }
}

function requestError (type, error) {
  return {
    type: type.error,
    error: true,
    payload: error,
  }
}

export {
  createAsyncActionTypes,
  request,
  requestSuccess,
  requestError,
}
