import { useState } from "react";
import "./App.css";
import deletebtn from './deletebtn.png'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "xyz", completed: false },
    { id: 2, text: "abc", completed: false },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function addTodo(e) {
    e.preventDefault();
    if (input.trim() === "") {
      setError("empty msg!!");
      return;
    }

    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
    setError("");
  }

  function toggleTodo(id) {
    setTodos((Todos) =>
      Todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((Todos) => Todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container">

       <form className="form" onSubmit={addTodo}>
        <input
          className={`${"input"} ${error ? "input-error" : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="addbtn">Add Task</button>
      </form>
      {todos.map((todo) => (
        <div className="list" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className={todo.completed ? "completed" : ""}
          />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
           <button className="btn" onClick={()=> deleteTodo(todo.id)}>
            <img src={deletebtn} alt="deleteicon"  />
           </button>
        </div>
         
        
      ))}
      

     
    </div>
  );
}
export default App;
