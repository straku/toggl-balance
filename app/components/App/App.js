import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import moment from 'moment'

import { Footer, Button } from 'rebass'

import Loader from '../Loader/Loader'
import FavoriteIcon from '../../icons/Favorite'

import { full, centered, link } from '../../styles/fixtures'
import { inline } from '../../styles/utils'
import { Balance, User } from '../../selectors'

import { getTotalTime } from '../../actions'

function formatBalance (balance) {
  const balanceDuration = moment.duration(Math.abs(balance))

  const h = (balanceDuration.days() * 24) + balanceDuration.hours()
  const m = balanceDuration.minutes()
  const s = balanceDuration.seconds()

  return `${balance > 0 ? '+' : '-'} ${h} : ${m} : ${s}`
}

function getBackgroundColor (balance) {
  if (balance == null) {
    return 'rgba(0, 0, 0, 0)'
  }

  return (balance < 0)
    ? 'rgba(255, 65, 54, 0.4)'
    : 'rgba(46, 204, 64, 0.4)'
}

/* eslint-disable max-len */
const WelcomeScreen = () => (
  <div className={css(styles.welcome)}>
    <p>Hey, <strong>Toggl Balance</strong> is an app that helps you check how much work you did toward your goal.</p>
    <p>To do that you need to go through some steps to provide access to your tracked time on Toggl and setup your goal.</p>
    <p>Click below to proceed to setup</p>
    <Link to="/setup/token">
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
      content = <div className={css(styles.balance)}>{formatBalance(balance)}</div>
    } else {
      content = <WelcomeScreen />
    }

    return (
      <div
        className={css(styles.app)}
        style={{
          backgroundColor: getBackgroundColor(balance),
        }}
      >
        <div className={css(styles.content)}>
          {children || content}
        </div>
        <Footer style={inline(styles.footer)}>
          <div>
            {'Made with '}
            <FavoriteIcon className={css(styles.icon)} />
            {' by '}
            <a className={css(styles.link)} href="https://github.com/straku">Łukasz Strączyński</a>
          </div>
        </Footer>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    ...full,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    ...full,
    ...centered,
  },
  welcome: {
    width: '50%',
    textAlign: 'center',
  },
  footer: {
    flexGrow: 0,
    width: '50%',
    margin: '0 auto',
    justifyContent: 'center',
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '2em',
    height: '2em',
  },
  balance: {
    fontSize: '2.5em',
  },
  link: {
    ...link,
  },
})

function mapStateToProps (state) {
  return {
    user: User.select(state),
    ...Balance.select(state),
  }
}

export default connect(mapStateToProps)(App)
