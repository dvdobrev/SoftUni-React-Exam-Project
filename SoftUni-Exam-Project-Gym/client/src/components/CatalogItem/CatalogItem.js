import catalogItemCSS from '../../imported-elements/css/catalogItem.module.css';
import { Link } from 'react-router-dom';
export const CatalogItem = ({ plan }) => {

    return (
        <div className={catalogItemCSS["card"]}>
            <h3>{plan.day}</h3>
            <div className={catalogItemCSS["info"]}>
                <div className={catalogItemCSS["icon-time"]}>

                </div>
                <h4>{plan.time}</h4>
            </div>
            <div className={catalogItemCSS["info"]}>
                <div className={catalogItemCSS["icon-group"]}>

                </div>
                <h4>{plan.muscleGroup}</h4>
            </div>

            <Link to={`/plans/${plan._id}/details`} className="details-button">
                Details
            </Link>

        </div>
    );
};
