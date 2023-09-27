import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"

const Today = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    const [today, setToday] = useState([])

    useEffect(() => {
        const tasks = []
        const isToday = (date) => {
            const today = new Date()
            console.log('DATE DEBUG: ', today.toDateString(), new Date(date).toDateString())

            if(new Date(date).setHours(0,0,0,0) === today.setHours(0,0,0,0)){
                return true
            }
            else return false
        }

        globalProjectState.projects.forEach(proj => {
            proj.taskList.forEach(task => {
                if(isToday(task.date)){
                    tasks.push(task)
                }
            })
        })
        console.log("DEBUG - todays tasks: ", tasks)
        setToday([...tasks])
    }, [])
    
    return ( 
        <div className="project-container">
            <div className="project-title-container">
                <h1>Today</h1>
            </div>
            <div className="task-container">
            {
                today.length === 0 
                ? <p>No tasks due today</p>
                :
                today.map(task => (
                    <div className="task-item" key={task._id}>
                        <div className="task-item-section">
                            <h3>{task.name}</h3>
                        </div>
                        <div className="task-item-section">
                            <p>{task.details}</p>
                        </div>
                        <div className="task-item-section">
                            <p>{task.date}</p>
                        </div>
                        <div className="task-item-section">
                            <p>{task.important ? <img className="small-svg" src={StarFill}></img> : <img className="small-svg" src={StarOutline}></img>}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
     );
}
 
export default Today;