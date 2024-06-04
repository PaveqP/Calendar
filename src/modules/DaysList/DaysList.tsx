import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MonthConstructor } from '../../utils/MonthConstructor'
import './DaysList.scss'

function DaysList() {

    const [months, setMonths] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState('05')
    const [modalId, setModalId] = useState<string | null>(null)

    const [newTask, setNewTask] = useState<string>('')
    const [todos, setTodos] = useState<any>(() => {
        const savedTasks = localStorage.getItem('currentTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });

    useLayoutEffect(() => {
        const result = new MonthConstructor()
        result.setResult()
        setMonths(result.getResult())
    }, [])

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
                    <div className="daysList-day" key={dayIndex} onClick={() => setModalId(`${day.day}.${day.month}.${day.year}`)}>
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
