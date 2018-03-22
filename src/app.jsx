// @flow

import React, { Component } from 'react'
import moment from 'moment'
import type Moment from 'moment'

import DateTimePicker from './components/date-time-picker'

type Props = {
  showTime: boolean,
}

type State = {
  dateTimeValue: Moment,
  isActive: boolean,
}

export default class App extends Component<Props, State> {
  static defaultProps = {
    showTime: true,
  }

  state: State = {
    dateTimeValue: null,
    isActive: false,
  }

  node = {}

  dateTimeHandler = (value: string) => {
    this.setState({
      dateTimeValue: value,
    })
  }

  focusHandler = () => {
    const { isActive } = this.state
    if (!isActive) {
      document.addEventListener('click', this.clickOutsideHandler, false)
      this.setState({ isActive: true })
    }
  }

  blurHandler = () => {
    document.removeEventListener('click', this.clickOutsideHandler, false)
    this.setState({ isActive: false })
  }

  checkParent = (elm: HTMLElement, className: string) => {
    if (!elm) {
      return false
    } else if (elm && elm.classList.contains(className)) {
      return true
    }
    return this.checkParent(elm.parentElement, className)
  }

  // Handle click event for toggling calendar if isActive
  clickOutsideHandler = (e: SyntheticEvent<HTMLElement>) => {
    if ((this.node && this.node.contains(e.target)) || this.checkParent(e.target, 'week')) return
    this.blurHandler()
  }

  setFormatText = (dateFormat: string = 'DD-MMM-YYYY', timeFormat: string = 'HH:mm:ss') => {
    const { showTime } = this.props
    let format = dateFormat
    if (showTime) {
      format += ` ${timeFormat}`
    }

    return format
  }

  render() {
    // const { moment } = this.props
    const { dateTimeValue, isActive } = this.state
    const value = dateTimeValue ? dateTimeValue.format(this.setFormatText()) : ''
    return (
      <div id="react-date-time-picker" ref={ (node) => { this.node = node } }>
        <input onFocus={ this.focusHandler } value={ value } />
        {
          isActive && (
            <DateTimePicker
              changeDateTime={ this.dateTimeHandler }
              dateTimeValue={ dateTimeValue }
            />
          )
        }
      </div>
    )
  }
}
