import React from 'react'

import { FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3001'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    getTodos()

    console.log(todos)
  }, [])

  const getTodos = async () => {
    const data = await fetch(API_BASE + "/todos")
      .then(result => result.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error: ', err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + '/todos/' + id, { method: 'PATCH' })
      .then(res => res.json())

      setTodos(todos => todos.map(todo => {
        if(todo._id === data._id) {
          todo.complete = data.complete
        }

        return todo
      }))
  }

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + '/todos/' + id, { method: 'DELETE' })
      .then(res => res.json())

    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + '/todos', { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json())

    setTodos([...todos, data])
    setNewTodo('')
  }

  return (
    <div className="App">
      <h1>Awesome To-Do List</h1>
      <h4>Here are your tasks for the day</h4>
      <div className='todos'>
        {todos.map(todo => (
          <div className='todo' key={todo._id} onClick={() => completeTodo(todo._id)}>
            <div className={`checkbox ${todo.complete ? "is-complete" : ""}`}></div>
            <p className={`todo--content ${todo.complete ? "is-complete" : ""}`}>{todo.text}</p>
            <button className='todo--trash' onClick={(e) => {e.stopPropagation(); deleteTodo(todo._id)}}><FaTrash size={25} /></button>
          </div>
        ))}

        <div className='add--todo'>
          <div className='todo'>
            <p className={`todo--content `}>
              <input 
                type="text"
                className='new--todo-content'
                placeholder='Enter a new todo'
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo}
              ></input>
            </p>
          </div>
          <button className='todo--add' onClick={addTodo}>+</button>
        </div>
      </div>

    </div>
  );
}

export default TodoList