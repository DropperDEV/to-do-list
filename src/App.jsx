import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  const [toDos, setToDo] = useState([]);
  function handleAddItems(newToDo) {
    setToDo((toDos) => [...toDos, newToDo]);
  }

  return (
    <div className="main">
      <Title>THINGS TO DO </Title>
      <InputText onAddItems={handleAddItems} />
      <ListToDo toDos={toDos} onToDo={setToDo} />
      <Footer />
    </div>
  );
}

function Title({ children }) {
  return (
    <div className="title-wrapper">
      <h1>{children}</h1>
    </div>
  );
}

function InputText({ onAddItems }) {
  const [name, setName] = useState("");
  function handleAddToDo(e) {
    e.preventDefault();
    const newToDo = { id: uuidv4(), name, state: 0 };
    onAddItems(newToDo);
    setName("");
  }
  return (
    <form action="" onSubmit={handleAddToDo} className="inputText-form">
      <input
        type="text"
        className="input-text"
        placeholder="Add New"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}

function ListToDo({ toDos, onToDo }) {
  return (
    <div className="wrapper-checkbox">
      {toDos.map((todo) => (
        <ToDo Todo={todo} key={todo.id} onToDo={onToDo} />
      ))}
    </div>
  );
}

function ToDo({ Todo, onToDo }) {
  function handleToggleClick() {
    const updatedTodo = { ...Todo, state: 1 };
    onToDo(updatedTodo);
  }
  return (
    <div className={Todo.state ? "checkbox selected" : "checkbox"}>
      <input
        type="checkbox"
        checked={Todo.state}
        onChange={handleToggleClick}
      />
      <h2>{Todo.name}</h2>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <BottomOptions>
        <span>➕</span>
        <span>🔍</span> <p>3 items left</p>
      </BottomOptions>
      <BottomOptions>
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </BottomOptions>
    </div>
  );
}

function BottomOptions({ children }) {
  return <div className="footer-element">{children}</div>;
}
