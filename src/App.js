import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [edit, isEdit] = useState(null);
  const [inputData, setInputData] = useState();
  const handleAddTodo = () => {
    if (!inputData) return;
    if (edit) {
      const selectCurItem = todo.map((item) => {
        if (item.task === edit) {
          return { ...item, task: inputData };
        }
        return item;
      });
      setTodo(selectCurItem);
      setInputData("");
      isEdit(null);
    } else {
      setTodo((prev) => [...prev, { isDone: false, task: inputData }]);
      setInputData("");
    }
  };

  const handleEdit = (val) => {
    isEdit(val);
    const selectEdit = todo.find((item) => item.task === val);
    console.log(selectEdit, "selectEdit");
    setInputData(selectEdit.task);
  };
  const markDoneTask = (val) => {
    const selectCurItem = todo.map((item) => {
      if (item.task === val) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    console.log(selectCurItem, "selectCurItem");
    setTodo(selectCurItem);
  };
  console.log(edit, "edit");
  return (
    <div className="App">
      <h1>Todo</h1>
      <input
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value);
        }}
      />
      {console.log(JSON.stringify(todo))}
      <button onClick={() => handleAddTodo()}>
        {edit === null ? "ADD" : "UPDATE"}
      </button>
      <ul>
        {todo.map((item) => {
          return (
            <li>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={(e) => markDoneTask(item.task)}
              />
              {item.task}
              <button onClick={() => handleEdit(item.task)}>{"Edit"}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
