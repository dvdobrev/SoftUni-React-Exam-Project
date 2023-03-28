import styles from "../imported-elements/css/global-stayles.module.css";
import schedulesCSS from "../imported-elements/css/global-stayles.module.css";
import bgImage from "../imported-elements/images/schedule-bg.jpg";


export const Schedules = () => {

    //TODO: schedules CSS if it is complicated just create something else

    return (
        <section className={`${styles["section"]} ${schedulesCSS["schedule"]}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className={`${styles["section-heading"]} ${styles["dark-bg"]}`}>
                            <h2>Classes <em>Schedule</em></h2>
                            <img src={bgImage} alt="" />
                            <p>Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed viverra ipsum dolor, ultricies fermentum massa consequat eu.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className={`${schedulesCSS["filters"]}`}>
                            <ul className={`${schedulesCSS["schedule-filter"]}`}>
                                <li className="active" data-tsfilter="monday">Monday</li>
                                <li data-tsfilter="tuesday">Tuesday</li>
                                <li data-tsfilter="wednesday">Wednesday</li>
                                <li data-tsfilter="thursday">Thursday</li>
                                <li data-tsfilter="friday">Friday</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-10 offset-lg-1">
                        <div className={`${schedulesCSS["schedule-table"]} ${schedulesCSS["filtering"]}`}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="day-time">Fitness Class</td>
                                        <td className="monday ts-item show" data-tsmeta="monday">10:00AM - 11:30AM</td>
                                        <td className="tuesday ts-item" data-tsmeta="tuesday">2:00PM - 3:30PM</td>
                                        <td>William G. Stewart</td>
                                    </tr>
                                    <tr>
                                        <td className="day-time">Muscle Training</td>
                                        <td className="friday ts-item" data-tsmeta="friday">10:00AM - 11:30AM</td>
                                        <td className="thursday friday ts-item" data-tsmeta="thursday friday">2:00PM - 3:30PM</td>
                                        <td>Paul D. Newman</td>
                                    </tr>
                                    <tr>
                                        <td className="day-time">Body Building</td>
                                        <td className="tuesday ts-item" data-tsmeta="tuesday">10:00AM - 11:30AM</td>
                                        <td className="monday ts-item show" data-tsmeta="monday">2:00PM - 3:30PM</td>
                                        <td>Boyd C. Harris</td>
                                    </tr>
                                    <tr>
                                        <td className="day-time">Yoga Training Class</td>
                                        <td className="wednesday ts-item" data-tsmeta="wednesday">10:00AM - 11:30AM</td>
                                        <td className="friday ts-item" data-tsmeta="friday">2:00PM - 3:30PM</td>
                                        <td>Hector T. Daigle</td>
                                    </tr>
                                    <tr>
                                        <td className="day-time">Advanced Training</td>
                                        <td className="thursday ts-item" data-tsmeta="thursday">10:00AM - 11:30AM</td>
                                        <td className="wednesday ts-item" data-tsmeta="wednesday">2:00PM - 3:30PM</td>
                                        <td>Bret D. Bowers</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
