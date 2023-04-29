import React from 'react'
import { Event } from '../../types/event'

function EventSmall({event}:{event:Event}) {
    const start = new Date(event.since).getHours()
    const name = event.name.length > 15 ? event.name.substring(0, 14) + '...' : event.name 
  return (
    <div className='text-xs w-[98%] rounded-sm self-center flex flex-row' style={{backgroundColor: event.color}}>
        <p className='font-bold ml-1 mr-1'>{start + ':00'}</p>
        <p>{name}</p>
    </div>
  )
}

export default EventSmall