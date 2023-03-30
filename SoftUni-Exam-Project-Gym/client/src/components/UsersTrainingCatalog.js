import { CatalogItem } from "./CatalogItem/CatalogItem";
import catalogItemCSS from '../imported-elements/css/catalogItem.module.css'
export const UsersTrainingCatalog = ({ trainingPlans }) => {

    return (
        //TODO: Make may training plan with todos or combine it with mySchedules
        //TODO: Make Edit and delete to user data, todos .... make it to all
        //TODO: Make logic the customer to send Email in Contak form, and get automaticly confirm that his email came.
        //TODO: Make Page with patern trainings element, for example for leg, arms...
        //TODO: Make Page where the user can add Memos, for example starting kg, kg on day x, time spending in the jim und more
        //TODO: Make a page where the user can posts their training programs
        //TODO: Make if user type in the browser ../myTrainingPlan, to go to the login if the user is not loged in


        <section id="catalog-page">

            <br></br>
            <br></br>
            <br></br>

            <h1>All Plans</h1>

            <div className={catalogItemCSS["card-container"]}>
                {trainingPlans.length > 0
                    ? trainingPlans.map(plan => <CatalogItem key={plan._id} plan={plan} />)
                    : <h3 className="no-articles">No plans yet</h3>
                }

            </div>
        </section>
    );
};
