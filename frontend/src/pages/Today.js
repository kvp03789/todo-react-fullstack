import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";

const Today = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    
    return ( 
        <div className="task-container">
            <h1>Today</h1>
        </div>
     );
}
 
export default Today;