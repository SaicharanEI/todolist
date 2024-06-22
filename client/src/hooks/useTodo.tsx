import useLocalStorage from "./useLocalStorage";

export type ITodo = {
  id: number;
  text: string;
  checked: boolean;
};

function useTodo() {
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);

  const addTodo = (text: string) => {
    if (text.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text, checked: false }]);
    }
  };

  const deleteTodo = (id: number) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleChecked = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const editTodo = (id: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleChecked,
    editTodo,
  };
}

export default useTodo;
