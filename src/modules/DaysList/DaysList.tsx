import React, { useEffect, useState } from 'react'
import { MonthConstructor } from '../../utils/MonthConstructor'
import { DayType, MonthsType, TodosType } from './DaysListTypes'
import { Modal, MonthSelector } from '../../components'
import { LeftArrow, RightArrow } from '../../ui'
import './DaysList.scss'

function DaysList() {

    const [months, setMonths] = useState<MonthsType | undefined>()
    const [selectedMonth, setSelectedMonth] = useState<string>(() => {
        const date = new Date().getMonth() + 1;
        return date < 10 ? `0${date}` : `${date}`; 
    });    
    const [modalId, setModalId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [todos, setTodos] = useState<TodosType>(() => {
        const savedTasks = localStorage.getItem('currentTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });
    const [showByWeek, setShowByWeek] = useState<boolean>(true)
    const [currentWeek, setCurrentWeek] = useState<number>(0)
    const [weeks, setWeeks] = useState<DayType[][]>()

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
        if (months && months[selectedMonth]) {
            const days = months[selectedMonth];
            const weeks: DayType[][] = [];
            let currentWeek: DayType[] = [];

            days.forEach((day, index) => {
                currentWeek.push(day);
                if (currentWeek.length === 7 || index === days.length - 1) {
                    weeks.push(currentWeek);
                    currentWeek = [];
                }
            });

            setWeeks(weeks);
        }

        console.log(weeks && weeks)
    }, [months, selectedMonth]);

    const plusWeek = () => {
        if (!weeks) return
        if ((currentWeek + 1) < weeks.length){
            setCurrentWeek(currentWeek => currentWeek + 1)
        }
    }

    const minusWeek = () => {
        if (!weeks) return
        if ((currentWeek - 1) >= 0){
            setCurrentWeek(currentWeek => currentWeek - 1)
        }
    }

    useEffect(() => {
        localStorage.setItem('currentTasks', JSON.stringify(todos))
    }, [todos])

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <section className='daysList'>
            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} showByWeek={showByWeek} setShowByWeek={setShowByWeek}/>
            {showByWeek &&
                <div className="daysList__week">
                    <div className="week__scroller">
                        <button className="week-plus" onClick={() => minusWeek()}>
                            <LeftArrow/>
                        </button>
                        {weeks && weeks.map((week: any, weekIndex: number) => (
                            <div className={weekIndex === currentWeek ? "week-active" : "week-element"}>

                            </div>
                        ))
                        }
                        <button className="week-minus" onClick={() => plusWeek()}>
                            <RightArrow/>
                        </button>
                    </div>
                    <div className="daysList__weekRow">
                        {weeks && weeks[currentWeek].map((day: DayType, dayIndex: number) => (
                            <div key={dayIndex}>
                                <div
                                    className={day.type === '0' ? 'daysList-day day' : 'daysList-holiday day'} 
                                    key={dayIndex} 
                                    onClick={() => setModalId(`${day.day}.${day.month}.${day.year}`)}
                                >
                                    <p className='day-number'>
                                        {day.day}
                                    </p>
                                    <div className='day__count'>
                                        <p className='day-countName'>Количество задач: </p>
                                        {
                                            todos[`${day.day}.${day.month}.${day.year}`] ? 
                                            todos[`${day.day}.${day.month}.${day.year}`].length : 
                                            0
                                        }
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
            }
            <div className="daysList__row">
                {months && months[String(selectedMonth)].map((day: DayType, dayIndex: number) => (
                    <div key={dayIndex}>
                        <div 
                            className={day.type === '0' ? 'daysList-day day' : 'daysList-holiday day'} 
                            key={dayIndex} 
                            onClick={() => setModalId(`${day.day}.${day.month}.${day.year}`)}
                        >
                            <p className='day-number'>
                                {day.day}
                            </p>
                            <div className='day__count'>
                                <p className='day-countName'>Количество задач: </p>
                                {
                                    todos[`${day.day}.${day.month}.${day.year}`] ? 
                                    todos[`${day.day}.${day.month}.${day.year}`].length : 
                                    0
                                }
                            </div>
                        </div>
                        {modalId === `${day.day}.${day.month}.${day.year}` &&
                            <Modal day={day} todos={todos} setTodos={setTodos} modalId={modalId} setModalId={setModalId}/>
                        }
                    </div>
                ))
                }
            </div>
        </section>
    )
}

export { DaysList }
