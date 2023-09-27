import {Route, Routes, Navigate} from "react-router-dom"
import { useState, useEffect } from 'react'
import RootLayout from '../layouts/RootLayout'
import All from '../pages/All';
import Week from '../pages/Week';
import Today from '../pages/Today';
import Important from '../pages/Important';
import NotFound from './NotFound';
import Project from '../pages/Project';
import Header from "./Header";
import Nav from "./Nav";
import useProjectContext from "../hooks/useProjectContext";
import useAuthContext from "../hooks/useAuthContext";
import User from "./User";
import Notes from "../pages/Notes";


const App = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    const { user } = useAuthContext()

    const [projects, setProjects] = useState([])
    const [error, setError] = useState(null)
    const [displayNav, setDisplayNav] = useState(user ? true : false)

    //fetch all projects and set global state on mount
    useEffect(() => {
        const fetchProjects = async () =>{
            console.log('DEBUG: heres the user.token for fetching projects from useEffect of App component: ', user.token)
            console.log('DEBUG: heres the user id whose projects are being fetched: ', user._id)
            setError(null)
            let url
            if(process.env.NODE_ENV === 'development' || 'test'){
                url = `http://localhost:4000/api/projects/${user._id}`
            }  
            if(process.env.NODE_ENV === 'production'){
                url = `https://todo-react-fullstack-production.up.railway.app/api/projects/${user._id}`
            }
            
            const response = await fetch(url,{
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            console.log('Debug: here\'s the initial project state from App component: ', json )
            if(response.ok){
                dispatch({type: 'SET_PROJECTS', payload: json})
            }
            if(!response.ok){
                setError(json.error)
                console.log(error)
            }
        }
        if(user){
            console.log('user detected...fetching projects')
            fetchProjects()
        }
        
    }, [user])

  
    

    return ( 
    <div className="app">

        <Header setDisplayNav={setDisplayNav} displayNav={displayNav}/>

        <main>
            
            {
              displayNav &&  <Nav />
            }
            
            <Routes element={<RootLayout />}>
                <Route path="/" element={user ? <All /> : <Navigate to="/user"/>} />
                <Route path="all" element={user ? <All /> : <Navigate to="/user"/>} />
                <Route path="week" element={user ? <Week /> : <Navigate to="/user"/>} />
                <Route path="today" element={user ? <Today /> : <Navigate to="/user"/>} />
                <Route path="important" element={user ? <Important /> : <Navigate to="/user"/>} />
                {
                    globalProjectState.projects.map((proj) => (
                        <Route path={`projects/${proj.name.split(" ").join("_")}`} element={user ? <Project project={proj}  /> : <Navigate to="/user"/>}/>
                    ))
                }
                <Route path="notes" element={user ? <Notes /> : <Navigate to="/user"/> } />
                <Route path="user" element={user ? <Navigate to="/all"/> : <User />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
                
        </main>
    </div> );
}
 
export default App;