import styles from "../imported-elements/css/global-stayles.module.css";
import trainersCSS from "../imported-elements/css/trainers.module.css";

import wavePic from "../imported-elements/images/line-dec.png";
import firstTrainer from "../imported-elements/images/first-trainer.jpg";
import secondTrainer from "../imported-elements/images/second-trainer.jpg";
import thirdTrainer from "../imported-elements/images/third-trainer.jpg";
import "../imported-elements/css/bootstrap.min.css";
import "../imported-elements/css/font-awesome.css";

import { NavLink } from 'react-router-dom';


//TODO: Add the comments here like recensions for the trainers

export const Trainers = () => {

    return (
        <section className={styles["section"]} id={trainersCSS["trainers"]}>
            <div className={styles["container"]}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className={styles["section-heading"]}>
                            <h2>Expert <em>Trainers</em></h2>
                            <img src={wavePic} alt="wave pic" />
                            <p>Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed viverra ipsum dolor, ultricies fermentum massa consequat eu.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className={trainersCSS["trainer-item"]}>
                            <div className="image-thumb">
                                <img src={firstTrainer} alt="" />
                            </div>
                            <div className="down-content">
                                <span>Strength Trainer</span>
                                <h4>Bret D. Bowers</h4>
                                <p>Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.</p>
                                <ul className={trainersCSS["social-icons"]}>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-facebook"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-twitter"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-linkedin"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-behance"></i></NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={trainersCSS["trainer-item"]}>
                            <div className="image-thumb">
                                <img src={secondTrainer} alt="" />
                            </div>
                            <div className="down-content">
                                <span>Muscle Trainer</span>
                                <h4>Hector T. Daigl</h4>
                                <p>Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.</p>
                                <ul className={trainersCSS["social-icons"]}>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-facebook"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-twitter"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-linkedin"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-behance"></i></NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={trainersCSS["trainer-item"]}>
                            <div className="image-thumb">
                                <img src={thirdTrainer} alt="" />
                            </div>
                            <div className="down-content">
                                <span>Power Trainer</span>
                                <h4>Paul D. Newman</h4>
                                <p>Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.</p>
                                <ul className={trainersCSS["social-icons"]}>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-facebook"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-twitter"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-linkedin"></i></NavLink></li>
                                    <li><NavLink to="/socialMedia"><i className="fa fa-behance"></i></NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}