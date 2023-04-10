import { useState } from "react";

import styles from "../imported-elements/css/global-stayles.module.css";
import classesCSS from "../imported-elements/css/our-classes.module.css";

import waves from "../imported-elements/images/line-dec.png";
import tabsFirstIcon from "../imported-elements/images/tabs-first-icon.png";
import traning1 from "../imported-elements/images/training-image-01.jpg";
import traning2 from "../imported-elements/images/training-image-02.jpg";
import traning3 from "../imported-elements/images/training-image-03.jpg";
import traning4 from "../imported-elements/images/training-image-04.jpg";



export const Classes = () => {

    const [activeTab, setActiveTab] = useState('tabs-1'); // set the initial active tab to the first tab

    const showTab = (tabId) => {
        setActiveTab(tabId);
    }

    return (
        <section className={`${classesCSS["our-classes"]}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className={`${styles["section-heading"]}`}>
                            <h2>Our <em>Classes</em></h2>
                            <img src={waves} alt="" />
                            <p>Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed viverra ipsum dolor, ultricies fermentum massa consequat eu.</p>
                        </div>
                    </div>
                </div>
                <div className={`"row" ${classesCSS["tabs"]}`}>
                    <div className="col-lg-4">
                        <ul>
                            <li>
                                <a href='#tabs-1'
                                    onClick={() => showTab('tabs-1')}
                                    className={activeTab === 'tabs-1' ? 'active' : ''}>
                                    <img src={tabsFirstIcon} alt="" />
                                    First Training Class
                                    <br></br>
                                    <em className={`${classesCSS["classes-trainers"]}`}>(Bret D. Bowers)</em>
                                </a>
                            </li>
                            <li>
                                <a href='#tabs-2'
                                    onClick={() => showTab('tabs-2')}
                                    className={activeTab === 'tabs-2' ? 'active' : ''}>
                                    <img src={tabsFirstIcon} alt="" />
                                    Second Training Class
                                    <br></br>
                                    <em className={`${classesCSS["classes-trainers"]}`}>(Paul D. Newman)</em>
                                </a>
                            </li>
                            <li>
                                <a href='#tabs-3'
                                    onClick={() => showTab('tabs-3')}
                                    className={activeTab === 'tabs-3' ? 'active' : ''}>
                                    <img src={tabsFirstIcon} alt="" />
                                    Third Training Class
                                    <br></br>
                                    <em className={`${classesCSS["classes-trainers"]}`}>(Hector T. Daigl)</em>
                                </a>
                            </li>
                            <li>
                                <a href='#tabs-4'
                                    onClick={() => showTab('tabs-4')}
                                    className={activeTab === 'tabs-4' ? 'active' : ''}>
                                    <img src={tabsFirstIcon} alt="" />
                                    Fourth Training Class
                                    <br></br>
                                    <em className={`${classesCSS["classes-trainers"]}`}>(Bret D. Bowers)</em>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-8">
                        <section className={classesCSS["tabs-content"]}>
                            <article id='tabs-1' style={{ display: activeTab === "tabs-1" ? "block" : "none" }}>
                                <img src={traning1} alt="First Class" />
                                <h4>First Training Class</h4>
                                <h6>(Bret D. Bowers)</h6>
                                <p>Phasellus convallis mauris sed elementum vulputate. Donec posuere leo sed dui eleifend hendrerit. Sed suscipit suscipit erat, sed vehicula ligula. </p>
                            </article>

                            <article id='tabs-2' style={{ display: activeTab === "tabs-2" ? "block" : "none" }}>
                                <img src={traning2} alt="Second Training" />
                                <h4>Second Training Class</h4>
                                <h6>(Paul D. Newman)</h6>
                                <p>Integer dapibus, est vel dapibus mattis, sem mauris luctus leo, ac pulvinar quam tortor a velit. Praesent ultrices erat ante, in ultricies augue ultricies faucibus. </p>
                            </article>

                            <article id='tabs-3' style={{ display: activeTab === "tabs-3" ? "block" : "none" }}>
                                <img src={traning3} alt="Third Class" />
                                <h4>Third Training Class</h4>
                                <h6>(Hector T. Daigl)</h6>
                                <p>Fusce laoreet malesuada rhoncus. Donec ultricies diam tortor, id auctor neque posuere sit amet.</p>
                            </article>

                            <article id='tabs-4' style={{ display: activeTab === "tabs-4" ? "block" : "none" }}>
                                <img src={traning4} alt="Fourth Training" />
                                <h4>Fourth Training Class</h4>
                                <h6>(Bret D. Bowers)</h6>
                                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac tur.</p>
                            </article>
                        </section>
                    </div>
                </div >
            </div >
        </section >
    );
};
