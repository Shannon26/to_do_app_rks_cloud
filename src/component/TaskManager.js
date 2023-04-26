import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      // update localStorage inside the reducer
      localStorage.setItem(
        "tasks",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    case "TOGGLE_TASK":
      // update localStorage inside the reducer
      localStorage.setItem(
        "tasks",
        JSON.stringify(
          state.map((task) =>
            task.id === action.payload
              ? { ...task, completed: !task.completed }
              : task
          )
        )
      );
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "DELETE_TASK":
      // update localStorage inside the reducer
      localStorage.setItem(
        "tasks",
        JSON.stringify(state.filter((task) => task.id !== action.payload))
      );
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const TaskManager = () => {
  // get the initial value from localStorage or use initialState
  const [tasks, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("tasks")) || initialState
  );

  // use an empty array as the second argument to useEffect
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 100000);
    dispatch({ type: "ADD_TASK", payload: { id, description: task, completed: false } });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default TaskManager;

