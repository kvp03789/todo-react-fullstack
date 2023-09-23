import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";

const Week = () => {

    const { dispatch, globalProjectState } = useProjectContext()
    
    return ( 
        <div className="task-container">
            <h1>Week</h1>
        </div>
     );
}
 
export default Week;