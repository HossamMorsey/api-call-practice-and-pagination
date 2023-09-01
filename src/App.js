import React from "react";
import "./App.css";
import TodosList from "./components/TodosList";

export default function App() {
  return (
    <>
      <div className="header">
        <h3> Todos Call Practice with API Call. And Adding Pagination</h3>
      </div>

      <div className="todos">
        <TodosList />
      </div>
    </>
  );
}
