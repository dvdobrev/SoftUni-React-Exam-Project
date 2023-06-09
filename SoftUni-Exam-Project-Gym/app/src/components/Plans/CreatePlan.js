import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanContext } from "../../contexts/PlanContext";
import * as planServices from '../../services/trainingPlanService';
import createPlanCSS from '../../imported-elements/css/createPlan.module.css';
import styles from '../../imported-elements/css/global-stayles.module.css'

export const CreatePlan = () => {

    const navigate = useNavigate();

    const [error, setError] = useState({
        daysErrorMessage: '',
        textErrorMessage: ''
    });

    const { addPlan, addUserPlan } = useContext(PlanContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(error).some((message) => message !== '');

        if (hasErrors) {
            return;
        }

        const planData = Object.fromEntries(new FormData(e.target));

        planServices.create(planData).then((result) => {
            addPlan(result);
            addUserPlan(result);
            navigate('/plansCatalog');
        }).catch((error) => {
            navigate(`/pageNotFound`)
        });
    };

    const isDigitValidation = (e) => {
        const days = e.target.value.trim();
        const daysRegex = /^\d+$/;
        let message = '';

        // I use here regex, because if I use isNan() instead, if I
        // write isNaN('1e1000'), this will be accepted as number
        if (!daysRegex.test(days)) {
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
        <section className={`${createPlanCSS["createPlanSection"]}`}>
            <h1>Create your own one month plan</h1>
            <form onSubmit={onSubmit} id={createPlanCSS["create-plan-form"]}>
                <div className={createPlanCSS['createPlan']}>
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

                    <label htmlFor="days" > Days per week:
                        <input
                            type="text"
                            name="days"
                            placeholder="Days per week"
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
                            placeholder="Describe your plan"
                            onBlur={minTextValidation}
                            required
                        />
                        {error && <span style={{ color: 'red' }}>{error.textErrorMessage}</span>}
                    </label>
                </div>

                <div className={createPlanCSS["submit-div"]}>
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
