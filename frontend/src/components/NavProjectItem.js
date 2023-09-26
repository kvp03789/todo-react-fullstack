import { useState } from "react";
import { NavLink } from "react-router-dom";
import Dots from "../img/dots.svg"
import useAuthContext from "../hooks/useAuthContext";

const NavProjectItem = (props) => {

    const [displayDotsMenu, setDisplayDotsMenu] = useState(false)
    const [displayEditProjectForm, setDisplayEditProjectForm] = useState(false)
    const [name, setName] = useState(props.project.name)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    const handleDotsClick = () => {
        setDisplayDotsMenu(!displayDotsMenu)
    }

    const handleDeleteProject = async () => {
        const options = {
            method: 'DELETE',
            headers: { 
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test'
            ? `http://localhost:4000/api/projects/${props.project._id}`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/${props.project._id}`, 
            options)
        const json = await response.json()

        if(response.ok){
            console.log("Delete project success: ", json)
            setDisplayDotsMenu(false)
        }
        if(!response.ok){
            console.log("Debug: couldnt delete project: ", json.error)
            setError(json.error)
        }
        
    }

    const handleEditProject = () => {
        console.log("Edited Project")
        setDisplayDotsMenu(false)
        setDisplayEditProjectForm(!displayEditProjectForm)
    }

    const handleFormSubmit = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, _id: props.project._id })
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test'
            ? `http://localhost:4000/api/projects/${props.project._id}`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/${props.project._id}`, 
            options)
        const json = await response.json()

        if(response.ok){
            setDisplayEditProjectForm(false)
            console.log("project name edited!: ", json)
        }
        if(!response.ok){
            setError(json.error)
        }
    }

    return ( 
        <div className="nav-project-item nav-item">
        <div className="nav-project-item-section">
            <NavLink to={`projects/${props.project.name.split(" ").join("_")}`} className="nav-item">{props.project.name}</NavLink>
            <div onClick={handleDotsClick} className="nav-item-dots-container">
                <img src={Dots} className="smaller-svg button-pointer"></img>
                {
                    displayDotsMenu &&
                    <div className="edit-popup button-pointer">
                        <div className="popup-section button-pointer" onClick={handleEditProject}>
                            <p>Edit Project</p>
                        </div>
                        <div className="popup-section button-pointer" onClick={handleDeleteProject}>
                            <p>Delete Project</p>
                        </div>
                    </div>
                }
            </div>
        </div>
        <div className="nav-project-item-section">
            {
                displayEditProjectForm &&
                <div className="edit-project-form-container">
                    <div className="form-section">
                        <input name="name" defaultValue={props.project.name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="form-section">
                        <button onClick={handleFormSubmit}>Edit</button>
                        <button onClick={() => setDisplayEditProjectForm(false)}>Cancel</button>
                    </div>
                </div>
            }
        </div>
        </div>
     );
}
 
export default NavProjectItem;