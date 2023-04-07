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

                    <label htmlFor="level">
                        Level:
                        <select name="level">
                            <option value="beginner">beginner</option>
                            <option value="advanced">advanced</option>
                            <option value="profi">profi</option>
                        </select>
                    </label>

                    <label htmlFor="days">Days:
                        <input
                            type="text"
                            name="days"
                            defaultValue={currentPlan.days} />
                    </label>

                    <label htmlFor="description">Description:
                        <textarea
                            name="description"
                            defaultValue={currentPlan.description}
                        />
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
