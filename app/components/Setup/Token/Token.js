import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'

import { fullCentered } from '../../../styles/fixtures'

import { getUser } from '../../../actions'
import { STATUS, User } from '../../../selectors'

class Token extends Component {
  static propTypes = {
    ...User.propTypes,
    dispatch: PropTypes.func,
  }

  state = {
    input: '',
  }

  handleChange = (e) => {
    this.setState({
      input: e.currentTarget.value,
    })
  }

  handleClick = () => {
    const { dispatch } = this.props
    const { input } = this.state
    dispatch(getUser(input))
  }

  render () {
    const { input } = this.state
    const { status, token, name } = this.props

    return (
      <div className={css(styles.container)}>
        <label htmlFor="token-input">Please provide Toggl API token</label>
        <div>
          <input
            type="text"
            id="token-input"
            value={status === STATUS.success ? token : input}
            className={css(styles.input)}
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.handleClick}>OK</button>
        </div>
        <div>
          {status === STATUS.loading && 'Loading...'}
          {name &&
            <div>
              {`Hi, ${name}! Your token looks great, `}
              <Link to="/setup/since">proceed</Link> to next step.
            </div>
          }
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
  input: {
    width: '200px',
  },
})

export default connect(User.select)(Token)
