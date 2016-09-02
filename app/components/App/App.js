import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import moment from 'moment'

import { fullCentered } from '../../styles/fixtures'
import { Balance, User, STATUS } from '../../selectors'

import { getTotalTime } from '../../actions'

function formatBalance (balance) {
  const balanceDuration = moment.duration(Math.abs(balance))
  const [h, m, s] = [
    (balanceDuration.days() * 24) + balanceDuration.hours(),
    balanceDuration.minutes(),
    balanceDuration.seconds(),
  ]
  return `${balance > 0 ? '+' : '-'} ${h} : ${m} : ${s}`
}

function mapStateToProps (state) {
  return {
    user: User.select(state),
    ...Balance.select(state),
  }
}

export class App extends Component {
  static propTypes = {
    ...Balance.propTypes,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.fetchTime(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchTime(props)
  }

  fetchTime = (props) => {
    const { balance, status, user, location, dispatch } = props

    if (
      location.pathname === '/' &&
      user.status === STATUS.success &&
      status === null &&
      balance === null
    ) {
      dispatch(getTotalTime())
    }
  }

  render () {
    const { children, status, balance, user } = this.props
    const { success } = STATUS

    if (children) {
      return <div className={css(styles.container)}>{children}</div>
    }

    return (
      <div className={css(styles.container)}>
        {
          (user.status === success && status === success && balance) ? (
            <div>{formatBalance(balance)}</div>
          ) : (
            <Link to="/setup/token">Setup</Link>
          )
        }
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...fullCentered,
  },
})

export default connect(mapStateToProps)(App)
