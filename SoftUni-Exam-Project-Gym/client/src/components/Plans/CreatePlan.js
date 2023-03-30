import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';

export const CreatePlan = () => {
    const { addPlan } = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const planData = Object.fromEntries(new FormData(e.target));

        console.log(planData);

        planServices.create(planData)
            .then(result => {
                addPlan(result)
            });
    };

    return (
        <section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={onSubmit}>
                <div className={createPlanCSS["createPlan"]}>
                    <h1>Create Plan</h1>
                    <label htmlFor="day">Day:
                        <input
                            type="text"
                            name="day"
                            placeholder="On which DAY you will train"
                        />
                    </label>

                    <label htmlFor="time">Time:
                        <input
                            type="text"
                            name="time"
                            placeholder="At what TIME you will train"
                        />
                    </label>


                    <label htmlFor="muscleGroup">Muscle Group:
                        <input
                            type="text"
                            name="muscleGroup"
                            placeholder="WHAT will you train"
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

