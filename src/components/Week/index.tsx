import React from 'react'
import dayjs from 'dayjs'
import weekdayPlugin from 'dayjs/plugin/weekday'
import DayName from '../DayName'

function Week({now}:{now:dayjs.Dayjs}) {
    dayjs.extend(weekdayPlugin)
    const dateFormat = 'dddd';
    const days = [];

    for(let i = 0; i < 7; i++){
        days.push(
            <DayName key={i} name={now.weekday(i).format(dateFormat)} />
        )
    }

    return <div className='grid grid-cols-7 w-2/4 self-center'>{days}</div>
}

export default Week