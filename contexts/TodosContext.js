import {createContext, useState} from 'react';

const TodosContext = createContext()

const TodosProvider = ({children}) => {
  const [todos, setTodos] = useState([]);
  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos')
      const latestTodods = await res.json()
      setTodos(latestTodods)
    } catch (err) {
      console.error(err)
    }
  }

  const addTodos = async (description) => {
    try {
      const res = await fetch('/api/createTodos', {
        method: 'POST',
        body: JSON.stringify(description),
        headers: {'Content-Type': 'application/json'}
      })
      const newTodo = await res.json()
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos]
      })
    } catch (err) {
      console.error(err)
    }
  }

  const updateTodos = async (updatedTodo) => {
    try {
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {'Content-Type': 'application/json'}
      })
      await res.json()
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos]
        const existingTodo = existingTodos.find(todo => todo.id === updatedTodo.id)
        existingTodo.fields = updatedTodo.fields;
        return existingTodos
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodos = async (id) => {
    console.log(id)
    try {
      const res = await fetch('/api/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'}
      })
      await res.json()
      setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.id !== id)
      })
    } catch (err) {
      console.error(err)
    }
  }
  return (<TodosContext.Provider value={{
    todos, 
    setTodos,
    refreshTodos,
    updateTodos,
    deleteTodos,
    addTodos,
  }}>{children}</TodosContext.Provider>)
}

export {TodosContext, TodosProvider}