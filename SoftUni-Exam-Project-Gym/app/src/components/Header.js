import { NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import styles from "../imported-elements/css/global-stayles.module.css";
import headerCSS from "../imported-elements/css/header.module.css";


import "../imported-elements/css/bootstrap.min.css";
import "../imported-elements/css/font-awesome.css";

export const Header = () => {

    const { userData } = useContext(UserContext)

    if (userData == undefined) {
        console.log("No user data");
    } else {
        console.log(userData.user);
    }


    return (

        <header className={`${headerCSS["header-area"]} ${headerCSS["header-sticky"]}`}>

            <div>
                {/* <div className={styles["container"]}> */}

                <div className="row">
                    <div className="col-12">
                        <nav className={headerCSS["main-nav"]}>

                            <NavLink className={headerCSS["logo"]} to="/">Training<em> Studio</em></NavLink>
                            <ul className={`${headerCSS["nav"]} ${headerCSS["header-guest"]}`}>

                                {userData?.email && <span id={headerCSS["welcomeSpan"]} >Hello {userData.email}</span>}

                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/">Home</NavLink></li>
                                {/* <li><NavLink className={headerCSS["scroll-to-section"]} to="/programs">Programs/Courses</NavLink></li> */}

                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/trainers">Trainers</NavLink></li>
                                <li><NavLink className={headerCSS["scroll-to-section"]} to="/classes">Classes</NavLink></li>
                                {/* <li><NavLink className={headerCSS["scroll-to-section"]} to="schedules">Schedules</NavLink></li> */}
                                <li> <NavLink className={headerCSS["main-button"]} to="/plansCatalog">Training Plans</NavLink></li>

                                {userData?.user &&
                                    <>
                                        <li> <NavLink className={headerCSS["main-button"]} to="/myPlans">My Plans</NavLink></li>
                                        <li> <NavLink className={headerCSS["main-button"]} to="/createPlan">Creat Plan</NavLink></li>
                                    </>
                                }

                                <li> <NavLink className={headerCSS["scroll-to-section"]} to="/contact">Contact</NavLink></li>

                                {userData?.email
                                    ? <div className={headerCSS["header-user"]}>
                                        {/* <li> <NavLink className={headerCSS["main-button"]} to="/profil">Profil</NavLink></li> */}
                                        <li> <NavLink className={styles["buttons"]} to="/logout">Logout</NavLink></li>
                                    </div>
                                    : <div className={headerCSS["header-user"]}>
                                        <li><NavLink className={styles["buttons"]} to="/login">Login</NavLink></li>
                                        <li><NavLink className={styles["buttons"]} to="/register">Register</NavLink></li>

                                    </div>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}