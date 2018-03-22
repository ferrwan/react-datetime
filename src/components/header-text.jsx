// @flow

import React, { Component } from 'react'

type Props = {
  month: string,
  monthHandler: (condition: string) => void,
  year: string,
  yearHandler: Function
}

type State = {
  yearToggle: boolean
}

export default class HeaderText extends Component<Props, State> {
  state: State = {
    yearToggle: false,
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { yearToggle } = this.state
    const { month, year } = this.props
    if ((month === nextProps.month && year === nextProps.year) && (yearToggle === nextState.yearToggle)) {
      return false
    }
    return true
  }

  yearToggleHandler = () => {
    const { yearToggle } = this.state
    this.setState({ yearToggle: !yearToggle })
  }

  render() {
    const { yearToggle } = this.state
    const { month, monthHandler, year, yearHandler } = this.props
    return (
      <div className="calendar-header">
        <button type="button" className="calendar-changer-btn" onClick={ () => monthHandler('down') }>
          <i className="arrow left" />
        </button>
        <div className="header-text">
          { month } &nbsp;
          <div className="year-text" onMouseEnter={ this.yearToggleHandler } onMouseLeave={ this.yearToggleHandler }>
            { year }
            { yearToggle && (
              <div className="year-btn-wrapper">
                <button type="button" className="calendar-changer-btn year-btn" onClick={ () => yearHandler('up') }>
                  <i className="arrow up" />
                </button>
                <button type="button" className="calendar-changer-btn year-btn" onClick={ () => yearHandler('down') }>
                  <i className="arrow down" />
                </button>
              </div>
            ) }
          </div>
        </div>
        <button type="button" className="calendar-changer-btn" onClick={ () => monthHandler('up') }>
          <i className="arrow right" />
        </button>
      </div>
    )
  }
}