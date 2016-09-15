import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { Button } from 'rebass'

import SimpleForm from './SimpleForm/SimpleForm'

import { getPath } from '../../../utils/router'
import { getPattern } from '../../../calc/time'
import { setPattern } from '../../../actions'

import styles from './Workload.scss'

const DEFAULT_PER_WEEK = 5
const DEFAULT_PER_DAY = 8

class Workload extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    pattern: getPattern(DEFAULT_PER_WEEK, DEFAULT_PER_DAY),
  }

  handleChange = (pattern) => {
    this.setState({ pattern })
  }

  handleClick = () => {
    const { pattern } = this.state
    const { dispatch } = this.props
    dispatch(setPattern(pattern))
    browserHistory.push(getPath('/'))
  }

  render () {
    return (
      <div className={styles.container}>
        <p>Pick how much time you want to spend working on your goal.</p>
        <SimpleForm
          defaultPerWeek={DEFAULT_PER_WEEK}
          defaultPerDay={DEFAULT_PER_DAY}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleClick}>Get balance</Button>
      </div>
    )
  }
}

export default connect()(Workload)
