import React, { useState, useEffect } from "react";
import axios from "axios";

const TodosList = () => {
  // Component State
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Calling the API in useEffect
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  // Helpers for calculating data, page length , ...
  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Handle Previous Page
  const handlePrev = () => {
    currentPage !== 1
      ? setCurrentPage(currentPage - 1)
      : alert("You at the first page can't go to previous page");
  };

  // Handle Next Page
  const handleNext = () => {
    currentPage !== numOfTotalPages
      ? setCurrentPage(currentPage + 1)
      : alert("You at the last page can't go to any further");
  };

  return (
    <>
      {/* Drop Down List for pagination options */}
      <div className="options-container">
        <label>
          <strong> Pagination Options :: </strong>{" "}
        </label>
        <select onChange={(e) => setTodosPerPage(e.target.value)}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
      {/* ****** */}
      <div className="todos-container">
        {visibleTodos.map((todo) => {
          return (
            <div className="title-container">
              <p> {`${todo.id} . `}</p>
              <p key={todo.id}> {todo.title}</p>
            </div>
          );
        })}
      </div>
      {/* Pagination Area */}
      <div className="pagination-container">
        <button className="btn" onClick={handlePrev}>
          Prev.
        </button>
        <p className="pages-container">
          {" "}
          {pages.map((page) => {
            return (
              <button
                onClick={() => setCurrentPage(page)}
                key={page}
                className={`${
                  currentPage === page ? "active page-btn" : "page-btn"
                } `}
              >{`${page}`}</button>
            );
          })}
        </p>
        <button className="btn" onClick={handleNext}>
          Next.
        </button>
      </div>
    </>
  );
};

export default TodosList;
