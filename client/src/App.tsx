import { useState } from "react";
import useTodo, { ITodo } from "./hooks/useTodo";
import "./App.css";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoEdit, setTodoEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  const { todos, addTodo, deleteTodo, toggleChecked, editTodo } = useTodo();

  const handleAddOrEditTodo = () => {
    if (todoEdit && editTodoId !== null) {
      editTodo(editTodoId, todo);
      setTodoEdit(false);
      setEditTodoId(null);
    } else {
      addTodo(todo);
    }
    setTodo("");
  };

  const handleEditTodo = (id: number) => {
    const isConfirm = window.confirm("Are you sure you want to edit?");
    if (!isConfirm) return;
    const todoItem = todos.find((todo: ITodo) => todo.id === id);
    if (!todoItem) return;
    if (todoItem.checked) {
      alert("You can't edit a checked todo!");
      return;
    }
    setEditTodoId(id);
    setTodoEdit(true);
    setTodo(todoItem.text);
  };

  return (
    <>
      <h1>Todos List</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddOrEditTodo}>
          {todoEdit ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
      <div>
        <ul>
          {todos.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                onChange={() => toggleChecked(item.id)}
                checked={item.checked}
              />
              <li
                style={{
                  textDecoration: item.checked ? "line-through" : "none",
                  listStyleType: "none",
                }}
              >
                {item.text}
              </li>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => handleEditTodo(item.id)}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
