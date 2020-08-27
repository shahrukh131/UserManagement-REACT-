import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const getAll = () => {
    Axios.get("http://127.0.0.1:8000/api/tasks").then((res) => {
      console.log(res.data);

      setTasks(res.data);
    });
  };
  useEffect(() => {
    getAll();
  }, []);
  console.log(tasks);
  return (
    <div>
      <>
        <h1>Tasklist</h1>
        {tasks.map((task, index) => (
          <div key={index}>
            <h5>Name:{task.name}</h5>
            <p>email:{task.email}</p>
            <p>{task.available}</p>
            <p>{task.money}</p>
          </div>
        ))}
      </>
    </div>
  );
};
