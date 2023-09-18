import { useContext } from "react";
import { ProjectsContext } from "../context/projectContext";

export const useProjectContext = () => {
        const context = useContext(ProjectsContext)

        return context
}
 
export default useProjectContext;