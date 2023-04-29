import React from 'react'
import { Event } from '../../types/event'
import TrashOutline from 'react-ionicons/lib/TrashOutline'

function EventLarge({event, deleteSelf}:{event:Event, deleteSelf:Function}) {
    function generateEventStyle(start: number, end: number, color: string) {
        return ({
          backgroundColor: `${color}`,
          gridRowStart: `${start + 1}`,
          gridRowEnd: `${end === 0 ? 25 : end + 1}`
      })
      }

    const start = new Date(event.since).getHours()
    const end = new Date(event.till).getHours()
    const style = generateEventStyle(start, end, event.color)
    return (
      <div style={style} className='overflow-y-auto flex flex-col justify-start items-start pt-1 px-1 z-10 w-full pb-[2px] border-b border-b-white shadow-inner relative'>
        <button className='hover:cursor-pointer absolute top-1 right-1' onClick={() => deleteSelf(event)}>
          <TrashOutline color={'#919191'} width='12px' height='12px' />
        </button>
        <h3 className='text-xs'>{`${start}:00 - ${end}:00`}</h3>
        <h1 className='text-s font-semibold'>{event.name}</h1>
      </div>
    )
  
}

export default EventLarge