import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useParams, useNavigate } from 'react-router-dom';

import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';
import styles from '../../imported-elements/css/global-stayles.module.css'


export const EditPlan = () => {

    const [currentPlan, setCurrentPlan] = useState({});
    const { editPlan } = useContext(UserContext);
    const { planId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState({
        daysErrorMessage: '',
        textErrorMessage: ''
    });

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
                navigate(`/myPlans`)
            });
    };

    const isDigitValidation = (e) => {
        const days = e.target.value
        let message = '';

        // I use here regex, because if I use isNan() instead, if I
        // write isNaN('1e1000'), this will be accepted as number
        if (!/^\d+$/.test(days)) {
            message = 'Days should contain ONLY digits';

            setError(state => ({
                ...state,
                daysErrorMessage: message,
            }));
        }

        setError(state => ({
            ...state,
            daysErrorMessage: message,
        }));
    };

    const minTextValidation = (e) => {
        const text = e.target.value;
        let message = '';

        const wordCount = text.split(/\s+/).length;
        if (wordCount < 4) {
            message = 'Text should contain at least 4 words';
            setError(state => ({
                ...state,
                textErrorMessage: message,
            }));

        }

        setError(state => ({
            ...state,
            textErrorMessage: message,
        }));
    }


    return (
        <section className={`${createPlanCSS["createPlaneSection"]}`}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form onSubmit={onSubmit} id={createPlanCSS["create-plan-form"]}>
                <div className={createPlanCSS["createPlan"]}>
                    <h1>Edit Plan</h1>

                    <label htmlFor="level">
                        Level:
                        <select id="tag" name="level" defaultValue="" required>
                            <option value="" disabled hidden>
                                Select level
                            </option>
                            <option value="beginner">beginner</option>
                            <option value="advanced">advanced</option>
                            <option value="profi">profi</option>
                        </select>
                    </label>

                    <label htmlFor="days">Days per week:
                        <input
                            type="text"
                            name="days"
                            defaultValue={currentPlan.days}
                            onBlur={isDigitValidation}
                            required
                        />
                        {error.daysErrorMessage
                            ? <span style={{ color: 'red' }}>{error.daysErrorMessage}</span>
                            : <span></span>
                        }
                    </label>

                    <label htmlFor="description">Description:
                        <textarea
                            name="description"
                            defaultValue={currentPlan.description}
                            onBlur={minTextValidation}
                            required
                        />
                        {error && <span style={{ color: 'red' }}>{error.textErrorMessage}</span>}
                    </label>

                    <div className={createPlanCSS["submit-container"]}>
                        <input
                            className={styles["buttons"]}
                            type="submit"
                            value="Edit Plan"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}
