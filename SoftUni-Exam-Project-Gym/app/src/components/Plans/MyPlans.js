import { useContext } from "react";
import { PlanContext } from "../../contexts/PlanContext";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';


export const MyPlans = () => {

    const { userPlans } = useContext(PlanContext);

    return (

        <section id={`${catalogCSS["catalog-page"]}`}>

            <h1>My Plans</h1>

            <div className={catalogCSS["card-container"]}>
                {userPlans.length > 0
                    ? userPlans.map(plan => <CatalogItem key={plan._id} plan={plan} />)
                    : <h3>No plans yet</h3>
                }
            </div>
        </section>
    );
};
