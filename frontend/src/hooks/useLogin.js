import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {

    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = async (email, password) => {
        console.log(`logging in: email: ${email} password: ${password}`)
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
            let url
            if(process.env.NODE_ENV === 'development' || 'test'){
                url = `http://localhost:4000/api/users/login`
            }  
            if(process.env.NODE_ENV === 'production'){
                url = `https://todo-react-fullstack-production.up.railway.app/api/users/login`
            }
            const response = await fetch(url, options)
            const json = await response.json()
            console.log("json from log in attempt: ", json)

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
            setError(err.message)
            setIsLoading(false)
            console.log('DEBUG: error from useLogin hook: ', err)
        }

    }

    return {
        login, error, isLoading
    };
}
 
export default useLogin;