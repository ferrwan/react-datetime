// @flow

import React, { Component } from 'react'
import moment from 'moment'
import type Moment from 'moment'

import HeaderText from './header-text'
import Calendar from './calendar'
import Footer from './footer'

type Props = {
  dateTimeValue: Moment,
  changeDateTime: (value: Moment) => void,
  inputRef: HTMLInputElement,
}

type State = {
  dateTime: Moment,
}

let dateTimeStyle = {}

export default class DateTimePicker extends Component<Props, State> {
  state: State = {
    dateTime: moment(),
  }

  componentWillMount() {
    const { dateTimeValue, inputRef } = this.props
    if (inputRef.offsetHeight) {
      dateTimeStyle.top = inputRef.offsetHeight
    }
    if (dateTimeValue) {
      this.setState({ dateTime: moment(dateTimeValue) })
    } else {
      this.setState({ dateTime: moment() })
    }
  }

  componentWillUnmount() {
    dateTimeStyle = {}
  }

  setToToday = (): void => {
    const dateTime = moment()

    this.props.changeDateTime(dateTime)
    this.setState({ dateTime })
  }

  dayClickHandler = (date: number, month?: number = -2): void => {
    const dateTime = moment(this.state.dateTime)
    if (month >= -1) {
      dateTime.set('month', month)
    }
    dateTime.set('date', date)

    this.props.changeDateTime(dateTime)
    if (month >= -1) {
      this.setState({ dateTime })
    }
  }

  changeMonthHandler = (condition: string): void => {
    const dateTime = moment(this.state.dateTime)
    const month = dateTime.get('M')
    if (condition === 'up') {
      if (month === 11) {
        dateTime.set('month', 0)
        dateTime.add(1, 'y')
      } else {
        dateTime.add(1, 'M')
      }
    } else if (condition === 'down') {
      if (month === 0) {
        dateTime.set('month', 11)
        dateTime.subtract(1, 'y')
      } else {
        dateTime.subtract(1, 'M')
      }
    }
    this.setState({ dateTime })
  }

  changeYearHandler = (condition: string) => {
    const dateTime = moment(this.state.dateTime)
    dateTime[condition === 'up' ? 'add' : 'subtract'](1, 'y')
    this.setState({ dateTime })
  }

  changeTimeHandler = (e: SyntheticEvent<HTMLSelectElement>, type: string = 'h') => {
    const { dateTimeValue } = this.props
    const dateTime = (dateTimeValue && moment(this.props.dateTimeValue)) || moment()
    dateTime.set(type, e.currentTarget.value)
    this.props.changeDateTime(dateTime)
    this.setState({ dateTime })
  }

  months = moment.months()

  render() {
    const { dateTime } = this.state
    const month = dateTime.get('M')
    const year = dateTime.get('y')

    const headerProps = {
      month: this.months[month],
      monthHandler: this.changeMonthHandler,
      year,
      yearHandler: this.changeYearHandler,
    }
    const calendarProps = {
      dateTime,
      dateTimeValue: this.props.dateTimeValue,
      dayHandler: this.dayClickHandler,
      months: this.months,
    }
    const footerProps = {
      changeTimeHandler: this.changeTimeHandler,
      dateTime,
      setToToday: this.setToToday,
    }

    return (
      <div className="datetime-picker-calendar" style={ dateTimeStyle }>
        <HeaderText { ...headerProps } />
        <Calendar { ...calendarProps } />
        <Footer { ...footerProps } />
      </div>
    )
  }
}
