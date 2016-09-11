import React, { Component } from 'react'
import { browserHistory } from 'react-router'

function redirect (ComposedComponent) {
  return class Redirect extends Component {
    componentDidMount () {
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
