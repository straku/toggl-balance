import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { InlineForm } from 'rebass'

import { getPath } from '../../../utils/router'

import Loader from '../../Loader/Loader'

import { getUser } from '../../../actions'
import { User } from '../../../selectors'

import styles from './Token.scss'

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

  handleClick = (e) => {
    const { dispatch } = this.props
    const { input } = this.state

    e.preventDefault()

    dispatch(getUser(input))
  }

  render () {
    const { status, name } = this.props

    return (
      <div className={styles.container}>
        <p>Please provide Toggl API token</p>
        <InlineForm
          buttonLabel="OK"
          label="Toggl API token"
          name="token"
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <div>
          {status === 'LOADING' && <Loader />}
          {name &&
            <p>
              {'Hi, '}
              <strong>{name}</strong>
              {'! Your token looks great, '}
              <Link className={styles.link} to={getPath('/setup/since')}>proceed</Link>
              {' to next step.'}
            </p>
          }
        </div>
      </div>
    )
  }
}

export default connect(User.select)(Token)
