import React, {FC, ChangeEvent, useState} from 'react';
import './styles/App.scss';
import TodoTask from './Components/TodoTask';
import { ITask } from "./Interfaces";


const App: FC =() => {

const [task, setTask] = useState<string>("");
const [deadline, setDeadline] = useState<number>(0);
const [todoList, setTodoList] = useState<ITask[]>([]);


const  handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
  
  if (event.target.name === 'task'){
    setTask(event.target.value)
  }else{
    setDeadline(Number(event.target.value))
  }
};

const addTask = ():void =>{

  const newTask ={
    taskName: task,
    deadline: deadline
  };
  setTodoList([...todoList, newTask])
  console.log(todoList);

  setDeadline(0);
  setTask('');
};

const completeTask = (taskNameToDelete:string):void => {
      setTodoList(todoList.filter((task) => {
        return task.taskName !== taskNameToDelete
      }))
}

  return (
    <>
    <style>{`
    body {
      margin: 0px;
      padding: 0px;
    }
  `}</style>
    <div className="App">
      <div className="header">
          <div className='inputs-container'>
          <input 
          className='task-input'
          type= "text"
          placeholder='task'
          name ='task'
          value={task}
          onChange={handleChange}>
          </input>

          <input
          className='task-input'
          type= "number"
          placeholder='deadline'
          name ='deadline'
          value={deadline}
          onChange={handleChange}>
          </input>

          </div>
          <button className='add-task-btn' onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
      {todoList.map((task: ITask, key:number)=> {
        return <TodoTask key={key} task ={task} completeTask = {completeTask}/>;
      })}
      </div>
    </div> 
    </>
  );
}

export default App;
