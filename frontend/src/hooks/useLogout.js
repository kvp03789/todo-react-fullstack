import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {

        //remove user from local storage
        localStorage.removeItem('user')

        //logout action for global auth state
        dispatch({action: 'LOGOUT'})
    }

    return {
        logout
    }
}