import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {

    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        try{
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password }) 
            }
            const response = await fetch(`http://localhost:4000/api/users/login`, options)
            const json = await response.json()

            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
                setIsLoading(false)
                //save the user to local storage
                localStorage.setItem('user', JSON.stringify({user: {email: json.email, token: json.token, _id: json._id}}))
                //update global auth context
                dispatch({type: 'LOGIN', payload: {email: json.email, token: json.token, _id: json._id }})
            }
        }
        catch(err){
            setError(err)
            setIsLoading(false)
        }

    }

    return {
        login, error, isLoading
    };
}
 
export default useLogin;