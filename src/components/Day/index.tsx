import React, { useState } from 'react'
import EventForm from '../EventForm';
import EventLarge from '../EventLarge';
import { Event } from '../../types/event'
import { Day } from '../../types/day';


function DayCell({data, fn, view}:{data:Day, fn:Function, view:string}) {
  const date = `${data.year}-${data.month < 10 ?  '0' + (data.month + 1) : data.month + 1}-${data.day < 10 ? '0' + data.day : data.day}`
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const toggleForm = () => setShowForm(() => !showForm)

  const addEvent = (data:Event) => {
    setEvents(prev => {
      return [...prev, data]
    })
  }

 

  if(view === 'week') return (
    <div className='grid grid-rows-day gap-1'>
      <div className='row-start-1 row-end-2'>
        <h2 onClick={toggleForm}>{data.day}</h2>
      </div>
      {events.map((e, index) => {
        if(data.day === new Date(e.since).getDate() && data.month === new Date(e.since).getMonth()){
          console.log(true)
          return <EventLarge event={e} key={index} />
        }
      }
      )}
      {showForm && <EventForm close={toggleForm} date={date} addEvent={addEvent}/>}
    </div>
  )

  return (
    <div onClick={() => fn(data)} className='w-full h-16 flex justify-end content-start border-2 border-gray-500'>
        <h3 className='text-m'>{data.day}</h3>
    </div>
  )
}

export default DayCell