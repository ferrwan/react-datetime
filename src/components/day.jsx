// @flow

import React from 'react'

const Day = ({ date, dayClassName, onDayClick }: Object) => (
  <div className={ dayClassName } onClick={ onDayClick } role="presentation">
    { date }
  </div>
)

export default Day
