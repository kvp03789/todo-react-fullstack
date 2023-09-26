import { useState } from 'react'
import EditTaskItem from './EditTaskItem'
import { format } from 'date-fns'
import Dots from "../img/dots.svg"
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"
import useAuthContext from '../hooks/useAuthContext'
import useProjectContext from '../hooks/useProjectContext'
import { json } from 'react-router'


const TaskItem = (props) => {

    const [displayDotsMenu, setDisplayDotsMenu] = useState(false)
    const [displayEditTask, setDisplayEditTask] = useState(false)
    const [error, setError] = useState(null)
    

    const { user } = useAuthContext()
    const { globalProjectState, dispatch } = useProjectContext()

    const handleDotsClick = () => {
        setDisplayDotsMenu(!displayDotsMenu)
    }

    const handleDeleteTask = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test'
            ? `http://localhost:4000/api/projects/${props.project._id}/tasks/${props.task._id}`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/${props.project._id}/tasks/${props.task._id}`, 
            options)
        const json = await response.json()

        console.log("Deleted Task: ", json)
        if(response.ok){
            //close menu
            setDisplayDotsMenu(false)
            //update global project state
            dispatch({type: 'SET_PROJECTS',
                payload: globalProjectState.projects.map(proj => {
                    return proj._id === props.project._id
                    ? {...json}
                    : proj
                })
            })
        }
        if(!response.ok){
            setError(json.error)
        }
        
    }

    const handleEditTask = () => {
        console.log("Edited Task")
        setDisplayEditTask(!displayEditTask)
        setDisplayDotsMenu(false)
        //update global project sstate
    }

    

    return ( 
        <div className="task-item">
            <div className="task-item-section">
                <h3>{props.task.name}</h3>
            </div>
            <div className="task-item-section">
                <p>{props.task.details}</p>
            </div>
            <div className="task-item-section">
                <p>{props.task.date}</p>
            </div>
            <div className="task-item-section">
                <p>{props.task.important ? <img className="small-svg" src={StarFill}></img> : <img className="small-svg" src={StarOutline}></img>}</p>
            </div>
            
            <div className="task-item-section dots-container button-pointer" onClick={handleDotsClick}>
                <img src={Dots} className="small-svg"></img>
            </div>
            { displayDotsMenu &&
                <div className="edit-popup button-pointer">
                    <div className="popup-section button-pointer" onClick={handleEditTask}>
                        <p>Edit Task</p>
                    </div>
                    <div className="popup-section button-pointer" onClick={handleDeleteTask}>
                        <p>Delete Task</p>
                    </div>
                </div>
            }
            {
                displayEditTask &&
                <EditTaskItem task={props.task} project={props.project} setDisplayEditTask={setDisplayEditTask}/>
            }
        </div>
     );
}
 
export default TaskItem;