import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import styles from "../imported-elements/css/global-stayles.module.css";
import featureCSS from "../imported-elements/css/feturare.module.css";


import waves from "../imported-elements/images/line-dec.png";
import featuresFirstIcon from "../imported-elements/images/features-first-icon.png";

//TODO: Remove or change the discover more button
export const Programs = () => {

    const { userData } = useContext(UserContext);
    console.log(userData.email);

    return (

        <section className={`${styles["section"]} ${featureCSS["features"]}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className={styles["section-heading"]}>
                            <h2>Choose <em>Program</em></h2>
                            <img src={waves} alt="waves" />

                            <p>Some Info about all our training programs</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className={featureCSS["features-items"]}>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="First One" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>Basic Fitness</h4>
                                    <p>Info about Basic Fitness</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}
                                </div>
                            </li>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="second one" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>New Gym Training</h4>
                                    <p>Info about New Gim Training</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}

                                </div>
                            </li>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="third gym training" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>Basic Muscle Course</h4>
                                    <p>Info about Basic Muscle Course</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}

                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <ul className={featureCSS["features-items"]}>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="fourth muscle" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>Advanced Muscle Course</h4>
                                    <p>Info about Advanced Muscle Course</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}

                                </div>
                            </li>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="training fifth" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>Yoga Training</h4>
                                    <p>Info about Yoga Training</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}

                                </div>
                            </li>
                            <li className={featureCSS["feature-item"]}>
                                <div className={featureCSS["left-icon"]}>
                                    <img src={featuresFirstIcon} alt="gym training" />
                                </div>
                                <div className={featureCSS["right-content"]}>
                                    <h4>Body Building Course</h4>
                                    <p>Info about Body Building Course</p>
                                    <a href="#" className={featureCSS["text-button"]}>Discover More</a>
                                    {userData.emai && <button>Book Program</button>}

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
