// @flow

import React from 'react'
import type { Node } from 'react'

type Props = {
  renderTimeOptions: (num: number, type?: string) => Node,
}

const Time = (props: Props) => {
  const { renderTimeOptions } = props
  const HourNode = () => renderTimeOptions(24)
  const MinuteNode = () => renderTimeOptions(60, 'm')
  const SecondNode = () => renderTimeOptions(60, 's')

  return (
    <div>
      <HourNode />
      <MinuteNode />
      <SecondNode />
    </div>
  )
}

export default Time
