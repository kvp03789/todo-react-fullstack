import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import { isThisWeek, parseISO } from "date-fns";
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"

const Week = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    const [week, setWeek ] = useState([])

    useEffect(() => {
        const tasks = []
        globalProjectState.projects.forEach(proj => {
            proj.taskList.forEach(task => {
                if(isThisWeek(parseISO(task.date))){
                    tasks.push(task)
                }
            })
        })
        setWeek([...tasks])
    }, [])
    
    return ( 
        <div className="project-container">
            <div className="project-title-container">
                <h1>Week</h1>
            </div>
            <div className="task-container">
            
            {week.length === 0 
                ? <p>No tasks due this week</p>
                :
                week.map(task => (
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
 
export default Week;