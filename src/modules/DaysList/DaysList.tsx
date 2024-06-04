import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MonthConstructor } from '../../utils/MonthConstructor'
import './DaysList.scss'
import axios from 'axios'

function DaysList() {

    const [months, setMonths] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState('01')
    const [modalId, setModalId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const [newTask, setNewTask] = useState<string>('')
    const [todos, setTodos] = useState<any>(() => {
        const savedTasks = localStorage.getItem('currentTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = new MonthConstructor();
            await result.setResult();
            setMonths(result.getResult());
            setLoading(result.isLoading());
        };

        fetchData();
    }, []);

    console.log(months)

    const handleSetTodos = (key: any, value: any) => {
        setTodos((todos: any) => {
            if (todos[key]) {
                return { ...todos, [key]: [...todos[key], value] };
            } else {
                return { ...todos, [key]: [value] };
            }
        });

        setNewTask('')
    };

    const handleDeleteTodos = (key: any, id: number) => {

        const newElements = todos[key].filter((todo: any) => todo.id !== id)

        setTodos((todos: any) => {
            return { ...todos, [key]: newElements}
        })
    }

    const handleCompleteTodo = (key: any, id: number) => {
        const newElements = todos[key].map((todo: any) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status: todo.status === 'new' ? 'completed' : 'new'
                };
            }
            return todo;
        });
    
        setTodos((todos: any) => {
            return { ...todos, [key]: newElements };
        });
    };

    useEffect(() => {
        localStorage.setItem('currentTasks', JSON.stringify(todos))
    }, [todos])

    if (loading) {
        return <div>Loading...</div>; // или любой другой индикатор загрузки
    }

  return (
    <div className='daysList'>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className='daysList-select'>
                <option value="01">Январь</option>
                <option value="02">Февраль</option>
                <option value="03">Март</option>
                <option value="04">Апрель</option>
                <option value="05">Май</option>
                <option value="06">Июнь</option>
                <option value="07">Июль</option>
                <option value="08">Август</option>
                <option value="09">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
        </select>
        <div className="daysList__row">
            {months && months[String(selectedMonth)] && months[String(selectedMonth)].map((day: any, dayIndex: number) => (
                <>
                    <div className={day.type === '0' ? 'daysList-day day' : 'daysList-holiday day'} key={dayIndex} onClick={() => setModalId(`${day.day}.${day.month}.${day.year}`)}>
                        <p className='day-number'>{day.day}</p>
                    </div>
                    {modalId === `${day.day}.${day.month}.${day.year}` &&
                        <div className="day__modal">
                            <div className="modal__info">
                                <p className='modal-date'>{day.day}.{day.month}.{day.year}</p>
                                <button onClick={() => setModalId(null)}>close</button>
                            </div>
                            <div className="modal-separator">

                            </div>
                            <div className="modal__tasks">
                                <div className="tasks__actions">
                                    <input type="text" placeholder='Новая задача' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                                    <button onClick={() => handleSetTodos(`${day.day}.${day.month}.${day.year}`, {id: Math.random(), name: newTask, status: 'new'})}>Создать</button>
                                </div>
                                <div className="tasks__list">
                                    {todos[`${day.day}.${day.month}.${day.year}`] && todos[`${day.day}.${day.month}.${day.year}`].map((todo: any) => (
                                        <div className="tasks__task">
                                            <div className="task__control">
                                                <input type="checkbox" name="task" id="" onChange={() => handleCompleteTodo(`${day.day}.${day.month}.${day.year}`, todo.id)}/>
                                                <p className='task-name'>{todo && todo.name}</p>
                                            </div>
                                            <div className="task__actions">
                                                <button className='task-edit'>edit</button>
                                                <button className='task-delete' onClick={() => handleDeleteTodos(`${day.day}.${day.month}.${day.year}`, todo.id)}>del</button>
                                                <p className='task-status'>{todo && todo.status}</p>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
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
