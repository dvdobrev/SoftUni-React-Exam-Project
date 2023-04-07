import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';

export const CreatePlan = () => {

    const { addPlan } = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const planData = Object.fromEntries(new FormData(e.target));
        planServices.create(planData).then((result) => {
            addPlan(result);
        });
    };

    return (
        <section>
            <br />
            <br />
            <br />

            <form onSubmit={onSubmit}>
                <div className={createPlanCSS['createPlan']}>
                    <h1>Create your one month plan</h1>
                    <label htmlFor="level">
                        Level:
                        <select id="tag" name="level">
                            <option value="" disabled selected hidden>
                                Select level
                            </option>
                            <option value="beginner">beginner</option>
                            <option value="advanced">advanced</option>
                            <option value="profi">profi</option>
                        </select>
                    </label>
                    <label htmlFor="days">
                        Days per week:
                        <input type="text" name="days" placeholder="Days per week" />
                    </label>

                    <label htmlFor="description">Description: 
                        <textarea
                            name="description"
                            placeholder="Describe your plan"
                        />
                    </label>


                    <input
                        className={createPlanCSS["submitBtn"]}
                        type="submit"
                        value="Create Plan"
                    />

                </div>
            </form>
        </section>
    );
};
