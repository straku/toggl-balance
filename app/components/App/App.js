import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import moment from 'moment'

import { getUser, getSummary } from '../../toggl/api'
import { getHours } from '../../calc/time'

class App extends Component {
  state = {
    token: null,
    since: null,
    balance: null,
  }

  handleAPIKeyChange = (e) => {
    this.setState({ token: e.target.value }, () => console.log(this.state))
  }

  handleStartDateChange = (e) => {
    this.setState({ since: e.target.value }, () => console.log(this.state))
  }

  handleClick = () => {
    const { token, since } = this.state
    getUser(token)
      .then(res => getSummary(token, {
        since,
        workspace_id: res.data.data.workspaces[0].id,
      }))
      .then(res => {
        const workedTime = res.data.total_grand
        const balance = workedTime - (getHours(since, moment().subtract(1, 'day'), 5, 8) * 3600 * 1000)
        const balanceDuration = moment.duration(Math.abs(balance))
        const [h, m, s] = [
          balanceDuration.hours(),
          balanceDuration.minutes(),
          balanceDuration.seconds(),
        ]
        this.setState({
          balance: `${balance > 0 ? '+' : '-'} ${h} : ${m} : ${s}`,
        })
      })
  }

  render () {
    const { balance } = this.state
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.inputs)}>
          <input
            type="text"
            className={css(styles.input)}
            onChange={this.handleAPIKeyChange}
          />
          <input
            type="text"
            className={css(styles.input)}
            onChange={this.handleStartDateChange}
          />
        </div>
        <button onClick={this.handleClick}>Download</button>
        <div className={css(styles.balance)}>
          {balance || 'click download to get balance'}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputs: {
  },
  input: {
    margin: 5,
  },
  balance: {
    marginTop: 25,
    fontFamily: ['Futura', 'Arial'],
    fontSize: '40px',
  },
})

export default App
