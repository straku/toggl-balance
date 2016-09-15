import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import { Input } from 'rebass'

import { getPattern } from '../../../../calc/time'

import styles from './SimpleForm.scss'

const ABBREVIATIONS = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.']

function isValid (value, min, max) {
  if (value === '') return true

  const parsed = parseInt(value, 10)
  return !isNaN(parsed) && parsed >= min && parsed <= max
}

function getDateIndicator (abbr) {
  if (!abbr) return ''

  const mon = ABBREVIATIONS[0]
  if (abbr === mon) return `[ ${mon} ]`

  return `[ ${mon} - ${abbr} ]`
}

class SimpleForm extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    defaultPerWeek: PropTypes.number,
    defaultPerDay: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    defaultPerWeek: 5,
    defaultPerDay: 8,
    onChange: x => x,
    onFocus: x => x,
  }

  state = {
    perWeek: this.props.defaultPerWeek,
    perDay: this.props.defaultPerDay,
    lastDay: ABBREVIATIONS[this.props.defaultPerWeek - 1],
  }

  handleChange () {
    const { perWeek, perDay } = this.state
    const { onChange } = this.props
    const perWeekValue = parseInt(perWeek, 10) || 0
    const perDayValue = parseInt(perDay, 10) || 0
    const pattern = getPattern(perWeekValue, perDayValue)

    onChange(pattern)
  }

  handlePerWeekChange = (e) => {
    const { value } = e.currentTarget
    if (isValid(value, 1, 7)) {
      this.setState({
        perWeek: value,
        lastDay: value === '' ? null : ABBREVIATIONS[parseInt(value, 10) - 1],
      }, () => this.handleChange())
    }
  }

  handlePerDayChange = (e) => {
    const { value } = e.currentTarget
    if (isValid(value, 1, 24)) {
      this.setState({
        perDay: value,
      }, () => this.handleChange())
    }
  }

  render () {
    const { disabled, onFocus } = this.props
    const { perWeek, perDay, lastDay } = this.state
    return (
      <div
        className={cx(styles.container, { [styles.containerDisabled]: disabled })}
        onClick={() => console.log('click')}
      >
        <div className={styles.inline}>
          <Input
            id="days-per-week"
            label=""
            name="per-week"
            disabled={disabled}
            value={perWeek}
            onChange={this.handlePerWeekChange}
            onFocus={onFocus}
          />
          <label htmlFor="days-per-week" className={styles.label}>
            {'days per week '}
            <span className={styles.faded}>
              {getDateIndicator(lastDay)}
            </span>
          </label>
        </div>
        <div className={styles.inline}>
          <Input
            id="hours-per-day"
            label=""
            name="per-day"
            disabled={disabled}
            value={perDay}
            onChange={this.handlePerDayChange}
            onFocus={onFocus}
          />
          <label htmlFor="hours-per-day" className={styles.label}>
            hours per day
          </label>
        </div>
      </div>
    )
  }
}

export default SimpleForm
