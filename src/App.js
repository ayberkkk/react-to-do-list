import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Container, Row } from "reactstrap";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask !== "") {
      setTaskList([...taskList, newTask]);
      setNewTask("");
    }
  };

  const handleDelete = (index) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  return (
    <Container>
      <Row>
        <div className="todo-container">
          <h1>To-Do List</h1>
          <form onSubmit={handleSubmit}>
            <input
              class="input"
              name="text"
              placeholder="Search..."
              value={newTask}
              onChange={handleChange}
            />
            <button type="submit" class="cssbuttons-io-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>
              <span>Add</span>
            </button>
          </form>
          <ul className="todo-list-ul">
            {taskList.map((task, index) => (
              <li key={index}>
                <button
                  type="button"
                  class="btn btn-outline-danger delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    ></path>
                  </svg>
                  Delete
                </button>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </Row>
    </Container>
  );
}

export default App;
