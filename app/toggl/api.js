import axios from 'axios'

import config from '../config'

function get (url, token, params) {
  return axios.get(url, {
    headers: {
      'content-type': 'application/json',
    },
    params: {
      ...params,
      user_agent: config.userAgent,
    },
    auth: {
      username: token,
      password: 'api_token',
    },
  })
}

function getUser (token, params) {
  return get('https://www.toggl.com/api/v8/me', token, params)
}

function getSummary (token, params) {
  return get('https://toggl.com/reports/api/v2/summary', token, params)
}

export { getUser, getSummary }
