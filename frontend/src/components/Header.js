import useAuthContext from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { NavLink } from 'react-router-dom'
import MainLogo from "../img/listo_logo.png"
import MenuIcon from '../img/menu.svg'

const Header = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleMenuClick = () => {
        const nav = document.querySelector("nav")
        nav.classList.contains("hidden")
         ? nav.classList.remove("hidden")
         : nav.classList.add("hidden")
    }

    return ( 
        <header>
            <div className="header-section" onClick={handleMenuClick}>
                <img src={MenuIcon} className="small-svg menu-icon button-pointer"/>
            </div>
            <div className="logo-container header-section">
                <img src={MainLogo}/>
            </div>
            {
            !user && 
                <div className="header-buttons-container header-section">
                    <NavLink to="/user">
                        <button className="login-button header-button button-pointer">Login</button>
                    </NavLink>
                    <NavLink to="/user">
                        <button className="signup-button  header-button button-pointer">Sign up</button>
                    </NavLink>
                </div>
            }
            {
            user &&
            
            <div className="header-buttons-container header-section">
                <h3>{user.email}</h3>
                <button onClick={logout} className="logout-button  header-button button-pointer">Log out</button>
            </div> 
            }
        </header>
     );
}
 
export default Header;