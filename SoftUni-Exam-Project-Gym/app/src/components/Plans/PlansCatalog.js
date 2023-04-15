import { useContext } from "react";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';

import { PlanContext } from "../../contexts/PlanContext";

export const PlansCatalog = () => {

    const {trainingPlans} = useContext(PlanContext);
    const {userPlans} = useContext(PlanContext);

    console.log(userPlans);
    console.log(trainingPlans);

    return (
        //TODO: Delete the comments from database after delete a plan
        //TODO: make client side rendering for the comments
        //TODO: delete the comments from training plan services


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
