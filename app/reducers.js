import actions from './actions'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
}

const initialState = {
  user: {
    status: null,
    error: null,
    token: null,
    name: null,
    workspaces: null,
  },
  totalTime: {
    status: null,
    error: null,
    data: null,
  },
  sinceDate: null,
  balance: null,
}

const reducers = {
  [actions.user.request]: (state) => ({
    ...state,
    user: {
      ...state.user,
      status: status.loading,
    },
  }),
  [actions.user.success]: (state, user) => ({
    ...state,
    user: {
      ...user,
      status: status.success,
      error: null,
    },
  }),
  [actions.user.error]: (state, error) => ({
    ...state,
    user: {
      ...state.user,
      error,
      status: status.error,
    },
  }),
  [actions.sinceDate]: (state, sinceDate) => ({
    ...state,
    sinceDate,
  }),
  [actions.totalTime.request]: (state) => ({
    ...state,
    totalTime: {
      ...state.totalTime,
      status: status.loading,
    },
  }),
  [actions.totalTime.success]: (state, totalTime) => ({
    ...state,
    totalTime: {
      data: totalTime,
      status: status.success,
      error: null,
    },
  }),
  [actions.totalTime.error]: (state, error) => ({
    ...state,
    totalTime: {
      ...state.totalTime,
      error,
      status: status.error,
    },
  }),
  [actions.balance]: (state, balance) => ({
    ...state,
    balance,
  }),
}

const leaveStateUnchanged = (state) => state

function reducer (state = initialState, action) {
  const selectedReducer = reducers[action.type] || leaveStateUnchanged
  return selectedReducer(state, action.payload)
}

export default reducer
