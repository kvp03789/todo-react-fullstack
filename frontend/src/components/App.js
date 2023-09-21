import {Route, Routes} from "react-router-dom"
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


const App = () => {

    //fetch all projects and set global state on mount
    useEffect(() => {
        const fetchProjects = async () =>{
            const response = await fetch('http://localhost:4000/api/projects')
            const json = await response.json()
            console.log('Debug: here\'s the initial project state from App component: ', json )

            dispatch({type: 'SET_PROJECTS', payload: json})
        }

        fetchProjects()
    }, [])

    const { dispatch, globalProjectState } = useProjectContext()
    const [projects, setProjects] = useState([])

    return ( 
    <div className="app">

        <Header />

        <main>

            <Nav />

            <Routes element={<RootLayout />}>
                <Route path="all" element={<All />} />
                <Route path="week" element={<Week />} />
                <Route path="today" element={<Today />} />
                <Route path="important" element={<Important />} />
                {
                    globalProjectState.projects.map((proj) => (
                        <Route path={`projects/${proj.name.split(" ").join("_")}`} element={<Project project={proj}  />}/>
                    ))
                }
                
                
                <Route path="*" element={<NotFound/>} />
            </Routes>

        </main>
    </div> );
}
 
export default App;