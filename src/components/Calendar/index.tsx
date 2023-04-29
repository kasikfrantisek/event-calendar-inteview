import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/cs'
import weekdayPlugin from 'dayjs/plugin/weekday'
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import weekOfYear from 'dayjs/plugin/weekOfYear'
import Header from '../Header';
import Week from '../Week';
import DayCell from '../Day';
import { Day } from '../../types/day';
import { Event } from '../../types/event';
  
  type Dates = {
    dates: Day[];
  }[];

function Calendar() {
    dayjs.extend(weekdayPlugin)
    dayjs.extend(objectPlugin)
    dayjs.extend(isTodayPlugin)
    dayjs.extend(weekOfYear)
    const dateFormat = 'MMMM YYYY';
    
    const now = dayjs().locale({
        ...locale,
    });
    
    const [currentMonth, setCurrentMonth] = useState(now)
    const [arrayOfDays, setArrayOfDays] = useState<Dates>([])
    const [currentWeek, setCurrentWeek] = useState(now)
    const [view, setView] = useState<string>('month')
    const [events, setEvents] = useState<Event[]>([])

    const addEvent = (data:Event) => {
      setEvents(prev => {
        return [...prev, data]
      })
    }

    const deleteEvent = (event:Event) => {
      const index = events.indexOf(event)
      events.splice(index, 1) // remove one element at the specified index
      setEvents([...events]) // update the state with a new array containing the modified elements
    }

    const next = () => {
      if(view === 'month'){
        setCurrentMonth(() => currentMonth.add(1, 'month'));
      } else if(view === 'week'){
        setCurrentWeek(() => currentWeek.add(1, 'week'))
      }
    }

    const prev = () => {
      if(view === 'month'){
        setCurrentMonth(() => currentMonth.subtract(1, 'month'));
      } else if(view === 'week'){
        setCurrentWeek(() => currentWeek.subtract(1, 'week'))
        setCurrentMonth(() => now)
      }
    }

    const formateDayObject = (date:dayjs.Dayjs) => {
        const clonedObject = {...date.toObject()}
        const formatedObject = {
            day: clonedObject.date,
            week: date.week(),
            month: clonedObject.months,
            year: clonedObject.years,
            isCurrentMonth: clonedObject.months === currentMonth.month(),
            isCurrentDay: date.isToday()
        };

        return formatedObject
    }

    const getAllDaysMonth = () => {
        let currentDate = currentMonth.startOf('month').weekday(0);
      
        let allDates = [];
        let weekDates = [];
        let weekCounter = 1;
      
        while (currentDate.isSame(currentMonth, 'month') || currentDate.isBefore(currentMonth.endOf('month')) || weekDates.length > 0) {
          const formated = formateDayObject(currentDate);
          weekDates.push(formated);
      
          if (weekCounter === 7) {
            allDates.push({ dates: weekDates });
            weekDates = [];
            weekCounter = 0;
          }
      
          weekCounter++;
          currentDate = currentDate.add(1, 'day');
        }
      
        setArrayOfDays(allDates);
      };
    
    const getAllDaysWeek = () => {
      let currentDate = currentWeek.startOf('week')
      let allDates = [];
      let weekDates = [];

      while (currentDate.isSame(currentWeek, 'week')) {
        const formated = formateDayObject(currentDate)
        weekDates.push(formated)

        if(weekDates.length === 7){
          allDates.push({ dates: weekDates });
        }

        currentDate = currentDate.add(1, 'day')
      }

      setArrayOfDays(allDates);
    }
      

    useEffect(() => {
        if(view === 'month'){
          getAllDaysMonth()
        } else if(view === 'week'){
          getAllDaysWeek()
        }
    }, [currentMonth, currentWeek, view])

    const changeWeek = (data:Day) => {
      if(data.week > currentWeek.week()){
        setCurrentWeek(() => currentWeek.add(data.week - currentWeek.week(), 'week'))
      } else if (currentWeek.week() > data.week){
        setCurrentWeek(() => currentWeek.subtract(currentWeek.week() - data.week, 'week'))
      }

      setView(() => 'week')
    }


    const renderCells = () => {
        const rows:JSX.Element[] = [];
        let days:JSX.Element[] = [];
        let eventsDay:Event[] = []

        arrayOfDays.forEach((week, index) => {
            week.dates.forEach((d, i) => {
                events.forEach((e) => {
                  const sameDay = new Date(e.since).getDate() === d.day;
                  const sameMonth = new Date(e.since).getMonth() === d.month;
                  if(sameDay && sameMonth){
                    eventsDay.push(e)
                  }
                })
                days.push(
                    <DayCell data={d} key={i} fn={changeWeek} view={view} add={addEvent} deleteEvent={deleteEvent} events={eventsDay}/>
                )
                eventsDay = []
            })
            rows.push(
                <div className='grid gap-[2px] mb-[2px] grid-cols-7' key={index}>{days}</div>
            )
            days = []
        })
        return <div className='w-full h-full self-center'>{rows}</div>
    }

    const changeView = () => {
      setCurrentMonth(() => currentMonth.set('month', currentWeek.month()))
      setCurrentWeek(() => now)
     return view === 'month' ? setView(() => 'week') : setView(() => 'month')
    }

    const currentState = () => {
      setCurrentWeek(() => now)
      setCurrentMonth(() => now)
    }


  return (
    <div className='flex flex-col justify-center'>
        <Header prevFn={prev} nextFn={next} changeView={changeView} currentDay={currentState} current={currentMonth.format(dateFormat)} view={view} week={currentWeek.week()}/>
        <Week now={now} />
        {renderCells()}
    </div>
  )
}

export default Calendar