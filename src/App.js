
import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
     { id: 1, text: "xyz", completed: false},
     { id: 2, text: "abc", completed: false}
  ])
  const [input, setInput] = useState('')

  function addTodo(e){
         e.preventDefault();
         setTodos([...todos, {id: Date.now(), text: input, completed: false}])
         setInput('')
  }
  // function onSubmithandler(e){
  //   e.preventDefault();
  //   addTodo();
  // }
  return (
   <div className='container'>
     <h2>Todo App</h2>
     {todos.map((todo) => (
          <div key={todo.id}>
           <input type="checkbox" />
            {todo.text}
          </div>
        ))}

     <form onSubmit={addTodo} >
      <input 
      value={input}
      onChange={(e) => setInput(e.target.value)}/>
      <button >Submit</button>
     </form>
   </div>
  );
}
export default App;

