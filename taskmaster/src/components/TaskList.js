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

                        {}
                        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

                        <div className="task-list">
                            {tasks.map((t, index) => (
                                <div className="task-item" key={index}>
                                    <span>{t.text}</span>
                                    <span>{t.date}</span>
                                    <button className="delete-btn" onClick={() => deleteTask(index)}>
                                        Delete
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
