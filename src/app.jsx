// @flow

import React, { Component } from 'react'
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

  setFormatText = (dateFormat: string = 'DD-MMM-YYYY', timeFormat: string = 'HH:mm:ss') => {
    const { showTime } = this.props
    let format = dateFormat
    if (showTime) {
      format += ` ${timeFormat}`
    }

    return format
  }

  dateTimeHandler = (value: ?string) => {
    this.setState({
      dateTimeValue: value,
    })
  }

  focusHandler = () => {
    const { isActive } = this.state
    if (!isActive) {
      document.addEventListener('click', this.clickOutsideHandler)
      this.setState({ isActive: true })
    }
  }

  blurHandler = () => {
    document.removeEventListener('click', this.clickOutsideHandler)
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
  clickOutsideHandler = (e: SyntheticMouseEvent<HTMLElement>) => {
    if ((this.node && this.node.contains(e.target)) || this.checkParent(e.target, 'week')) return
    this.blurHandler()
  }

  node = {}
  inputNode = {}

  removeBtn = () => {
    if (this.state.dateTimeValue) {
      return (
        <span
          className="rm-btn"
          onClick={ () => this.dateTimeHandler(null) }
          onKeyUp={ () => this.dateTimeHandler(null) }
          role="button"
          tabIndex={ -1 }
        >
          &times;
        </span>
      )
    }
    return null
  }

  render() {
    const { dateTimeValue, isActive } = this.state
    const value = dateTimeValue ? dateTimeValue.format(this.setFormatText()) : ''
    return (
      <div id="react-datetime" ref={ (node) => { this.node = node } }>
        <input ref={ (n) => { this.inputNode = n } } onFocus={ this.focusHandler } value={ value } />
        { this.removeBtn() }
        {
          isActive && (
            <DateTimePicker
              changeDateTime={ this.dateTimeHandler }
              dateTimeValue={ dateTimeValue }
              inputRef={ this.inputNode }
            />
          )
        }
      </div>
    )
  }
}