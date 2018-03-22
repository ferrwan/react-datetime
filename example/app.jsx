// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import ReactDateTimePicker from 'react-date-time-picker'

import '../scss/style.scss'

const styles = {
  fontFamily: 'sans-serif',
}

ReactDOM.render(
  <div style={ styles }>
    <form>
      <div>
        <label>Date Time Picker</label>
        <ReactDateTimePicker />
      </div>
    </form>
  </div>,
  document.getElementById('app')
)
