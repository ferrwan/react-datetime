// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import ReactDateTime from 'react-date-time'

import './example.scss'

ReactDOM.render(
  <React.Fragment>
    <div className="header">
      <h2>ReactDateTime</h2>
    </div>
    <div className="content">
      <div>
        <b>Basic Usage</b>
        <ReactDateTime />
      </div>
    </div>
  </React.Fragment>,
  document.getElementById('app')
)
