import React, { useLayoutEffect, useState } from 'react'
import { MonthConstructor } from '../../utils/MonthConstructor'
import './DaysList.scss'

function DaysList() {

    const [months, setMonths] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState('05')
    const [modalId, setModalId] = useState(null)

    useLayoutEffect(() => {
        const result = new MonthConstructor()
        result.setResult()
        setMonths(result.getResult())
    }, [])

    console.log(months && months['01'][0])

  return (
    <div className='daysList'>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className='daysList-select'>
                <option value="01">Январь</option>
                <option value="02">Февраль</option>
                <option value="03">Март</option>
                <option value="04">Апрель</option>
                <option value="05">Май</option>
        </select>
        <div className="daysList__row">
            {months && months[String(selectedMonth)].map((day: any, dayIndex: number) => (
                <>
                    <div className="daysList-day" key={dayIndex} onClick={() => setModalId(day.day)}>
                        <p className='day-number'>{day.day}</p>
                    </div>
                    {modalId === day.day &&
                        <div className="day__modal">

                        </div>
                    }
                </>
            ))
            }
        </div>
    </div>
  )
}

export {DaysList}
