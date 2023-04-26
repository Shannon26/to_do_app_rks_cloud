import React, { useState } from "react";
import PropTypes from "prop-types";

// Define the TaskInput component
const TaskInput = ({ addTask }) => {
  // Use the useState hook to manage the input value
  const [value, setValue] = useState("");

  // Define a function to handle input change
  const handleChange = (e) => {
    // Set the input value to the event target value
    setValue(e.target.value);
  };

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default browser behavior of reloading the page
    e.preventDefault();
    // Trim any whitespace from the input value
    const trimmedValue = value.trim();
    // Check if the input value is not empty
    if (trimmedValue) {
      // Call the addTask function prop with the input value as argument
      addTask(trimmedValue);
      // Reset the input value to an empty string
      setValue("");
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} placeholder="Enter a new task" />
      <button type="submit">Add</button>
    </form>
  );
};

// Define the prop types for TaskInput component
TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;