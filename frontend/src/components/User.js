import { useState, useEffect } from "react";
import Logo from "../img/listo_logo.png"
import useSignup from "../hooks/useSignup";
import useLogin from "../hooks/useLogin";

const User = () => {

    // useEffect(() => {
    //     //display nav or not
    //     const nav = document.querySelector("nav")
    //     !nav.classList.contains("hidden")
    //     && nav.classList.add("hidden")
    // }, [])
    
    const [showSignup, setShowSignup] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVerify, setPasswordVerify] = useState('')
    const { signup } = useSignup()
    const { login, error } = useLogin()

    const handleLogin = async (e) => {
            e.preventDefault()
            await login(email, password)
            setEmail('')
            setPassword('')
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log(`attempting sign up: email: ${email} password: ${password} passwordVerify: ${passwordVerify}`)
        if(password === passwordVerify){
            await signup(email, password)
        }
    }

    return ( 
        <div className="user-page-container">
            <div className="user-page-section">
                <img src={Logo} className="small-logo"></img>
            </div>

            {!showSignup &&
                <div className="user-page-section login-section">
                    <form onSubmit={e => handleLogin(e)}>
                    <div className="user-form-container">
                        <h3>Login</h3>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/> 
                        <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/> 
                        <button type="submit">Submit</button>
                    </div>
                    </form>
                    <h5>Don't have an account?</h5>
                        <button className="button-pointer" onClick={() => setShowSignup(true)}>Sign up</button>
                        {
                            error &&
                            <div className="error-container">
                                <p className="error-message">{error}</p>
                            </div>
                        }
                </div>
            }

            {showSignup &&
                <div className="user-page-section signup-section">
                    <form onSubmit={e => handleSignup(e)}>
                        <div className="user-form-container">
                            <h3>Sign up</h3>
                            <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/> 
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/> 
                            <input type="password" placeholder="Verify password" onChange={(e) => {setPasswordVerify(e.target.value)}}/> 
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <h5>Already a member?</h5>
                        <button className="button-pointer" onClick={() => setShowSignup(false)}>Log in</button>
                        {
                            error &&
                            <div className="error-container">
                                <p className="error-message">{error}</p>
                            </div>
                        }
                </div>
            }
            
        </div>
     );
}
 
export default User;