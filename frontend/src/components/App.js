import {Route, Routes} from "react-router-dom"
import { useState, useEffect } from 'react'
import RootLayout from '../layouts/RootLayout'
import All from '../pages/Home';
import Week from '../pages/Week';
import Today from '../pages/Today';
import Important from '../pages/Important';
import NotFound from './NotFound';
import Project from '../pages/Project';
import Header from "./Header";
import Nav from "./Nav";


const App = () => {


    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("http://localhost:4000/api/projects")
            const json = await response.json()

            response.ok && setProjects(json)
        }

        fetchProjects()
    }, [])

    const [projects, setProjects] = useState([])

    return ( 
    <div className="app">

        <Header />

        <main>

            <Nav />

            <Routes elemen={<RootLayout />}>
                <Route index path="/" element={<All />} />
                <Route path="week" element={<Week />} />
                <Route path="today" element={<Today />} />
                <Route path="important" element={<Important />} />
                {
                    projects.map((proj) => (
                        <Route path={`projects/:${proj.name.split(" ").join("_")}`} element={<Project project={proj}  />}/>
                    ))
                }
                
                
                <Route path="*" element={<NotFound/>} />
            </Routes>

        </main>
    </div> );
}
 
export default App;