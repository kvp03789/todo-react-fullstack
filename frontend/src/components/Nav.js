import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectContext } from "../hooks/useProjectContext"; 
import Plus from "../img/plus.svg"

const Nav = () => {

    const [projectFormInput, setProjectFormInput] = useState('')
    const [displayInput, setDisplayInput] = useState(false)
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch, globalProjectState } = useProjectContext()

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true)
            const response = await fetch('http://localhost:4000/api/projects')

            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_PROJECTS', payload: json})
                setIsLoading(false)
            }
            if(!response.ok){
                setError(json.error)
                setIsLoading(false)
            }
            console.log("Debug: projects json in nav component: ", json)
        }
        
        fetchProjects()
    }, [])

   

    const handleFormInputSubmit = async (e) => {
        const alreadyExists = projects.some(proj => {return proj.name === projectFormInput})
        if(alreadyExists){
            setError('project name already exists!')
        }
        if(!alreadyExists){
            setError(null)
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: projectFormInput })
            }
            const response = await fetch('http://localhost:4000/api/projects', options)
            const json = await response.json()
    
            if(!response.ok){
                setError(json.error)
            }
            if(response.ok){
                console.log('project successfully submitted:', json)
                setProjectFormInput('')
            }

        }
    }
    return ( 
        <nav>
            <NavLink to="/all" className="nav-item">All</NavLink>
            <NavLink to="/today" className="nav-item">Today</NavLink>
            <NavLink to="/week" className="nav-item">Week</NavLink>
            <NavLink to="/important" className="nav-item">Important</NavLink>
        

        <div className="nav-projects-container">
            {
                isLoading === false && globalProjectState
                ? globalProjectState.projects.map((proj) => (
                    <div className="nav-project-item nav-item">
                        <NavLink to={`/projects/${proj.name.split(" ").join("_")}`} className="nav-item">{proj.name}</NavLink>
                    </div>
                ))
                : <p>"loading data..."</p>
            }
        </div>

        {
            displayInput &&

            <div className="nav-input-container">
                <input className="nav-input" onChange={(e) => setProjectFormInput(e.target.value)}></input>
                <button className="add-button form-button" onClick={handleFormInputSubmit}>Add</button>
                <button className="cancel-button form-button" onClick={() => setDisplayInput(false)}>Cancel</button>
            </div>

        }
        {
            !displayInput &&

            <button onClick={() => setDisplayInput(!displayInput)}><img src={Plus} className="small-svg"/>New Project</button>
        }
        {
            error && <p className="error-message">{error}</p>
        }

    </nav>
     );
     
}

 
export default Nav;