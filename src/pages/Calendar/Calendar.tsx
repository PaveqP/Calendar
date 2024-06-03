import React from 'react'
import { Header, DaysList } from '../../modules'
import './Calendar.scss'

function Calendar() {

  return (
    <div className='calendar'>
        <Header/>
        <DaysList/>
    </div>
  )
}

export {Calendar}