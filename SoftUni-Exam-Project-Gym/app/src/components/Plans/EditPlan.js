import { useState, useContext, useEffect } from "react";
import { PlanContext } from "../../contexts/PlanContext";

import { useParams, useNavigate } from 'react-router-dom';

import createAndEditCSS from '../../imported-elements/css/createAndEdit.module.css';
import styles from '../../imported-elements/css/global-stayles.module.css';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";


export const EditPlan = () => {

    const [currentPlan, setCurrentPlan] = useState({});
    const [firebaseDokumentId, setFirebaseDokumentId] = useState("");
    const { fetchAllPlans, fetchUserPlans } = useContext(PlanContext);
    const { planId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState({
        daysErrorMessage: '',
        textErrorMessage: ''
    });

    useEffect(() => {

        const getPlan = async () => {

            try {
                const q = query(collection(db, "Plans"), where("planId", "==", planId));
                const querySnapshot = await getDocs(q);
                const searchedPlan = querySnapshot.docs.map((doc) => doc.data())[0];
                const dokId = querySnapshot.docs[0].id;
                setCurrentPlan(searchedPlan);
                setFirebaseDokumentId(dokId);
            } catch (error) {
                console.error("Error fetching user plans:", error);
            }
        };

        getPlan();

    }, [planId, navigate]);


    const onSubmit = async (e) => {
        e.preventDefault();

        const seachedPlanRef = doc(db, "Plans", firebaseDokumentId);

        try {
            const planData = Object.fromEntries(new FormData(e.target));

            await updateDoc(seachedPlanRef, {
                level: planData.level,
                days: planData.days,
                description: planData.description,
            });

            await fetchAllPlans();
            await fetchUserPlans();
            navigate(`/myPlans`);
        } catch (error) {
            console.error("Error saving the plan:", error);
            navigate(`/pageNotFound`);
        }
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
        <section className={`${createAndEditCSS["createPlanSection"]}`}>
            <h1>Edit Plan</h1>
            <form onSubmit={onSubmit} id={createAndEditCSS["create-plan-form"]}>
                <div className={createAndEditCSS["createPlan"]}>
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
                </div>

                <div className={createAndEditCSS["submit-div"]}>
                    <input
                        className={styles["buttons"]}
                        type="submit"
                        value="Edit Plan"
                    />
                </div>

            </form>
        </section>
    );
}
