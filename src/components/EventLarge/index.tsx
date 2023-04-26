import React from 'react'
import { Event } from '../../types/event'

function EventLarge({event}:{event:Event}) {
    function generateEventStyle(start: number, end: number, color: string) {
        return ({
          backgroundColor: `${color}`,
          gridRowStart: `${start + 2}`,
          gridRowEnd: `${end === 0 ? 25 : end + 1}`
      })
      }

    const start = new Date(event.since).getHours()
    const end = new Date(event.till).getHours()
    const style = generateEventStyle(start, end, event.color)
    return (
      <div style={style}>
        <h1>{event.name}</h1>
        <h3>{`${start}:00 - ${end}:00`}</h3>
      </div>
    )
  
}

export default EventLarge