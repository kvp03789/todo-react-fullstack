import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";

const Important = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    
    return ( 
        <div className="task-container">
            <h1>Important</h1>
        </div>
     );
}
 
export default Important;