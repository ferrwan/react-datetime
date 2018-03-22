// @flow

import React, { Component } from 'react'
import moment from 'moment'
import type Moment from 'moment'

import Day from './day'

import times from '../lib/times'

type Props = {
  dateTime: Moment,
  dateTimeValue: Moment,
  dayHandler: (date: number, month?: number) => void,
  months: Moment,
}

// CONSTANT VARIABLE
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const currentTime = new Date()

// CHECK IS LEAP YEAR
const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export default class Calendar extends Component<Props> {
  isToday = (date: Moment, month: Moment, year: Moment) => (
    date === currentTime.getDate() &&
    month === currentTime.getMonth() &&
    year === currentTime.getFullYear()
  )

  isSelected = (date: Moment, month: Moment, year: Moment) => {
    const { dateTimeValue } = this.props
    if (dateTimeValue) {
      return date === dateTimeValue.get('D') && month === dateTimeValue.get('M') && year === dateTimeValue.get('Y')
    }
    return
  }

  renderWeekDays = () => {
    const weekDays = moment.weekdaysShort()
    const nodes = weekDays.map((weekday, index) => (
      <div key={ weekday } className={ `week-day flex-container ${index === 6 ? 'off-week-head' : ''}` }>
        { weekday }
      </div>
    ))

    return nodes
  }

  render() {
    const { dateTime, dayHandler, months } = this.props

    const month = dateTime.get('M')
    const year = dateTime.get('y')

    const firstDay = moment([year, month]).get('d')
    const totalDays = (month !== 1 && days[month]) || ((isLeapYear(year) && 29) || 28)
    const content = []

    // CREATE DAY NAME
    content.push(<div className="week-head" key={ `${months[month]}-0` }>{ this.renderWeekDays() }</div>)

    let cell = []
    // CREATE PREVIOUS MONTH DAYS
    // Week Start on Sunday
    const monWeekStart = false
    const nextMonth = month + 1
    const prevMonth = month ? month - 1 : 11
    let totalPrevDays = firstDay
    let dayClassName = ''
    if (monWeekStart) {
      totalPrevDays = firstDay ? firstDay - 1 : 6
    }

    times(totalPrevDays, (index) => {
      const tmp = ((prevMonth !== 1 && days[prevMonth]) || ((isLeapYear(year) && 29) || 28)) - totalPrevDays
      const prevDay = tmp + index + 1
      const today = this.isToday(prevDay, prevMonth, month ? year : year - 1) ? ' today' : ''
      dayClassName = `day other-month${today}`
      cell.push(<Day
        key={ `${months[prevMonth]}-${prevDay}` }
        dayClassName={ dayClassName }
        onDayClick={ () => dayHandler(prevDay, month - 1) }
        date={ prevDay }
      />)
    })

    // CREATE CURRENT MONTH DAYS
    times(totalDays, (index) => {
      dayClassName = `day${this.isToday(index + 1, month, year) ? ' today' : ''}${this.isSelected(index + 1, month, year) ? ' selected' : ''}`
      cell.push(<Day
        key={ `${months[month]}-${index + 1}` }
        dayClassName={ dayClassName }
        onDayClick={ () => dayHandler(index + 1) }
        date={ index + 1 }
      />)

      if (cell.length === 7) {
        content.push(<div className="week" key={ `${months[month]}-${content.length}` }>{ cell }</div>)
        cell = []
      } else if (index === totalDays - 1) {
        // CREATE THE NEXT MONTH DAYS
        times(7 - cell.length, (idx) => {
          const nextDay = idx + 1
          const today = this.isToday(nextDay, nextMonth, nextMonth < 12 ? year : year + 1) ? ' today' : ''
          cell.push(<Day
            key={ `${months[nextMonth % 12]}-${nextDay}` }
            dayClassName={ `day other-month${today}${cell.length === 6 ? ' off-day' : ''}` }
            onDayClick={ () => dayHandler(nextDay, nextMonth) }
            date={ idx + 1 }
          />)
        })
        content.push(<div className="week flex-container" key={ `${months[month]}-${content.length}` }>{ cell }</div>)
      }
    })

    return (
      <div className="datetime-calendar-body">
        { content }
      </div>
    )
  }
}
