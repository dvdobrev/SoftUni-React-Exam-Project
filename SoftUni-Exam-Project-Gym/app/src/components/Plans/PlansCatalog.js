import { CatalogItem } from "../CatalogItem/CatalogItem";
import catalogCSS from '../../imported-elements/css/catalog.module.css';

export const PlansCatalog = ({ trainingPlans }) => {

    return (
        //TODO: Make if user type in the browser ../myTrainingPlan, to go to the login if the user is not loged in
        //TODO: Make Guard for the todo above
        //TODO: make deployment
        //TODO: Delete the comments from database after delete a plan
        //TODO: make client side rendering for the comments
        //TODO: Edit the Register form, it brokes when the user invalid input
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
