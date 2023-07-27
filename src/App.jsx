import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function App() {
  const [toDos, setToDo] = useState([]);
  const [sortedToDo, setSortedToDo] = useState(toDos);
  function handleAddItems(newToDo) {
    setToDo((toDos) => [...toDos, newToDo]);
    setSortedToDo((prevSortedToDos) => [...prevSortedToDos, newToDo]);
  }

  return (
    <div className="main">
      <Title>THINGS TO DO </Title>
      <InputText onAddItems={handleAddItems} />
      <ListToDo
        toDos={toDos}
        onToDo={setToDo}
        sortedToDo={sortedToDo}
        onSortedToDo={setSortedToDo}
      />
      <Footer
        toDos={toDos}
        onToDo={setToDo}
        sortedToDo={sortedToDo}
        onSortedToDo={setSortedToDo}
      />
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

function ListToDo({ onToDo, sortedToDo }) {
  return (
    <div className="wrapper-checkbox">
      {sortedToDo.map((todo) => (
        <ToDo Todo={todo} key={todo.id} onToDo={onToDo} />
      ))}
    </div>
  );
}

function ToDo({ Todo, onToDo }) {
  function handleToggleClick() {
    const updatedTodo = { ...Todo, state: !Todo.state };
    onToDo((prevToDos) =>
      prevToDos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  return (
    <div className={`checkbox ${Todo.state && "selected"}`}>
      <input
        type="checkbox"
        checked={Todo.state}
        onChange={() => handleToggleClick()}
      />
      <h2>{Todo.name}</h2>
    </div>
  );
}

function Footer({ toDos, onSortedToDo }) {
  const [sortBy, setSortBy] = useState("all");
  const itemsLeft = toDos.filter((todo) => !todo.state).length;

  

  useEffect(() => {
    if (sortBy === "all") {
      onSortedToDo(toDos);
    } else if (sortBy === "completed") {
      onSortedToDo([...toDos].sort((a, b) => b.state - a.state));
    } else if (sortBy === "active") {
      onSortedToDo([...toDos].sort((a, b) => a.state - b.state));
    }
  }, [sortBy, toDos, onSortedToDo]);

  return (
    <div className="footer">
      <BottomOptions>
        <span>➕</span>
        <span>🔍</span> <p>{itemsLeft} items left</p>
      </BottomOptions>
      <BottomOptions>
        <Button value={"all"} onSortBy={setSortBy}>
          All
        </Button>
        <Button value={"active"} onSortBy={setSortBy}>
          Active
        </Button>
        <Button value={"completed"} onSortBy={setSortBy}>
          Completed
        </Button>
      </BottomOptions>
    </div>
  );
}

function BottomOptions({ children }) {
  return <div className="footer-element button">{children}</div>;
}

function Button({ value, children, onSortBy }) {
  return (
    <button
      value={value}
      className="button"
      onClick={(e) => onSortBy(e.target.value)}
    >
      {children}
    </button>
  );
}
