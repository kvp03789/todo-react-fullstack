import { useEffect, useState } from "react";
import { format } from 'date-fns'
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"
import Plus from "../img/plus.svg"
import TaskItem from "../components/TaskItem";

const Project = (props) => {

    useEffect(() => {
        console.log('here\'s props from Project component', props)
    }, [])

    const [displayNewTaskForm, setDisplayNewTaskForm] = useState(false)
    const [taskIsImportant, setTaskIsImportant] = useState(false)
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [date, setDate] = useState('')
    const [important, setImportant] = useState(false)
    const [error, setError] = useState(null)
    
    const handleDisplayNewTaskForm = () => {
        setDisplayNewTaskForm(!displayNewTaskForm)
        const plusIcon = document.querySelector(".plus-icon")
        plusIcon.classList.contains("rotated")
        ? plusIcon.classList.remove("rotated")
        : plusIcon.classList.add("rotated")
    }

    const handleSetImportant = () => {
        setTaskIsImportant(!taskIsImportant)
        setImportant(!important)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const newTask = {
            name, details, date, important, project: props.project._id
        }

        console.log('heres the task ur trying to add: ', newTask)

        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newTask)
        }
        const response = await fetch(`http://localhost:4000/api/projects/${props.project._id}/tasks`, options)
        
        const json = await response.json()

        if(response.ok){
            setDisplayNewTaskForm(false)
            console.log("new task submitted! resposne from server: ", json)
            //here the global state needs to  be updated by adding new task 
            //to this project's task list
        }
        if(!response.ok){
            setError(json.error)
            console.log("something went wrong submitting task: ", json)
        }   
    }

    return ( 
        <div className="project-container">
            <h1>{props.project.name}</h1>

                <div className="task-container">
                {
                    props.project.taskList.length !== 0
                    ? props.project.taskList.map(task => (
                        <TaskItem project={props.project} task={task}/>
                    ))

                    :   <div>
                            <p>No tasks currently on this project</p>

                        </div>
                }
                </div>
                <div className="new-task-form-and-button-container">
                {
                    displayNewTaskForm &&
                    <div className="new-task-form">
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className="form-section">
                                <label for="name"></label>
                                <input placeholder="name"
                                        name="name" 
                                        onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-section">
                                <label for="details"></label>
                                <input placeholder="details" 
                                        name="details"
                                        onChange={(e) => setDetails(e.target.value)}
                                ></input>
                            </div>
                            <div className="form-section">
                                <label for="date"></label>
                                <input placeholder="date" type="date" name="date"
                                        onChange={(e) => setDate(format(new Date(e.target.value), 'yyyy-mm-dd'))}
                                ></input>
                            </div>
                            <div className="form-section button-pointer" onClick={handleSetImportant}>
                                <img src={taskIsImportant ? StarFill : StarOutline} className="small-svg"></img>
                            </div>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                }
                <div className="new-task-button-container" onClick={handleDisplayNewTaskForm}>
                    <button><img src={Plus} className="small-svg plus-icon"></img></button>
                </div>
            </div>
        </div>
     );
}
 
export default Project;