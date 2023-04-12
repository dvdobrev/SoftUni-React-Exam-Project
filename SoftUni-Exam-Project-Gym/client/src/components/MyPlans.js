import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { CatalogItem } from "./CatalogItem/CatalogItem";
import catalogCSS from '../imported-elements/css/catalog.module.css';
import headerCSS from '../imported-elements/css/header.module.css';



export const MyPlans = () => {

    const {userPlans} = useContext(UserContext);

    return (
    
        <section id={`${catalogCSS["catalog-page"]}`}>

            <br></br>
            <br></br>
            <br></br>

            <h1>My Plans</h1>

            <div className={catalogCSS["card-container"]}>
                {userPlans.length > 0
                    ? userPlans.map(plan => <CatalogItem key={plan._id} plan={plan} />)
                    : <h3 className="no-articles">No plans yet</h3>
                }

            </div>
        </section>
    );
};
