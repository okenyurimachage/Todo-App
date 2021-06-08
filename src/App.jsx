// Disclaimer!!!!!
// The code below is not my knowledge or thinking.
// But, it's via applying my understanding from a tutorial I  watched


import React from "react";
import "./App.css";


const App = () => {

  // an array of objects presenting all the todo states 
  // that are going to be used using the useState hook

  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

//handles todo tasks
  function handleSubmit(e) {
    //prevent reload of the page once the form is submitted
    e.preventDefault();

//set unique id
    const newTodo = {
      
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    //call settodo function to add new object into the todo's array
    setTodos([...todos].concat(newTodo));
    //restore to an empty string
    setTodo("");
  }

//handles tasks deleted
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

//handles completed tasks
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

// 
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          //onChange handler  sets the todo hook variable to what has been typed
          onChange={(e) => setTodo(e.target.value)}
          //two-way data binding
          value={todo}
        />
        <button type="submit">Add Task</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">

            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Change</button>
            ) : (
            // take the id of the task thats to be edited 
              <button onClick={() => setTodoEditing(todo.id)}>Edit Task</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete Task</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;