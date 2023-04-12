import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';

export const PlansCatalog = ({ trainingPlans }) => {

    return (
        //TODO: Make Page where the user can add Memos, for example starting kg, kg on day x, time spending in the jim und more
        //TODO: Make if user type in the browser ../myTrainingPlan, to go to the login if the user is not loged in

        <section id={`${catalogCSS["catalog-page"]}`}>

            <br></br>
            <br></br>
            <br></br>

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
