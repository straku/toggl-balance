import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'

import { InlineForm } from 'rebass'

import { getPath } from '../../../utils/router'

import Loader from '../../Loader/Loader'

import { link, fullCentered } from '../../../styles/fixtures'
import { inline } from '../../../styles/utils'

import { getUser } from '../../../actions'
import { User } from '../../../selectors'

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
      <div className={css(styles.container)}>
        <p>Please provide Toggl API token</p>
        <InlineForm
          buttonLabel="OK"
          label="Toggl API token"
          name="token"
          style={inline(styles.input)}
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
              <Link className={css(styles.link)} to={getPath('/setup/since')}>proceed</Link>
              {' to next step.'}
            </p>
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
    width: '375px',
  },
  link: {
    ...link,
  },
})

export default connect(User.select)(Token)
