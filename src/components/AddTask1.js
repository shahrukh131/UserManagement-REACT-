import React, { Component } from "react";
import axios from "axios";
class AddTask1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      money: "",
      tasks: [],
    };
    // bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }
  // handle change
  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
    // console.log(e.target.value);
  }
  // handle submit
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/tasks/", {
        name: this.state.name,
        email: this.state.email,
        money: this.state.money,
      })
      .then((response) => {
        // console.log('from handle sumit', response);
        this.setState({
          tasks: [response.data, ...this.state.tasks],
          name: "",
          email: "",
          money: "",
        });
      });
  }
  // render tasks
  renderTasks() {
    return this.state.tasks.map((task) => (
      <div key={task.id} className="media">
        <div className="media-body">
          <div>{task.name} </div>
          <div>{task.email}</div>
          {task.available === 1 && <p style={{ color: "green" }}>Available</p>}
          {task.available === 0 && (
            <p style={{ color: "red" }}>Not Available</p>
          )}
          <p>{task.money}</p>
          <hr />
        </div>
      </div>
    ));
  }
  // get all the tasks from backend
  getTasks() {
    axios.get("http://127.0.0.1:8000/api/tasks").then((response) =>
      this.setState({
        tasks: [...response.data],
      })
    );
  }
  // lifecycle mehtod
  componentWillMount() {
    this.getTasks();
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Create Task</div>

              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.name}
                      placeholder="Enter name"
                    />
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                      value={this.state.email}
                      placeholder="Enter email"
                    />
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ money: e.target.value });
                      }}
                      value={this.state.money}
                      placeholder="Enter money"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Task
                  </button>
                </form>
                <hr />
                {this.renderTasks()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask1;
