import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { RouteTransition, presets } from 'react-router-transition'

function isNext (route, previousPath, nextPath) {
  const previousIndex = route.childRoutes.findIndex(item => item.path === previousPath)
  const nextIndex = route.childRoutes.findIndex(item => item.path === nextPath)
  return nextIndex > previousIndex
}

function getPath (props) {
  const { location: { pathname } } = props
  return _.last(pathname.split('/'))
}

import styles from './Setup.scss'

class Setup extends Component {
  state = {
    next: true,
  }

  componentWillReceiveProps (props) {
    const { route } = this.props
    const previousPath = getPath(this.props)
    const nextPath = getPath(props)
    this.setState({
      next: isNext(route, previousPath, nextPath),
    })
  }

  render () {
    const { next } = this.state
    const { children, location } = this.props
    const { mapStyles, ...preset } = next ? presets.slideRight : presets.slideLeft
    return (
      <RouteTransition
        pathname={location.pathname}
        component="div"
        className={styles.container}
        mapStyles={s => ({
          ...mapStyles(s),
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
        })}
        {...preset}
      >
        {children}
      </RouteTransition>
    )
  }
}

Setup.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default Setup
