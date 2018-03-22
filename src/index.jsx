// @flow

import React from 'react'
import moment from 'moment'

import App from './app'

import '../scss/style.scss'

moment.locale('id')

function ReactDateTimePicker() {
  return <div><App /></div>
}

export default ReactDateTimePicker
