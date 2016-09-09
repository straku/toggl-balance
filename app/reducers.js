import actions from './actions'

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
      status: 'LOADING',
    },
  }),
  [actions.user.success]: (state, user) => ({
    ...state,
    user: {
      ...user,
      status: 'SUCCESS',
      error: null,
    },
  }),
  [actions.user.error]: (state, error) => ({
    ...state,
    user: {
      ...state.user,
      error,
      status: 'ERROR',
    },
  }),

  [actions.totalTime.request]: (state) => ({
    ...state,
    totalTime: {
      ...state.totalTime,
      status: 'LOADING',
    },
  }),
  [actions.totalTime.success]: (state, totalTime) => ({
    ...state,
    totalTime: {
      data: totalTime,
      status: 'SUCCESS',
      error: null,
    },
  }),
  [actions.totalTime.error]: (state, error) => ({
    ...state,
    totalTime: {
      ...state.totalTime,
      error,
      status: 'ERROR',
    },
  }),

  [actions.sinceDate]: (state, sinceDate) => ({
    ...state,
    sinceDate,
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
