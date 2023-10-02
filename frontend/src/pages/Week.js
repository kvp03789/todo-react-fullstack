import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import { isThisWeek, parseISO, format } from "date-fns";
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"
import CheckGrey from "../img/check-grey.svg"
import CheckFilled from "../img/check-filled.svg"

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
                    <div className={task.complete ? "task-item task-complete" : "task-item"} key={task._id}>
                        <div className="task-item-section check-container">
                            {<img src={task.complete ? CheckFilled : CheckGrey} className="small-svg check-svg"></img>}
                        </div>
                        <div className="task-item-section">
                            <h3>{task.name}</h3>
                        </div>
                        <div className="task-item-section">
                            <p>{task.details}</p>
                        </div>
                        <div className="task-item-section">
                            {/* <p>{props.task.date}</p> */}
                            <p>{format(parseISO(task.date), 'MM-dd-yyyy')}</p>
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