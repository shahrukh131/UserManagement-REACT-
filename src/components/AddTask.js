import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Tasklist } from "./Tasklist";
import Modal from "react-modal";
import Task from "./Task";

Modal.setAppElement("#root");

export const AddTask = (props) => {
  const [tasks, setTasks] = useState([]);
  const [names, setNames] = useState({ name: "" });
  const [emails, setEmails] = useState({ email: "" });
  const [moneys, setMoneys] = useState({ money: "" });
  const [available, setAvailable] = useState("");
  const [modalisOpen, setModalisOpen] = useState(false);
  const [id, setId] = useState(0);

  const getAll = () => {
    Axios.get("http://127.0.0.1:8000/api/tasks").then((res) => {
      console.log(res.data);

      setTasks(res.data);
    });
  };
  useEffect(() => {
    getAll();
  }, []);

  const onChangeName = (e) => {
    setNames({
      name: e.target.value,
    });
  };
  const onChangeEmail = (e) => {
    setEmails({
      email: e.target.value,
    });
  };
  const onChangeMoney = (e) => {
    setMoneys({
      money: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit button work");
    const newTask = {
      name: names.name,
      email: emails.email,
      money: moneys.money,
      available,
    };
    setNames({ name: "" });
    setEmails({ email: "" });
    setMoneys({ moneys: "" });
    setAvailable("");

    Axios.post("http://127.0.0.1:8000/api/tasks", newTask)
      .then((res) => {
        console.log(res.data);
        getAll();
        setNames({ name: "" });
        setEmails({ email: "" });
        setMoneys({ moneys: "" });
        setAvailable("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    Axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`).then((res) => {
      getAll();
    });
  };
  const handleUpdate = (data, id) => {
    console.log(id);
    setModalisOpen(true);
    setNames({ name: data.name });
    setEmails({ email: data.email });
    setMoneys({ money: data.money });
    setAvailable(data.available);
    setId(data.id);
    console.log(names);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: names.name,
      email: emails.email,
      money: moneys.money,
      available,
    };
    setNames({ name: "" });
    setEmails({ email: "" });
    setMoneys({ moneys: "" });
    setAvailable("");
    Axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, newTask)
      .then((res) => {
        console.log(res.data);
        getAll();
        setNames({ name: "" });
        setEmails({ email: "" });
        setMoneys({ moneys: "" });
        setAvailable("");
        setModalisOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const close = () => {
    setModalisOpen(false);
    setNames({ name: "" });
    setEmails({ email: "" });
    setMoneys({ moneys: "" });
    setAvailable("");
  };

  return (
    <div>
      <h1>Add Task</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <div className="form-group ">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChangeName}
                  value={names.name || ""}
                  placeholder="Enter name"
                />
              </div>
            </div>
          </div>
          <div className="form-group ">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={onChangeEmail}
                value={emails.email || ""}
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                onChange={onChangeMoney}
                value={moneys.money || ""}
                placeholder="Enter Money"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-10">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                placeholder="select option"
                value={available || ""}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option>Choose Option for Availabilty</option>
                <option value="1">Available</option>
                <option value="0">NotAvailable</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!names.name}
            style={{ marginLeft: "70%" }}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <h1>Tasklist</h1>
        <Task
          tasks={tasks}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
        <Modal
          isOpen={modalisOpen}
          onRequestClose={() => {
            setModalisOpen(false);
          }}
        >
          <h1>Edit</h1>
          <div className="container">
            <form onSubmit={updateSubmit}>
              <div className="form-group ">
                <div className="form-group ">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      onChange={onChangeName}
                      value={names.name || ""}
                      placeholder="Enter name"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChangeEmail}
                    value={emails.email || ""}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    onChange={onChangeMoney}
                    value={moneys.money || ""}
                    placeholder="Enter Money"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10">
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!names.name}
                style={{ marginLeft: "70%" }}
              >
                Update
              </button>
            </form>
          </div>
          <div>
            <button onClick={close}>close</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
