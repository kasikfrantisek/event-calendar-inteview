import React, { useState } from 'react'
import EventForm from '../EventForm';
import EventLarge from '../EventLarge';
import EventSmall from '../EventSmall';
import { Event } from '../../types/event'
import { Day } from '../../types/day';
import AddCircleOutline from 'react-ionicons/lib/AddCircleOutline';


function DayCell({data, fn, view, add, events, deleteEvent}:{data:Day, fn:Function, view:string, add:(data: Event) => void, deleteEvent:Function, events:Event[]}) {
  const date = `${data.year}-${data.month < 10 ?  '0' + (data.month + 1) : data.month + 1}-${data.day < 10 ? '0' + data.day : data.day}`
  const [showForm, setShowForm] = useState<boolean>(false)
  const toggleForm = () => setShowForm(() => !showForm)
  const currentStyle = 'text-sm font-bold bg-teal-600 self-center text-white flex justify-center items-center w-6 h-6 rounded-full mt-1 mb-1';
  const otherDayStyle = 'text-sm flex justify-center self-center items-center w-6 h-6 rounded-full mt-1 mb-1'
  const currentMonthStyle = 'bg-gray-100';
  const otherMonthStyle = 'bg-gray-300'
  const dayCellStyle = 'overflow-y-auto w-full h-20 flex flex-col justify-start items-start border-[1px] rounded-sm hover:cursor-pointer hover:bg-gray-200';

  let hours:JSX.Element[] = [];

  const hoursDisplay = () => {
    for(let i = 0; i <= 24; i++){
      hours.push(
        <div className='w-full border-t-solid border-t-[1px] flex flex-col justify-start p-[2px] items-start text-xs text-gray-300'>
          <p>{i}:00</p>
        </div>
      )
    }

    return(hours)
  }


  if(view === 'week') return (
    <div>
      <div className={`rounded-sm mb-[2px] flex flex-row justify-around ${!data.isCurrentDay ? 'bg-gray-200' : 'bg-teal-600 text-white font-medium'} `}>
        <h2 onClick={toggleForm}>{`${data.day}.${data.month + 1}.`}</h2>
        <button className='hover:cursor-pointer' onClick={toggleForm}>
          <AddCircleOutline width='20px' height='20px' color={!data.isCurrentDay ? '#000' : '#fff'} />
        </button>
      </div>
      <div className='relative'>
        <div className='grid grid-rows-day'>
          {hoursDisplay()}
        </div>
        <div className='grid grid-rows-day absolute w-full top-0'>
          {events.map((e, index) => {
            return <EventLarge event={e} key={index} deleteSelf={deleteEvent}/>
          })
        }
        </div>
      </div>
      {showForm && <EventForm close={toggleForm} date={date} addEvent={add}/>}
    </div>
  )

  return (
    <div onClick={() =>fn(data)} className={`${dayCellStyle}  ${data.isCurrentMonth ? currentMonthStyle : otherMonthStyle}`}>
        <div className={data.isCurrentDay ? currentStyle : otherDayStyle}>
          <h3 >{data.day}</h3>
        </div>
        {events.map((e, index) => {
          return <EventSmall event={e} key={index} />
        }
      
      )}
    </div>
  )
}

export default DayCell