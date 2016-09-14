import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { InlineForm } from 'rebass'

import { setSinceDate } from '../../../actions'

import styles from './SinceDate.scss'

class SinceDate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  state = {
    input: '',
    error: null,
  }

  handleChange = (e) => {
    this.setState({
      input: e.currentTarget.value,
    })
  }

  handleClick = (e) => {
    const { input } = this.state
    const { router, dispatch } = this.props

    e.preventDefault()

    const date = moment(input, 'YYYY-MM-DD')
    const isValid = date.isValid()

    this.setState({
      error: !isValid,
    }, () => {
      if (isValid) {
        dispatch(setSinceDate(input))
        router.push('/')
      }
    })
  }

  render () {
    const { error } = this.state
    return (
      <div className={styles.container}>
        <p>When did you start tracking time? (format YYYY-MM-DD)</p>
        <InlineForm
          buttonLabel="OK"
          label="Date of start time tracking"
          name="start-date"
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        {error && <p>Invalid date!</p>}
      </div>
    )
  }
}

export default connect()(withRouter(SinceDate))
