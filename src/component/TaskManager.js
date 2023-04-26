import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 100000);
    dispatch({ type: "ADD_TASK", payload: { id, description: task, completed: false }}, () => {
      // Use setState callback function to ensure state is updated before setting localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id }, () => {
    // Use setState callback function to ensure state is updated before setting localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id }, () => {
      // Use setState callback function to ensure state is updated before setting localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  };

return ( 
<div className="task-manager"> 
<h1>Task Manager</h1> 
<TaskInput addTask={addTask} /> 
<TaskList tasks={storedTasks} toggleTask={toggleTask} deleteTask={deleteTask} /> 
</div> 
); 
};

export default TaskManager;

