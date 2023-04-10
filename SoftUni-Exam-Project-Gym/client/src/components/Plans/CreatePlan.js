import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';
import styles from '../../imported-elements/css/global-stayles.module.css'

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
        <section className={`${createPlanCSS["createPlaneSection"]}`}>
            <br />
            <br />
            <br />

            <h1>Create your own one month plan</h1>
            <form onSubmit={onSubmit} id={createPlanCSS["create-plan-form"]}>
                <div className={createPlanCSS['createPlan']}>
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
                </div>

                <div className={createPlanCSS["submit-container"]}>
                    <input
                        className={styles["buttons"]}
                        type="submit"
                        value="Create Plan"
                    />
                </div>
            </form>
        </section>
    );
};
