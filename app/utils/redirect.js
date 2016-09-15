import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

function redirect (ComposedComponent) {
  return class Redirect extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    componentDidMount () {
      const { location } = this.props
      const pathname = sessionStorage.getItem('pathname')
      sessionStorage.removeItem('pathname')
      if (pathname && pathname !== location.pathname) {
        browserHistory.push(pathname)
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }
}

export default redirect
