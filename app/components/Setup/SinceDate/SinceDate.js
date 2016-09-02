import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import moment from 'moment'

import { fullCentered } from '../../../styles/fixtures'
import { setSinceDate } from '../../../actions'

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

  handleClick = () => {
    const { input } = this.state
    const { router, dispatch } = this.props

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
      <div className={css(styles.container)}>
        <label htmlFor="since-date-input">When did you start tracking time? (format YYYY-MM-DD)</label>
        <div>
          <input type="text" id="since-date-input" onChange={this.handleChange} />
          <button type="button" onClick={this.handleClick}>OK</button>
        </div>
        <div>
          {error && 'Invalid date!'}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...fullCentered,
    flexDirection: 'column',
  },
})

export default connect()(withRouter(SinceDate))
