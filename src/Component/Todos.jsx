import React, { useEffect, useState } from "react";
import "./Todos.css";

const Todos = () => {
  const [todos, SetTodos] = useState([]);
  const [loading, SetLoading] = useState(false);

  const getData = async () => {
    try {
      SetLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      const data = await res.json();
      SetTodos(data);
      SetLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(todos);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="todoSection">
      <h1>Todos</h1>
      <div className="todoInput">
        <input type="text" placeholder="Enter Todo" />
        <button>Add Todo</button>
      </div>
      <div className="todoBlocks">
        {todos.map((elem) => (
          <div className="todoBox">
            <div className="right">
              <h2>{elem.title}</h2>
            </div>
            <div className="left">
              <div>
                <p className={elem.completed ? "completed" : "not-completed"}>
                  {elem.completed ? "Completed" : "Not Completed"}
                </p>
              </div>
              <div>
                <button>Edit</button>
              </div>
              <div>
                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
