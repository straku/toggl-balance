import moment from 'moment'

import api from './toggl/api'
import { createAsyncActionTypes, request, requestSuccess, requestError } from './utils/actions'

import { getHours } from './calc/time'

const actions = {
  user: createAsyncActionTypes('USER'),
  totalTime: createAsyncActionTypes('TOTAL_TIME'),
  sinceDate: 'SET_SINCE_DATE',
  pattern: 'SET_PATTERN',
  balance: 'SET_BALANCE',
}

function setSinceDate (date) {
  return {
    type: actions.sinceDate,
    payload: date,
  }
}

function setPattern (pattern) {
  return {
    type: actions.pattern,
    payload: pattern,
  }
}

function getUser (token) {
  const type = actions.user
  return dispatch => {
    dispatch(request(type))
    api.user(token)
      .then(user => dispatch(requestSuccess(type, { token, ...user })))
      .catch(err => dispatch(requestError(type, err)))
  }
}

function getTotalTime () {
  const type = actions.totalTime
  return (dispatch, getState) => {
    const state = getState()
    const { user: { token, workspaces }, sinceDate: since, pattern } = state
    dispatch(request(type))
    api.summary(token, {
      since,
      workspace_id: workspaces[0].id,
    })
      .then(totalTime => {
        dispatch(requestSuccess(type, totalTime))
        dispatch(calculateBalance(since, totalTime, pattern))
      })
      .catch(err => dispatch(requestError(type, err)))
  }
}

function calculateBalance (since, totalTime, pattern) {
  const norm = getHours(since, moment().subtract(1, 'day'), pattern) * 3600 * 1000
  const balance = totalTime - norm

  return {
    type: actions.balance,
    payload: balance,
  }
}

export { getUser, setSinceDate, setPattern, getTotalTime }

export default actions
