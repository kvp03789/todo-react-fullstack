import { useState, useEffect } from 'react'
import EditTaskItem from './EditTaskItem'
import { format, parseISO } from 'date-fns'
import Dots from "../img/dots.svg"
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"
import CheckGrey from "../img/check-grey.svg"
import CheckFilled from "../img/check-filled.svg"
import useAuthContext from '../hooks/useAuthContext'
import useProjectContext from '../hooks/useProjectContext'
import { json } from 'react-router'


const TaskItem = (props) => {

    const [displayDotsMenu, setDisplayDotsMenu] = useState(false)
    const [displayEditTask, setDisplayEditTask] = useState(false)
    const [error, setError] = useState(null)
    const [taskComplete, setTaskComplete] = useState(props.task.complete)

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

    const handleTaskCompleteClick = async () => {
        setTaskComplete(!taskComplete)
        console.log("marking task as complete...")
        const newTask = {...props.task, complete: !props.task.complete}
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTask)
        }
        const response = await fetch(
            process.env.NODE_ENV === "development" || "test"
            ? `http://localhost:4000/api/projects/${props.project._id}/tasks/${props.task._id}`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/${props.project._id}/tasks/${props.task._id}`,
            options
        )
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'SET_PROJECTS',
            payload: globalProjectState.projects.map(proj => {
               return proj._id === props.project._id
               ? json
               : proj
            })})
        }
        if(!response.ok){
            console.log("marking complete failed. heres the json: ", json)
        }
    }

    return ( 
        <div className={props.task.complete ? "task-item task-complete" : "task-item"}>
            <div className="task-item-section check-container" onClick={handleTaskCompleteClick}>
                {<img src={props.task.complete ? CheckFilled : CheckGrey} className="small-svg check-svg"></img>}
            </div>
            <div className="task-item-section">
                <h3>{props.task.name}</h3>
            </div>
            <div className="task-item-section">
                <p>{props.task.details}</p>
            </div>
            <div className="task-item-section">
                {/* <p>{props.task.date}</p> */}
                <p>{format(parseISO(props.task.date), 'dd-MM-yyyy')}</p>
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