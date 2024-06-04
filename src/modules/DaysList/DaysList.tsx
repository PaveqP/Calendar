import React, { useEffect, useState } from 'react'
import { MonthConstructor } from '../../utils/MonthConstructor'
import { DayType } from './DaysListTypes'
import { Modal, MonthSelector } from '../../components'
import './DaysList.scss'

function DaysList() {

    const [months, setMonths] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState('01')
    const [modalId, setModalId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [todos, setTodos] = useState<any>(() => {
        const savedTasks = localStorage.getItem('currentTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });

    const fetchData = async () => {
        const result = new MonthConstructor();
        await result.setResult();
        console.log(result.getResult())
        setMonths(result.getResult());
        setLoading(result.isLoading());
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('currentTasks', JSON.stringify(todos))
    }, [todos])

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='daysList'>
            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
            <div className="daysList__row">
                {months[String(selectedMonth)].map((day: DayType, dayIndex: number) => (
                    <div key={dayIndex}>
                        <div className={day.type === '0' ? 'daysList-day day' : 'daysList-holiday day'} key={dayIndex} onClick={() => setModalId(`${day.day}.${day.month}.${day.year}`)}>
                            <p className='day-number'>{day.day}</p>
                            <div className='day__count'>
                                <p className='day-countName'>Количество задач: </p>
                                {todos[`${day.day}.${day.month}.${day.year}`] ? todos[`${day.day}.${day.month}.${day.year}`].length : 0}
                            </div>
                        </div>
                        {modalId === `${day.day}.${day.month}.${day.year}` &&
                            <Modal day={day} todos={todos} setTodos={setTodos} modalId={modalId} setModalId={setModalId}/>
                        }
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export { DaysList }
