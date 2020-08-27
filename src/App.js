import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Tasklist } from "./components/Tasklist";
import { AddTask } from "./components/AddTask";
import { Test } from "./components/Test";
import Tasklist1 from "./components/Tasklist1";
import AddTask1 from "./components/AddTask1";
import AddTask2 from "./components/AddTask2";

function App() {
  return (
    <div className="container">
      <AddTask />
    </div>
  );
}

export default App;
