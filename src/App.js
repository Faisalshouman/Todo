import './App.css'
import TodoList from './components/TodoList';
import { TodoContext } from './contexts/TodoContext';
import { v4 as uid } from 'uuid'
import { useState } from 'react';

const inittodo = [
  {
    id : uid(),
    title : 'dsfsdfdfgdfad',
    details : 'sefwegewgeg',
    isCompleted : false
  },
  {
    id : uid(),
    title : 'dsfsdfdfgdfad',
    details : 'sefwegewgeg',
    isCompleted : false
  },
  {
    id : uid(),
    title : 'dsfsdfdfgdfad',
    details : 'sefwegewgeg',
    isCompleted : false
  }
]


function App() {
  const [todo , setTodo] = useState(inittodo)
  return (
    <div className="App" style={{display: "flex" ,justifyContent: "center", alignItems: "center" ,backgroundImage: "linear-gradient(to bottom right, #0000FF, #00BFFF)", height: "100vh",}}>
      <TodoContext.Provider value={{ todo, setTodo }}>
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;

