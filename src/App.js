import { useState , useEffect } from "react";
import "./App.css";
import deletebtn from "./deletebtn.png";

function App() {

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [
      // { id: 1, text: "xyz", completed: false, date: "2025-08-08", time: "15:15"},
      // { id: 2, text: "abc", completed: false, date: "", time:"" },
    ];
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  
  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo(e) {
    e.preventDefault();
    if (input.trim() === "") {
      setError("empty msg!!");
      return;
    }
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, date, time }
    ]);
    setInput("");
    setError("");
    setDate("");
    setTime("");
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

  function deadlineHandler(date, time) {
    const deadline = new Date(`${date}T${time}`);
    const now = new Date();

    const diffMs = deadline - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (diffMs < 0) {
      if (diffDays === 0) {
        return `Deadline expired ${Math.abs(diffHrs)} ago`;
      }
      return `Deadline expired ${diffDays} days and ${Math.abs(
        diffHrs
      )} hours ago`;
    } else {
      if (diffDays === 0) {
        return `Due today, in ${Math.abs(diffHrs)} hours`;
      }
      return `Due in ${diffDays} days and ${Math.abs(diffHrs)} hours `;
    }
  }

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "incomplete") {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  };

  const displayedTodos = getFilteredTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  const item_left = todos.length - completedTodos.length;

  return (
    <div className="container">
      <form className="form" onSubmit={addTodo}>
        <input
          className={`${"input"} ${error ? "input-error" : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          value={date}
          className="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          className="time"
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="addbtn">Add Task</button>
      </form>

      <div className="list">
        {displayedTodos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`${"todo-left"} ${todo.completed ? "completed" : ""}`}
            >
              {todo.text}
            </span>
            <div className="todo-middle">
              {deadlineHandler(todo.date, todo.time)}
            </div>
            <button className="btn" onClick={() => deleteTodo(todo.id)}>
              <img
                className="todo-right"
                src={deletebtn}
                alt="deleteicon"
                width="20"
                height="15"
              />
            </button>
          </div>
        ))}
      </div>

      <div className="footers">
        <button onChange={displayedTodos} className="footer">
          items left {item_left}
        </button>
        <button
          onChange={displayedTodos}
          className="footer"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          onChange={displayedTodos}
          className="footer"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          onChange={displayedTodos}
          className="footer"
          onClick={() => setFilter("incomplete")}
        >
          Active
        </button>
      </div>
    </div>
  );
}
export default App;
