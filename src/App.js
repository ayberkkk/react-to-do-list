import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Container, Row, Col } from "reactstrap";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const itemCount = taskList.length;
  const completeItemCount = completedTodos.length;

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  // new task item added
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask !== "") {
      setTaskList([...taskList, newTask]);
      setNewTask("");
    }
  };

  //task deleted
  const handleDelete = (index) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  // task completed
  function handleComplete(index) {
    const newTask = [...taskList];
    const completedTodo = newTask.splice(index, 1);
    setTaskList(newTask);
    setCompletedTodos([...completedTodos, completedTodo]);
  }

  //task changed to completed list
  function handleUndo(index) {
    const newCompletedTodos = [...completedTodos];
    const todoToUndo = newCompletedTodos.splice(index, 1);
    setCompletedTodos(newCompletedTodos);
    setTaskList([...taskList, todoToUndo]);
  }

  return (
    <Container>
      <Row>
        <Col xl={6} sm={12}>
          <div className="todo-container">
            <h1 className="list-title">
              To-Do List
              <p className="list-item">{itemCount}</p>
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                class="input"
                name="text"
                placeholder="..."
                value={newTask}
                onChange={handleChange}
              />
              <button type="submit" class="cssbuttons-io-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="30"
                  height="30"
                >
                  <path fill="none" d="M0 0h30v30H0z"></path>
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
                    class="btn delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 30 30"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn complete-btn"
                    onClick={() => handleComplete(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 30 30"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </button>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xl={6} sm={12}>
          <div className="border-x"></div>
          <div className="done-container">
            <h1 className="list-title">
              Done List
              <p className="list-item">{completeItemCount}</p>
            </h1>
            <ul className="done-list-ul">
              {completedTodos.map((task, index) => (
                <li key={index}>
                  {task}
                  <button
                    type="button"
                    className="btn undo-btn"
                    onClick={() => handleUndo(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 30 30"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                      ></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default App;
