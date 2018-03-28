// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import ReactDateTime from 'react-datetime'

import './example.scss'

ReactDOM.render(
  <React.Fragment>
    <div className="header">
      <h2>React DateTime</h2>
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
