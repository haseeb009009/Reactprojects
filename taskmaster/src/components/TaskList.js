import React, { useState } from "react";
import "../App.css";

function TaskTracker() {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState(""); 

    const addTask = () => {
        if (!task.trim() || !date) {
            setError("Both fields are required!"); 
            return;
        }
        setError(""); 
        setTasks([...tasks, { text: task, date: date }]);
        setTask("");
        setDate("");
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const updateTask = (index, newText, newDate) => {
        if (!newText.trim() || !newDate) {
            setError("Both fields are required to update!"); 
            return;
        }
        setError("");
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { text: newText, date: newDate } : t
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="task-tracker">
            <div className="task-container">
                <h1>TASK TRACKER</h1>
                {!showForm && (
                    <button className="show-btn" onClick={() => setShowForm(true)}>
                        Start
                    </button>
                )}
                {showForm && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="save-btn" onClick={addTask}>Save</button>

                        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

                        <div className="task-list">
                            {tasks.map((t, index) => (
                                <div className="task-item" key={index}>
                                    <span>{t.text}</span>
                                    <span>{t.date}</span>
                                    <button className="delete-btn" onClick={() => deleteTask(index)}>
                                        Delete
                                    </button>
                                    <button
                                        className="upt-btn"
                                        onClick={() => {
                                            const newText = prompt("Update task text:", t.text);
                                            const newDate = prompt("Update task date:", t.date);
                                            if (newText !== null && newDate !== null) {
                                                updateTask(index, newText, newDate);
                                            }
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TaskTracker;
