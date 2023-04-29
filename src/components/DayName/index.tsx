import React from 'react'
import { toTitleCase } from '../../functions/toTitleCase'

function DayName({name}:{name:String}) {
  return (
    <div className='bg-teal-100 h-10 flex justify-center items-center border-[1px] rounded-sm'>
        <h2 className='text-m tracking-wide font-medium text-gray-600 text'>{toTitleCase(name)}</h2>
    </div>
  )
}

export default DayName