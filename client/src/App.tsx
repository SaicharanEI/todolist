import { useState } from "react";
import "./App.css";

type ITodo = {
  id: number;
  text: string;
  checked: boolean;
};

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos") ?? "")
      : []
  );
  const [todoEdit, setTodoEdit] = useState(false);
  const [todoEditIndex, setTodoEditIndex] = useState(0);

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: todo, checked: false },
      ]);
      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, { text: todo, checked: false }])
      );
      setTodo("");
    }
  };

  const onClickChecked = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (index: number) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    const newTodos = todos.filter((item: ITodo, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const editTodo = (index: number) => {
    const isConfirm = window.confirm("Are you sure you want to edit?");
    if (!isConfirm) return;
    const todoChecked = todos[index].checked;
    if (todoChecked) {
      alert("You can't edit checked todo!");
      return;
    }
    setTodoEditIndex(index);
    setTodoEdit(true);
    setTodo(todos[index].text);
  };

  const editTodoText = () => {
    const newTodos = [...todos];
    newTodos[todoEditIndex].text = todo;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodo("");
    setTodoEdit(false);
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
        <button onClick={todoEdit ? editTodoText : addTodo}>
          {todoEdit ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
      <div>
        <ul>
          {todos.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                onChange={() => onClickChecked(index)}
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
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <button onClick={() => editTodo(index)}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
