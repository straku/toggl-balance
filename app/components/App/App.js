import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { Footer, Button } from 'rebass'

import { getPath } from '../../utils/router'

import Loader from '../Loader/Loader'
import FavoriteIcon from '../../icons/Favorite'

import { Balance, User } from '../../selectors'

import { getTotalTime } from '../../actions'

import styles from './App.scss'

function formatBalance (balance) {
  const balanceDuration = moment.duration(Math.abs(balance))

  const h = (balanceDuration.days() * 24) + balanceDuration.hours()
  const m = balanceDuration.minutes()
  const s = balanceDuration.seconds()

  return `${balance > 0 ? '+' : '-'} ${h} : ${m} : ${s}`
}

/* eslint-disable max-len */
const WelcomeScreen = () => (
  <div className={styles.welcome}>
    <p>Hey, <strong>Toggl Balance</strong> is an app that helps you check how much work you did toward your goal.</p>
    <p>To do that you need to go through some steps to provide access to your tracked time on Toggl and setup your goal.</p>
    <p>Click below to proceed to setup</p>
    <Link to={getPath('/setup/token')}>
      <Button>Setup</Button>
    </Link>
  </div>
)
/* eslint-enable max-len */

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

  fetchTime (props) {
    const { balance, status, user, location, dispatch } = props

    if (
      location.pathname === '/' &&
      user.status === 'SUCCESS' &&
      status === null &&
      balance === null
    ) {
      dispatch(getTotalTime())
    }
  }

  render () {
    const { children, status, balance, user } = this.props

    let content
    if (status === 'LOADING') {
      content = <Loader />
    } else if (user.status === 'SUCCESS' && status === 'SUCCESS' && balance) {
      content = <div className={styles.balance}>{formatBalance(balance)}</div>
    } else {
      content = <WelcomeScreen />
    }

    return (
      <div className={styles.app}>
        <div className={styles.content}>
          {children || content}
        </div>
        <Footer>
          <div>
            {'Made with '}
            <FavoriteIcon className={styles.icon} />
            {' by '}
            <a className={styles.link} href="https://github.com/straku">Łukasz Strączyński</a>
          </div>
        </Footer>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: User.select(state),
    ...Balance.select(state),
  }
}

export default connect(mapStateToProps)(App)
