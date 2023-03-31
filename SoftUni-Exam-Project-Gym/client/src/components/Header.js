import { NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import styles from "../imported-elements/css/global-stayles.module.css";
import headerCSS from "../imported-elements/css/header.module.css";


import "../imported-elements/css/bootstrap.min.css";
import "../imported-elements/css/font-awesome.css";

export const Header = ({ navigationChangeHandler }) => {

    const { userData } = useContext(UserContext)

    // const onHeaderClick = (e) => {
    //     e.preventDefault();

    //     if (e.target.tagName === 'A') {
    //         let url = new URL(e.target.href)
    //         navigationChangeHandler(url.pathname)
    //         console.log(url.pathname);

    //     }

    // };

    //TODO: Remove the unnecessary code
    //TODO: Set the css (color, padiing...) of the Welcom span
    //TODO: Make the schedules page if you got time

    return (

        <header className={`${headerCSS["header-area"]} ${headerCSS["header-sticky"]}`}>

            <div className={styles["container"]}>
                <div className={headerCSS["row"]}>
                    <div className="col-12">
                        <nav className={headerCSS["main-nav"]}>

                            <NavLink className={headerCSS["logo"]} to="/">Training<em> Studio</em></NavLink>
                            <ul className={headerCSS["nav"]}>

                                {userData.email && <span id={headerCSS["welcomeSpan"]} >Hello {userData.email}</span>}

                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/">Home</NavLink></li>
                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/programs">Programs/Courses</NavLink></li>
                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/classes">Classes</NavLink></li>
                                {/* <li><NavLink className={headerCSS["scroll-to-section"]} to="schedules">Schedules</NavLink></li> */}
                                <li> <NavLink className={headerCSS["main-button"]} to="/plansCatalog">Your Training Plans</NavLink></li>
                                
                                {userData.email && 
                                    <li> <NavLink className={headerCSS["main-button"]} to="/createPlan">Creat Plan</NavLink></li>
                                }

                                <li> <NavLink className={headerCSS["scroll-to-section"]} to="/contact">Contact</NavLink></li>

                                {userData.email
                                    ? <div id="user">
                                        <li> <NavLink className={headerCSS["main-button"]} to="/logout">Logout</NavLink></li>
                                    </div>
                                    : <div id="guest">
                                        <li> <NavLink className={headerCSS["main-button"]} to="/login">Login</NavLink></li>
                                        <li><NavLink className={headerCSS["main-button"]} to="/signUp">Sign Up</NavLink></li>
                                    </div>
                                }


                            </ul>
                            <a className={headerCSS['menu-trigger']}>
                                <span>Menu</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}