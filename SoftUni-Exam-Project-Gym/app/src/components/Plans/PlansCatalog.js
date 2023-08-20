import { useContext, useEffect, useMemo, useState } from "react";

import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';

import { PlanContext } from "../../contexts/PlanContext";


export const PlansCatalog =  () => {

    const { trainingPlans } = useContext(PlanContext);

    const memoizedTrainingPlans = useMemo(() => trainingPlans, [trainingPlans]);


    return (

        <section id={`${catalogCSS["catalog-page"]}`}>

            <h1>All Plans</h1>

            <div className={catalogCSS["card-container"]}>
                {memoizedTrainingPlans.length > 0 ? (
                    memoizedTrainingPlans.map(plan => <CatalogItem key={plan.planId} plan={plan} />)
                ) : (
                    <h3 className="no-articles">No plans yet</h3>
                )}
            </div>
        </section>
    );
};
