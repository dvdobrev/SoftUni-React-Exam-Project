import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import styles from "../imported-elements/css/global-stayles.module.css";
import mainBannerCSS from "../imported-elements/css/banner.module.css";

import video from "../imported-elements/images/gym-video.mp4"

import { NavLink } from 'react-router-dom'


export const MainBanner = () => {
    const { userData } = useContext(UserContext);

    return (
        <div className={mainBannerCSS["main-banner"]} id="top">
            <video autoPlay muted loop id={mainBannerCSS["bg-video"]}>
                <source src={video} type="video/mp4" />
            </video>

            <div className={`${mainBannerCSS["video-overlay"]} ${styles["header-text"]}}`}>
                <div className={mainBannerCSS["caption"]}>
                    <h6>work harder, get stronger</h6>
                    <h2>easy with our <em>gym</em></h2>
                    {!userData?.email &&
                        <div>
                            <NavLink className={styles["buttons"]} to="/register">Become a member</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}