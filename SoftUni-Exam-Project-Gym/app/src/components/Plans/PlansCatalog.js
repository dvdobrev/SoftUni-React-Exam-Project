import { useContext } from "react";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';

import { PlanContext } from "../../contexts/PlanContext";

export const PlansCatalog = () => {

    const {trainingPlans} = useContext(PlanContext);
    const {userPlans} = useContext(PlanContext);

    return (

        <section id={`${catalogCSS["catalog-page"]}`}>

            <h1>All Plans</h1>

            <div className={catalogCSS["card-container"]}>
                {trainingPlans.length > 0
                    ? trainingPlans.map(plan => <CatalogItem key={plan._id} plan={plan} />)
                    : <h3 className="no-articles">No plans yet</h3>
                }

            </div>
        </section>
    );
};
