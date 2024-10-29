import Navbar from '@components/Navbar'
import LeftPanel from '@components/left-panel'
import React from 'react'
import 'react-calendar/dist/Calendar.css';

import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const CalendarPage = () => {
  const [date, setDate] = useState<Value>(new Date());

  /* function reacttoDate(){
    alert('Pani, hemi ni ah hian date i nei lo. Ni dangah pawh i nei chuang loang!!');
    console.log(value);
  } */
  const onDateChange = (newDate:Value) => {
    setDate(newDate);
    alert(newDate)
}

  return (
    <>
     <Navbar/>

            <div className='flex flex-cols-2 relative'>
            <LeftPanel/>

            <div className='mx-auto'>
      <Calendar onChange={onDateChange} value={date} />
    </div>

</div>



    </>
  )
}

export default CalendarPage