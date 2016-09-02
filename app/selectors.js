import { PropTypes } from 'react'

const STATUS = {
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
}

const statusPropTypes = PropTypes.oneOf(['LOADING', 'SUCCESS', 'ERROR'])

const combine = (...selectors) => (state) => selectors.reduce((acc, select) => ({ ...acc, ...select(state) }), {})

const User = {
  select: ({ user }) => ({
    status: user.status,
    token: user.token,
    name: user.name,
    workspaces: user.workspaces,
  }),
  propTypes: {
    status: statusPropTypes,
    token: PropTypes.string,
    name: PropTypes.string,
    workspaces: PropTypes.array,
  },
}

const Balance = {
  select: (state) => ({
    status: state.totalTime.status,
    balance: state.balance,
  }),
  propTypes: {
    status: statusPropTypes,
    balance: PropTypes.number,
  },
}

export {
  STATUS,
  User,
  Balance,
  combine,
}
