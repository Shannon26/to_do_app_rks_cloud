import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

// Define an array of filter options
const filters = ["All", "Completed", "Incomplete"];

// Define the TaskList component
const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  // Use the useState hook to manage the filter state
  const [filter, setFilter] = useState("All");

  // Define a function to handle filter change
  const handleFilterChange = (e) => {
    // Set the filter state to the event target value
    setFilter(e.target.value);
  };

  // Define a function to filter tasks based on the filter state
  const filterTasks = () => {
    switch (filter) {
      case "Completed":
        // Return only the tasks that are completed
        return tasks.filter((task) => task.completed);
      case "Incomplete":
        // Return only the tasks that are not completed
        return tasks.filter((task) => !task.completed);
      default:
        // Return all the tasks
        return tasks;
    }
  };

  return (
    <div className="task-list">
      <div className="task-filter">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          {filters.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filterTasks().map((task) => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

// Define the prop types for TaskList component
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;