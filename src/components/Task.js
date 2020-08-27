import React, { useState } from "react";

const Task = ({ tasks, handleDelete, handleUpdate }) => {
  const [modalisOpen, setModalisOpen] = useState(false);

  return (
    <>
      <div>
        {" "}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Money</th>
              <th>Staus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.money}</td>
                {task.available === 1 && (
                  <td style={{ color: "green" }}>Available</td>
                )}
                {task.available === 0 && (
                  <td style={{ color: "red" }}>Not Available</td>
                )}

                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdate(task, task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Task;
