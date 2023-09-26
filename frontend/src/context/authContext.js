import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [globalUserState, dispatch] = useReducer(authReducer, { user: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            console.log('DEBUG: USER TOKEN DETECTED, heres the payload to be dispatched: ', user.user)
            dispatch({type: 'LOGIN', payload: user.user})
        }
        if(!user){
            dispatch({type: 'LOGOUT'})
        }
        
    }, [])

    console.log('global auth state: ', globalUserState)

    return ( 
        <AuthContext.Provider value={{ ...globalUserState, dispatch }}>
            { children }
        </AuthContext.Provider>
     );
}
 
