import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setcurrentTask] = useState("");
  const inputTask = useRef(null);
  const [idCounter, setIdCounter] = useState(0);

  const generateUniqueId = () => {
    setIdCounter((prevCounter) => prevCounter + 1);
    return idCounter;
  };

  const displayTask = () => {
    const id = generateUniqueId();
    setTodoList([...todoList, { task: currentTask, completed: false, id }]);
    setcurrentTask("");
    inputTask.current.value = "";
  }

  const completeTask = (taskId) => {
    setTodoList(
      todoList.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  }

  const deleteTask = (taskId) => {
    setTodoList(todoList.filter((todotask) => todotask.id !== taskId));
  }

  console.log("Rendering todoList:", todoList);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input type="text" ref={inputTask} placeholder="Task..." onKeyDown={(event)=>{if(event.keyCode===13)displayTask()}} onChange={(event) => setcurrentTask(event.target.value)}></input>
        <button onClick={displayTask}>Add task</button>
      </div>
      <hr />
      <ul>
        {todoList.map((val) => (
          <div id="task" key={val.id}>
            <li>{val.task}</li>
            <button onClick={() => completeTask(val.id)}>Completed</button>
            <button onClick={() => deleteTask(val.id)}>Delete</button>
            {
              val.completed ? <h1>completed</h1> : <h1>Not completed</h1>
            }
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
