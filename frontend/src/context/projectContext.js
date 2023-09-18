import { createContext, useReducer, useEffect } from "react";

export const ProjectsContext = createContext();

//action is an object with a type and a payload
export const projectsReducer = (state, action) => {
    switch(action.type){
        case 'SET_PROJECTS':
            return {
                projects: [...action.payload]
            }
        case 'CREATE_PROJECT':
            return {
                projects: [...state, action.payload]
            }
        default: 
            return state
    }
}

export const ProjectContextProvider = ({ children }) => {

    const [globalProjectState, dispatch] = useReducer(projectsReducer, {
        projects: []
    })

    useEffect(() => {
        console.log("globalProjectState updated: ", globalProjectState)
    }, [globalProjectState])

    

    return ( 
        <ProjectsContext.Provider value={{ globalProjectState, dispatch }}>
            { children }
        </ProjectsContext.Provider>
     );
}
 
export default ProjectContextProvider;