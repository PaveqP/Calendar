import React from 'react'
import { Header, DaysList } from '../../modules'
import './Calendar.scss'

function Calendar() {

  return (
    <section className='calendar'>
        <Header/>
        <DaysList/>
    </section>
  )
}

export {Calendar}