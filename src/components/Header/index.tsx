import React from 'react'

function Header({prevFn, nextFn, current, view, week}:{prevFn:Function, nextFn: Function, current:string, view:string, week:number}) {

    function toTitleCase(str:String) {
        return str.toLowerCase().split(' ').map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
      }

      let header = view === 'month' ? toTitleCase(current) : `${week}. Týden`

  return (
    <div className='flex flex-row justify-around'>
        <button className='text-xl font-semibold hover:cursor-pointer' onClick={() => prevFn()}>&larr;</button>
        <h2 className='text-2xl font-bold' >{header}</h2>
        <button className='text-xl font-semibold hover:cursor-pointer' onClick={() => nextFn()}>&rarr;</button>
    </div>
  )
}

export default Header