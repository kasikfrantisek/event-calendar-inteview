import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Event } from '../../types/event';


type EventFormProps = {
  close: Function;
  date: string;
  addEvent: (data: Event) => void;
}

function EventForm({ close, date, addEvent }: EventFormProps) {
  const { register, handleSubmit } = useForm<Event>();

  const sendData: SubmitHandler<Event> = (data) => {
    close();
    addEvent(data);
  }

  return (
    <div className='absolute w-screen h-screen backdrop-blur-sm flex justify-center items-center flex-col top-0 left-0'>
      <div className='flex justify-between w-2/4'>
        <h2>Nová událost</h2>
        <button className='hover:cursor-pointer' onClick={() => close()}>&#9587;</button>
      </div>
      <form onSubmit={handleSubmit(sendData)} className='w-2/4 h-2/4 bg-white p-20 border-solid border-2 border-black flex flex-col '>
        <label>Jméno události: <input {...register('name', { required: true })} type='text' /> </label>
        <label>Od: <input {...register('since', { required: true })} type='datetime-local' min={date + 'T00:00'} max={date + 'T24:00'} defaultValue={date + 'T00:00'} step={3600} /> </label>
        <label>Do: <input {...register('till', { required: true })} type='datetime-local' min={date + 'T00:00'} max={date + 'T24:00'} defaultValue={date + 'T00:00'} step={3600} /> </label>
        <label>Barva: <input {...register('color', { required: true })} type='color' /> </label>
        <button type='submit'>Přidat</button>
      </form>
    </div>
  )
}

export default EventForm;
