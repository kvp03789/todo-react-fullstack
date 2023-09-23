import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
        const context = useContext(AuthContext)

        return context
}
 
export default useAuthContext;