import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //Use effect is called whenever the page loads as array is empty, use effect only runs when the array changes
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  //This use effect runs whenever the todos array gets changed
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //Toggles the complete attribute of a given todo
  function toggleTodo(id){
     const newTodos = [...todos]
     const todo = newTodos.find(todo => todo.id === id)
     todo.complete = !todo.complete
     setTodos(newTodos)
  }


  //This adds new todos objects to the todo array,
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') {return}
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos ={todos} toggleTodo={toggleTodo}/> 
      <input ref= {todoNameRef} type ="text" />
      <button onClick={handleAddTodo}>Add task</button>
      <button onClick={handleClearTodos}>Clear tasks</button>
      <div>{todos.filter(todo => !todo.complete).length} Tasks left</div>
    </>
  );
}

export default App;
