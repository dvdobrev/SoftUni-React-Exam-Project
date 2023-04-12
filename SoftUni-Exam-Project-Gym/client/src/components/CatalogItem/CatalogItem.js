import catalogItemCSS from '../../imported-elements/css/catalog.module.css';
import { Link } from 'react-router-dom';
import CalendarIcon from '../../imported-elements/images/calendarIcon.png'
import LevelIcon from '../../imported-elements/images/level.png'


export const CatalogItem = ({ plan }) => {

    return (
        <div className={catalogItemCSS["card"]}>
            <div className={catalogItemCSS["info"]}>
                <div>
                    <img id={`${catalogItemCSS["level-img"]}`} src={LevelIcon} alt="Level icon" />
                </div>
                <h4>Level: {plan.level}</h4>
            </div>
            <div className={catalogItemCSS["info"]}>
                <div>
                    <img src={CalendarIcon} alt="Calendar icon" />
                </div>
                <h4>{plan.days} times per week</h4>
            </div>

            <Link to={`/plans/${plan._id}/details`} className={`${catalogItemCSS["details-button"]}`}>
                Details
            </Link>

        </div>
    );
};
