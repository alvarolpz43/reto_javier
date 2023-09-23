import { createContext, useContext, useState } from "react";
import {createTasksRequest, getTasksRequest,deleteTasksRequest,getTaskRequest,updateTasksRequest} from '../api/tasks';

const TaskContext = createContext();
export const useTasks = ()=>{


const context = useContext(TaskContext);
 
if(!context){
    throw new Error('useTasks must be used within a TaskProvider');
}
return context;
}
export function TaskProvider({children}){

    const [tasks, setTasks] = useState([]);

    const getTasks = async ()=>{
      try{

        const res = await getTasksRequest();
        setTasks(res.data)
        
      }catch(err){
        console.error(err);
      }
    }

    const createTask = async (task)=>{
     try{
      const res = await createTasksRequest(task);
      console.log(res);
     }catch(err){
      console.log(err);
     }   
     
    }

    const deleteTask = async (id)=>{
      try{
        const res =  await deleteTasksRequest(id);
        if(res.status === 204) setTasks(tasks.filter(task=>task._id !== id))
 
       } catch(err){
         console.log(err);
       }   
    }

    const getTask = async (id)=>{
      try{
        const res = await getTaskRequest(id);
      return res.data;
      }catch(err){
        console.error(err);
      }
    }

    const updateTask = async (id, task)=>{
     try{
      await updateTasksRequest(id, task);
     }catch(err){
      console.error(err);
    }}
    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
            </TaskContext.Provider >
    );
}