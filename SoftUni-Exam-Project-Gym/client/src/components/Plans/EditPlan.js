import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useParams, useNavigate } from 'react-router-dom';

import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';



export const EditPlan = () => {

    const [currentPlan, setCurrentPlan] = useState({});
    const { editPlan } = useContext(UserContext);
    const { planId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        planServices.getOne(planId)
            .then(planData => {
                setCurrentPlan(planData);
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const planData = Object.fromEntries(new FormData(e.target));

        planServices.edit(planId, planData)
            .then(result => {
                editPlan(planId, result);
                navigate(`/plansCatalog`)
            });
    };

    return (
        <section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form id="edit" onSubmit={onSubmit}>
                <div className={createPlanCSS["createPlan"]}>
                    <h1>Edit Plan</h1>
                    <label htmlFor="day">Day:
                        <input
                            type="text"
                            name="day"
                            defaultValue={currentPlan.day}
                        />
                    </label>

                    <label htmlFor="time">Time:
                        <input
                            type="text"
                            name="time"
                            defaultValue={currentPlan.time} />
                    </label>


                    <label htmlFor="muscleGroup">Muscle Group:
                        <input
                            type="text"
                            name="muscleGroup"
                            defaultValue={currentPlan.muscleGroup} />
                    </label>

                    <input
                        className={createPlanCSS["submitBtn"]}
                        type="submit"
                        value="Edit Plan"
                    />

                </div>
            </form>
        </section>
    );
}
