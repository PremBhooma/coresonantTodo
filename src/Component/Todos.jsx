import React, { useEffect, useState } from "react";
import "./Todos.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inp, setInp] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      const data = await res.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(todos);

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = (inp) => {
    // fetch("https://jsonplaceholder.typicode.com/users/1/todos", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newTodo),
    // })
    //   .then(() => {
    //     getData();
    //     console.log("Todo Created");
    //   })
    //   .catch((err) => {
    //     console.log("Todo Not Created");
    //     console.log(err);
    //   });

    // Mock adding a new todo locally
    if (inp === "") {
      alert("Fill the Input filed");
    } else {
      const newTodo = {
        title: inp,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    setInp("");
  };

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        console.log("Todo Deleted");
      })
      .catch((err) => {
        console.log("Todo Not Deleted");
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    const updatedTitle = prompt("Enter the new task name:");
    if (updatedTitle !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        )
      );
    }
  };

  const handleToggleFilter = () => {
    setFilterCompleted((prevFilter) => !prevFilter);
  };

  const handleToggle = async (id, completed) => {
    const body = { completed: !completed };

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );

      console.log("Updated");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="todoSection">
      <h1>Todos</h1>
      <div className="todoInput">
        <input
          type="text"
          placeholder="Enter Todo"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
        />
        <button onClick={() => handleAdd(inp)}>Add Todo</button>
      </div>
      <div className="todoFilter">
        <button onClick={handleToggleFilter}>
          {filterCompleted ? "Show All" : "Show Completed"}
        </button>
      </div>
      <div className="vl"></div>
      <div className="todoBlocks">
        {todos
          .filter((elem) => !filterCompleted || elem.completed)
          .map((elem) => (
            <div className="todoBox" key={elem.id}>
              <div className="right">
                <h2>{elem.title}</h2>
              </div>
              <div className="left">
                <div onClick={() => handleToggle(elem.id, elem.completed)}>
                  <p className={elem.completed ? "completed" : "not-completed"}>
                    {elem.completed ? "Completed" : "Not Completed"}
                  </p>
                </div>
                <div>
                  <button onClick={() => handleEdit(elem.id)}>Edit</button>
                </div>
                <div>
                  <button onClick={() => handleDelete(elem.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todos;
