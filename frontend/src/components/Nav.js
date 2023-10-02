import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectContext } from "../hooks/useProjectContext"; 
import Plus from "../img/plus.svg"
import Calendar from "../img/calendar.svg"
import Calendar2 from "../img/calendar2.svg"
import Flag from "../img/flag.svg"
import ProjectStar from "../img/star.svg"
import Notes from "../img/notes.svg"
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
            <NavLink to="/all" activeClassName="selected">
                <div className="nav-item">
                    <img src={Flag} className="smaller-svg"></img>
                    <h3 className="nav-title">All</h3>
                </div>
            </NavLink>
            <NavLink to="/today" activeClassName="selected">
                <div className="nav-item">
                    <img src={Calendar2} className="smaller-svg"></img>
                    <h3 className="nav-title">Today</h3>
                </div>
            </NavLink>
            <NavLink to="/week" activeClassName="selected">
                <div className="nav-item">
                    <img src={Calendar} className="smaller-svg"></img>
                    <h3 className="nav-title">Week</h3>
                </div>
            </NavLink>
            <NavLink to="/important" activeClassName="selected">
                <div className="nav-item">
                    <img src={ProjectStar} className="smaller-svg"></img>
                    <h3 className="nav-title">Important</h3>
                </div>
            </NavLink>
            
        {/* <div className="nav-projects-container"> */}
            <h3>Projects</h3>
            {
                isLoading === false && globalProjectState
                ? globalProjectState.projects.map((proj) => (
                    <NavProjectItem project={proj}/>
                ))
                : <p>"loading data..."</p>
            }
        {/* </div> */}

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
            <NavLink to="/notes" activeClassName="selected">
                <div className="nav-item">
                    <img src={Notes} className="smaller-svg"></img>
                    <h3 className="nav-title">Notes</h3>
                </div>
            </NavLink>

    </nav>
     );
     
}

 
export default Nav;