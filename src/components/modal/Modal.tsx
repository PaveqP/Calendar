import React, {FC, useState} from 'react'
import { Close, Delete, Edit } from '../../ui'
import { DayType, ToDoType, TodosType } from '../../modules/DaysList/DaysListTypes'
import './Modal.scss'

interface IModal{
    day: DayType;
    todos: TodosType;
    setTodos: React.Dispatch<React.SetStateAction<TodosType>>;
    modalId: string | null;
    setModalId: (modalId: string | null) => void;
}
const Modal:FC<IModal> = ({day, todos, setTodos, modalId, setModalId}) => {

    const [activeEdit, setActiveEdit] = useState<{ [key: string]: boolean }>({})
    const [newValue, setNewValue] = useState<string>('')
    const [newTask, setNewTask] = useState<string>('')

    const handleSetTodos = (key: string, value: ToDoType) => {
        setTodos((todos: TodosType) => {
            if (todos[key]) {
                return { ...todos, [key]: [...todos[key], value] };
            } else {
                return { ...todos, [key]: [value] };
            }
        });

        setNewTask('');
    };
    const changeTodoValue = (key: string, id: number, newValue: string) => {
        const newElements = todos[key].map((todo: ToDoType) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    name: newValue,
                };
            }
            return todo;
        });

        setTodos((todos: TodosType) => ({ ...todos, [key]: newElements }));
        setActiveEdit((prevState) => ({ ...prevState, [`${key}-${id}`]: false }));
    };

    const handleDeleteTodos = (key: string, id: number) => {
        const newElements = todos[key].filter((todo: ToDoType) => todo.id !== id);
        setTodos((todos: TodosType) => ({ ...todos, [key]: newElements }));
    };

    const handleCompleteTodo = (key: string, id: number) => {
        const newElements = todos[key].map((todo: ToDoType) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status: todo.status === 'new' ? 'completed' : 'new',
                };
            }
            return todo;
        });

        setTodos((todos: TodosType) => ({ ...todos, [key]: newElements }));
    };

    const handleEditClick = (key: string, id: number, currentName: string) => {
        setNewValue(currentName);
        setActiveEdit((prevState) => ({ ...prevState, [`${key}-${id}`]: true }));
    };

  return (
    <div className="modal">
        <div className="modal__info">
            <p className='modal-date'>{day.day}.{day.month}.{day.year}</p>
            <button onClick={() => setModalId(null)}><Close /></button>
        </div>
        <div className="modal-separator"></div>
        <div className="modal__tasks">
            <div className="tasks__actions">
                <input
                    type="text"
                    placeholder='Новая задача'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    onClick={() => handleSetTodos(`${day.day}.${day.month}.${day.year}`, { id: Math.random(), name: newTask, status: 'new' })}
                >
                    Создать
                </button>
            </div>
            <div className="tasks__list">
                {todos[`${day.day}.${day.month}.${day.year}`] && todos[`${day.day}.${day.month}.${day.year}`].map((todo: ToDoType) => (
                    <div className={todo.status === 'new' ? 'tasks__task' : 'tasks__completed'} key={todo.id}>
                        <div className="task__control">
                            <input 
                                type="checkbox" 
                                name="task" 
                                id="" 
                                checked={todo.status === 'completed'} 
                                onChange={() => handleCompleteTodo(`${day.day}.${day.month}.${day.year}`, todo.id)} 
                            />
                            {activeEdit[`${day.day}.${day.month}.${day.year}-${todo.id}`] ?
                                <input
                                    type="text"
                                    className='task-rename'
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    onBlur={() => changeTodoValue(`${day.day}.${day.month}.${day.year}`, todo.id, newValue)}
                                />
                                :
                                <p className='task-name'>{todo && todo.name}</p>
                            }
                        </div>
                        <div className="task__actions">
                            <button 
                                className='task-edit' 
                                onClick={() => handleEditClick(`${day.day}.${day.month}.${day.year}`, todo.id, todo.name)}
                            >
                                <Edit />
                            </button>
                            <button 
                                className='task-delete'
                                onClick={() => handleDeleteTodos(`${day.day}.${day.month}.${day.year}`, todo.id)}
                            >
                                <Delete />
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
    )
}

export {Modal}