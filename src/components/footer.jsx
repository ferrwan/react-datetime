// @flow

import React, { Component } from 'react'
import type { Node } from 'react'
import type Moment from 'moment'

import Time from './time'

type Props = {
  changeTimeHandler: (e: SyntheticEvent<HTMLSelectElement>, type: string) => void,
  dateTime: Moment,
  setToToday: () => void,
}

type State = {
  openClock: boolean,
}

export default class Footer extends Component<Props, State> {
  state = {
    openClock: false,
  }

  getTime = (type: string = 'h') => this.props.dateTime.get(type)

  openClockHandler = () => {
    this.setState({ openClock: !this.state.openClock })
  }

  renderTimeOptions = (num: number, type: string = 'h'): Node => {
    const options = []
    const value = this.getTime(type)
    for (let i = 0; i < num; i += 1) {
      options.push(<option key={ i }>{ i }</option>)
    }

    return (
      <select
        value={ value }
        onChange={ e => this.props.changeTimeHandler(e, type) }
      >
        { options }
      </select>
    )
  }

  render() {
    const { openClock } = this.state
    const { setToToday } = this.props
    const hour = this.getTime()
    const minute = this.getTime('m')
    const second = this.getTime('s')
    const timeProps = {
      renderTimeOptions: this.renderTimeOptions,
    }

    return (
      <div className="calendar-footer">
        <button type="button" onClick={ setToToday }>Today</button>
        <div>
          <button
            type="button"
            onClick={ this.openClockHandler }
          >
            { hour }:{ minute }:{ second }
          </button>
        </div>
        <div className={ `clock-container${openClock ? ' open' : ''}` }>
          <div className="close-btn">
            <button
              type="button"
              onClick={ this.openClockHandler }
            >
              <i className="arrow down" />
            </button>
          </div>
          <Time { ...timeProps } />
        </div>
      </div>
    )
  }
}
