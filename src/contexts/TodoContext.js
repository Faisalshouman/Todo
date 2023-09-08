import { createContext, useContext, useReducer } from "react";
import { TodoReducer } from '../reducers/TodoReducer';

const TodoContext = createContext([])

export const TodoProvider = ({ children }) => {

  const [todo, dispatch] = useReducer(TodoReducer, []);

  return (
    <TodoContext.Provider value={{ todo, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = ()=>{
    return useContext(TodoContext)
}