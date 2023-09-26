import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectContext } from "../hooks/useProjectContext"; 
import Plus from "../img/plus.svg"
import useAuthContext from "../hooks/useAuthContext";
import NavProjectItem from "./NavProjectItem";


const Nav = () => {

    const [displayNav, setDisplayNav] = useState(true)
    const [projectFormInput, setProjectFormInput] = useState('')
    const [displayInput, setDisplayInput] = useState(false)
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const { dispatch, globalProjectState } = useProjectContext()
    const { user } = useAuthContext()

    const handleFormInputSubmit = async (e) => {
        const alreadyExists = projects.some(proj => {return proj.name === projectFormInput})
        if(alreadyExists){
            setError('project name already exists!')
        }
        if(!alreadyExists){
            setError(null)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ name: projectFormInput, user: user._id })
            }
            const response = await fetch(
                process.env.NODE_ENV === 'development' || 'test'
                ? 'http://localhost:4000/api/projects'
                : 'https://todo-react-fullstack-production.up.railway.app/api/projects', 
                options)
            const json = await response.json()
    
            if(!response.ok){
                setError(json.error)
            }
            if(response.ok){
                console.log('project successfully submitted:', json)
                setProjectFormInput('')
                setDisplayInput(false)
                //update local state with new project
                dispatch({type: 'SET_PROJECTS', 
                payload: [...globalProjectState.projects, json]
            })
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
                    <NavProjectItem project={proj}/>
                ))
                : <p>"loading data..."</p>
            }
        </div>

        {
            displayInput &&

            <div className="nav-input-container">
                <input className="nav-input" value={projectFormInput} onChange={(e) => setProjectFormInput(e.target.value)}></input>
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