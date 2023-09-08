import './App.css'
import TodoList from './components/TodoList';
import {  SnackProvider } from './contexts/SnackContext';
import { TodoProvider } from './contexts/TodoContext';








function App() {
  return (
    <TodoProvider>
      <SnackProvider>
        <div className="App" style={{display: "flex" ,justifyContent: "center", alignItems: "center" ,backgroundImage: "linear-gradient(to bottom right, #0000FF, #00BFFF)", height: "100vh",}}>
          <TodoList />
        </div>
      </SnackProvider>
    </TodoProvider>
  );
}

export default App;

