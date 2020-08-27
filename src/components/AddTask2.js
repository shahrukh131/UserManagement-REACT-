import React, { useState, useEffect } from "react";
import axios from "axios";
const AddTask2 = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [money, setMoney] = useState("");
  const [available, setAvailable] = useState("");
  const getTasks = () => {
    axios.get("http://127.0.0.1:8000/api/tasks/").then((res) => {
      console.log(res.data);
      setTasks([...res.data]);
    });
  };
  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");

    const newtask = {
      name,
      email,
      money,
      available,
    };

    axios.post("http://127.0.0.1:8000/api/tasks/", newtask).then((res) => {
      setTasks([res.data, ...tasks]);
      setAvailable("");
      setName("");
      setEmail("");
      setMoney("");
    });
  };

  return (
    <>
      <div className="container mt-4">
        <h4>Add Tasklist</h4>

        <div className="card">
          <div className="card-header">Create Task</div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter money"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                />
                <div className="form-group">
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    placeholder="select option"
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                  >
                    <option>Choose Option for Availabilty</option>
                    <option value="1">Available</option>
                    <option value="0">NotAvailable</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </form>
            <hr />
          </div>
        </div>

        {tasks.map((task) => (
          <div key={task.id}>
            <h5>{task.name}</h5>
            <p>{task.email}</p>
            <p>{task.money}</p>
            <p>{task.available}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddTask2;
