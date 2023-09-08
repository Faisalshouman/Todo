import { v4 as uid } from 'uuid'


export const TodoReducer = (currentTodo , action)=>{

    switch (action.type) {
        case 'added':
            const newTodo =
            {id: uid(),
            title: action.payload.title,
            details: '',
            isCompleted: false,}
      
            const updatedTodoAdded = [...currentTodo , newTodo]
            localStorage.setItem("todo",JSON.stringify(updatedTodoAdded))
            return updatedTodoAdded
        
        case 'deleted':
            const updatedTodoDeleted= currentTodo.filter((t)=>{
                if (t.id === action.payload.id){
                return false
                }
                else {
                  return true
                }
            })
            localStorage.setItem("todo",JSON.stringify(updatedTodoDeleted))
            return updatedTodoDeleted
        
        case 'updated':
            const updatedtodoUpdated= currentTodo.map((t)=>{
                if (t.id === action.payload.id){
                return t = {...t , title : action.payload.title , details : action.payload.details}
                }
                else {
                  return t
                }
            })
            localStorage.setItem("todo",JSON.stringify(updatedtodoUpdated))
            return updatedtodoUpdated

        case 'change':
            const updatedTodos = currentTodo.map((t) => {
                if (t.id === action.payload.id) {
                  return { ...t, isCompleted: !t.isCompleted };
                } else {
                  return t;
                }
              });
              localStorage.setItem("todo", JSON.stringify(updatedTodos));
              return updatedTodos;
                      
        
        case 'storage':
            const storageTodos = JSON.parse(action.payload);
            return storageTodos
        
        default:
            return currentTodo;
    }



}