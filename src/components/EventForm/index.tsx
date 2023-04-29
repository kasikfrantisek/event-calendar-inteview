import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Event } from '../../types/event';
import CloseOutline from 'react-ionicons/lib/CloseOutline';


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

  const handleKeyDown = (event:React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(sendData)();
    }
  };

  const labelStyle = 'mb-3';
  const inputStyle = 'focus:border-none focus:outline-teal-600 px-1';

  return (
    <div className='absolute z-20 w-full h-full backdrop-blur-[2px] bg-teal-600/20 flex justify-center items-center flex-col top-0 left-0'>
      <form onSubmit={handleSubmit(sendData)} onKeyDown={handleKeyDown} className='relative  bg-white rounded-md flex flex-col justify-center items-start px-3 py-4'>
        <button className='hover:cursor-pointer absolute top-1 right-1 hover:bg-teal-400 bg-teal-600 rounded' onClick={() => close()}>
          <CloseOutline color={'#fff'} height='15px' width='15px' />
        </button>
        <input className={'text-teal-600 focus:border-b-teal-600 focus:outline-none px-1 border-b-solid border-b-2 border-gray-30 mb-3 text-2xl font-semibold'} placeholder='Přidejte název' {...register('name', { required: true })} type='text' />
        <label className={labelStyle}>Od: <input className={inputStyle} {...register('since', { required: true })} type='datetime-local' min={date + 'T00:00'} max={date + 'T24:00'} defaultValue={date + 'T00:00'} step={3600} /> </label>
        <label className={labelStyle}>Do: <input className={inputStyle} {...register('till', { required: true })} type='datetime-local' min={date + 'T00:00'} max={date + 'T24:00'} defaultValue={date + 'T00:00'} step={3600} /> </label>
        <label className={labelStyle}>Barva: <input className={inputStyle} {...register('color', { required: true })} type='color' /> </label>
        <button type='submit' className='bg-teal-600 text-white font-medium px-2 py-1 rounded-sm'>Přidat</button>
      </form>
    </div>
  )
}

export default EventForm;
