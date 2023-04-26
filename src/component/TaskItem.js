import React from "react";
import PropTypes from "prop-types";

// Define the TaskItem component
const TaskItem = ({ task, toggleTask, deleteTask }) => {
  // Destructure the task object into its properties
  const { id, description, completed } = task;

  // Define a function to handle checkbox change
  const handleCheckboxChange = () => {
    // Call the toggleTask function prop with the task id as argument
    toggleTask(id);
  };

  // Define a function to handle delete button click
  const handleDeleteClick = () => {
    // Call the deleteTask function prop with the task id as argument
    deleteTask(id);
  };

  return (
    <li className="task-item">
      <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
      <span className={completed ? "completed" : ""}>{description}</span>
      <button onClick={handleDeleteClick}>X</button>
    </li>
  );
};

// Define the prop types for TaskItem component
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;