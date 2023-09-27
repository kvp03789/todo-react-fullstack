import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import StarOutline from "../img/star-outline.svg"
import StarFill from "../img/star-fill.svg"

const Important = () => {

    const [important, setImportant] = useState([])
    const { dispatch, globalProjectState } = useProjectContext()

    useEffect(() => {
        const tasks = []
        globalProjectState.projects.forEach(proj => {
            proj.taskList.forEach(task => {
                task.important === true && tasks.push(task)
            })
        })
        setImportant([...tasks])

        console.log('DEBUG: important list', important)
    }, [])
    
    return (
        <div className="project-container">
            <div className="project-title-container">
                <h1>Important</h1>
            </div>
            <div className="task-container">
                {important.length === 0 
                ? <p>No important tasks. Mark tasks as important in their project.</p>
                :
                    important.map(task => (
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
 
export default Important;