import { NavLink } from "react-router-dom";
import { useState } from "react";
import Plus from "../img/plus.svg"

const Nav = () => {

    const [formInput, setFormInput] = useState('')
    const [displayInput, setDisplayInput] = useState(false)

    const handleFormInputSubmit = (e) => {
        console.log(formInput)
    }
    return ( 
        <div className="sidebar">
            <nav>
                <NavLink to="/all">All</NavLink>
                <NavLink to="/today">Today</NavLink>
                <NavLink to="/week">Week</NavLink>
                <NavLink to="/important">Important</NavLink>
            </nav>

            {
                displayInput &&

                <div className="nav-input-container">
                    <input className="nav-input" onChange={(e) => setFormInput(e.target.value)}></input>
                    <button className="add-button form-button" onClick={handleFormInputSubmit}>Add</button>
                    <button className="cancel-button form-button" onClick={() => setDisplayInput(false)}>Cancel</button>
                </div>

            }
            {
                !displayInput &&

                <button onClick={() => setDisplayInput(!displayInput)}><img src={Plus} className="small-svg"/>New Project</button>
            }
        </div>
     );
}
 
export default Nav;