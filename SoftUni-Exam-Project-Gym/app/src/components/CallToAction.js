import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import styles from "../imported-elements/css/global-stayles.module.css";
import callToActionCSS from "../imported-elements/css/call-to-action.module.css";


import { NavLink } from 'react-router-dom';


export const CallToAction = () => {

    const { userData } = useContext(UserContext);

    return (
        <section className={styles["section"]} id={callToActionCSS["call-to-action"]}>
            <div className={styles["container"]}>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className={callToActionCSS["cta-content"]}>
                            <h2>Don’t <em>think</em>, begin <em>today</em>!</h2>
                            <p>Ut consectetur, metus sit amet aliquet placerat, enim est ultricies ligula, sit amet dapibus odio augue eget libero. Morbi tempus mauris a nisi luctus imperdiet.</p>
                            {!userData?.email &&
                                <div>
                                    <NavLink className={styles["buttons"]} to="/register">Become a member</NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )

}