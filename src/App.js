import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import {
  FaCheck,
  FaTrashAlt,
  FaPlus,
  FaUndo,
  FaEdit,
  FaRegSave,
} from "react-icons/fa";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newTask, setNewTask] = useState("");
  const [completedTodos, setCompletedTodos] = useState(
    JSON.parse(localStorage.getItem("completedTodos")) || []
  );
  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const itemCount = taskList.length;
  const completeItemCount = completedTodos.length;
  const handleDelete = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
  };
  // task item edit
  const handleEditStart = (index) => {
    setEditIndex(index);
    setEditValue(taskList[index]);
  };
  // task item edit change
  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };
  // task item edit save
  const handleEditSave = (index) => {
    const newTaskList = [...taskList];
    newTaskList[index] = editValue;
    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setEditIndex(null);
  };
  //  task item change
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
  // task completed
  function handleComplete(index) {
    const newTaskList = [...taskList];
    const completedTodo = newTaskList.splice(index, 1)[0];
    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setCompletedTodos([...completedTodos, completedTodo]);
  }
  //task changed to completed list
  function handleUndo(index) {
    const newCompletedTodos = [...completedTodos];
    const todoToUndo = newCompletedTodos.splice(index, 1);
    setCompletedTodos(newCompletedTodos);
    setTaskList([...taskList, ...todoToUndo]);
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
                className="input"
                name="text"
                placeholder="Add new task"
                value={newTask}
                onChange={handleChange}
              />
              <button type="submit" class="cssbuttons-io-button">
                <FaPlus className="icon" />
              </button>
            </form>
            <ul className="todo-list-ul">
              {taskList.map((task, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="btn delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrashAlt className="icon" />
                  </button>
                  <button
                    type="button"
                    className="btn complete-btn"
                    onClick={() => handleComplete(index)}
                  >
                    <FaCheck className="icon" />
                  </button>
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        className="input"
                        value={editValue}
                        onChange={handleEditChange}
                      />
                      <button
                        type="button"
                        className="btn edit-btn"
                        onClick={() => handleEditSave(index)}
                      >
                        <FaRegSave className="icon" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{task}</span>
                      <button
                        type="button"
                        className="btn edit-btn"
                        onClick={() => handleEditStart(index)}
                      >
                        <FaEdit className="icon" />
                      </button>
                    </>
                  )}
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
                    <FaUndo className="icon" />
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
