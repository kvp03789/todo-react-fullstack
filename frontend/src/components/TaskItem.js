import { useState } from 'react'
import { format } from 'date-fns'
import Dots from "../img/dots.svg"
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"

const TaskItem = (props) => {

    const [displayDotsMenu, setDisplayDotsMenu] = useState(false)
    const [displayEditTask, setDisplayEditTask] = useState(false)
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [date, setDate] = useState('')
    const [taskIsImportant, setTaskIsImportant] = useState(props.task.important)

    const handleDotsClick = () => {
        setDisplayDotsMenu(!displayDotsMenu)
    }

    const handleDeleteTask = async () => {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch(`http://localhost:4000/api/projects/${props.project._id}/tasks/${props.task._id}`, options)
        const json = await response.json()

        console.log("Deleted Task: ", json)
        if(response.ok){
            setDisplayDotsMenu(false)
        }
        if(!response.ok){
            setError(json.error)
        }
        
    }

    const handleEditTask = () => {
        console.log("Edited Task")
        setDisplayEditTask(!displayEditTask)
        setDisplayDotsMenu(false)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            name, details, date, important: taskIsImportant, project: props.project._id
        }
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTask)
        }
        const response = await fetch(`http://localhost:4000/api/projects/${props.project._id}/tasks/${props.task._id}`, options)
        const json = await response.json()
        if(response.ok){
            console.log("edit task form submitted great success!: ", json)
            setDisplayEditTask(false)
        }
        if(!response.ok){
            setError(json.error)
        }
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
                <div className="edit-task-container">
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className="form-section">
                                <label htmlFor="name"></label>
                                <input defaultValue={props.task.name}
                                        name="name" 
                                        onChange={(e) => setName(e.target.value)}
                                        required="true"
                                ></input>
                            </div>
                            <div className="form-section">
                                <label htmlFor="details"></label>
                                <input defaultValue={props.task.details} 
                                        name="details"
                                        onChange={(e) => setDetails(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-section">
                                <label htmlFor="date"></label>
                                <input defaultValue={props.task.date} type="date" name="date"
                                        onChange={(e) => setDate(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-section button-pointer" onClick={() => setTaskIsImportant(!taskIsImportant)}>
                                <img src={taskIsImportant ? StarFill : StarOutline} className="small-svg"></img>
                            </div>
                            <button>Add</button>
                            <button onClick={() => setDisplayEditTask(false)}>Cancel</button>
                        </form>
                </div>
            }
        </div>
     );
}
 
export default TaskItem;