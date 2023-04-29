import React from 'react'
import { toTitleCase } from '../../functions/toTitleCase'
import { CaretForwardOutline, CaretBackOutline, TodayOutline, CalendarOutline } from 'react-ionicons'

function Header({prevFn, nextFn, current, view, week, changeView, currentDay}:{prevFn:Function, nextFn: Function, current:string, view:string, week:number, changeView:Function, currentDay:Function}) {

      let header = view === 'month' ? toTitleCase(current) : `${week}. Týden`
      let buttonStyle = 'hover:cursor-pointer hover:bg-teal-400 bg-teal-600 rounded justify-center h-8 w-8 flex flex-row items-center justify-center'

  return (
    <div className='flex flex-row justify-between px-2 h-20 mb-2 items-end'>
        <h2 className='text-3xl font-bold text-teal-600' >{header}</h2>
        <div className='space-x-1 flex flex-row'>  
          <button title='previous' className={buttonStyle} onClick={() => prevFn()}>
            <CaretBackOutline color={'#fff'} height='25px' width='25px'  />
          </button>
          <button title='change view' className={buttonStyle} onClick={() => changeView()}>
            <CalendarOutline color={'#fff'} height='25px' width='25px'/>
          </button>
          <button title='today' className={buttonStyle} onClick={() => currentDay()}>
            <TodayOutline color={'#fff'} height='25px' width='25px'/>
          </button>
          <button title='next' className={buttonStyle} onClick={() => nextFn()}>
            <CaretForwardOutline color={'#fff'} height='25px' width='25px'/>
          </button>
        </div>
    </div>
  )
}

export default Header