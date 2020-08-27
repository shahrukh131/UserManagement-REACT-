import React, { useEffect, useState } from "react";
import axios from "axios";
const Tasklist1 = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let i = 1;
  return (
    <>
      <div>
        <h1>Tasklist1</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{i++}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tasklist1;
