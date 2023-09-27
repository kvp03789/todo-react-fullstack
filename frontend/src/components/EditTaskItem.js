import { useState, useEffect } from 'react'
import {format, parseISO} from 'date-fns'
import useAuthContext from '../hooks/useAuthContext'
import useProjectContext from '../hooks/useProjectContext'
import Dots from "../img/dots.svg"
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"

const EditTaskItem = (props) => {

    const [name, setName] = useState(props.task.name)
    const [details, setDetails] = useState(props.task.details)
    const [date, setDate] = useState(props.task.date)
    const [taskIsImportant, setTaskIsImportant] = useState(props.task.important)
    const [taskIsComplete, setTaskIsComplete] = useState(props.task.complete)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()
    const { dispatch, globalProjectState } = useProjectContext()

    useEffect(() => {
        setName(props.task.name)
        setDetails(props.task.details)
        setDate(props.task.date)
        setTaskIsImportant(props.task.important)
        setTaskIsComplete(props.task.complete)
    }, [])

    const setDisplayEditTask = () => {
        props.setDisplayEditTask(false)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            name, details, date, important: taskIsImportant, complete: taskIsComplete, project: props.project._id
        }
        console.log('attempting to edit task, heres the newTask being sent: ', newTask)
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTask)
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test'
            ? `http://localhost:4000/api/projects/${props.project._id}/tasks/${props.task._id}`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/${props.project._id}/tasks/${props.task._id}`, 
            options)
        const json = await response.json()
        if(response.ok){
            console.log("edit task form submitted great success!: ", json)
            setDisplayEditTask()
            dispatch({type: 'SET_PROJECTS',
             payload: globalProjectState.projects.map(proj => {
                return proj._id === props.project._id
                ? json
                : proj
             })})
        }
        if(!response.ok){
            setError(json.error)
        }
    }

    useEffect(() => {
        console.log('DAAATE TEEEST ----', new Date(props.task.date).toISOString().split("T")[0])
    }, [])
    
    return ( 

        <div className="edit-task-container">
            <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="form-section">
                        <label htmlFor="name"></label>
                        <input defaultValue={props.task.name}
                                name="name" 
                                onChange={(e) => setName(e.target.value)}
                                required={true}
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
                        <input value={new Date(props.task.date).toISOString().split("T")[0]} type="date" name="date"
                                onChange={(e) => setDate(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section button-pointer" onClick={() => setTaskIsImportant(!taskIsImportant)}>
                        <img src={taskIsImportant ? StarFill : StarOutline} className="small-svg"></img>
                    </div>
                    <button>Add</button>
                    <button onClick={() => setDisplayEditTask()}>Cancel</button>
                </form>
            </div>
     );
}
 
export default EditTaskItem;