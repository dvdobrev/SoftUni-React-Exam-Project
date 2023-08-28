import { useState, useContext, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import createAndEditCSS from '../imported-elements/css/createAndEdit.module.css';
import styles from '../imported-elements/css/global-stayles.module.css';

import { UserContext } from "../contexts/UserContext";

import { getAuth, updateEmail } from "firebase/auth";




export const EditProfile = () => {

    const { userData, logoutHandler } = useContext(UserContext);

    const email = userData.email;

    const auth = getAuth();


    const navigate = useNavigate();

    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState({
        emailErrorMessage: '',
    });


    const onSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = Object.values(error).some((message) => message !== '');

        if (hasErrors) {
            return;
        }

        try {
            await setNewEmail(newEmail);
            await updateEmail(auth.currentUser, newEmail);
            logoutHandler();
            navigate(`/login`);
        } catch (error) {
            console.error("Error saving the plan:", error);
            navigate(`/pageNotFound`);
        }
    };

    const emailValidation = (e) => {
        const email = e.target.value;
        let message = '';
        const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) {
            message = 'The email must contain only characters, digits, ".", "-" or "_"';
        }

        setError(state => ({
            ...state,
            emailErrorMessage: message,
        }));
    };



    return (
        <section className={`${createAndEditCSS["createPlanSection"]}`}>
            <h1>Edit Profile</h1>
            <form onSubmit={onSubmit} id={createAndEditCSS["create-plan-form"]}>
                <div className={createAndEditCSS["createPlan"]}>

                    <label htmlFor="email">Email:
                        <input
                            type="email"
                            name="email"
                            defaultValue={email}
                            onBlur={(e) => {
                                setNewEmail(e.target.value);
                                emailValidation(e);
                            }}
                            required
                        />
                        {error.emailErrorMessage
                            ? <span style={{ color: 'red' }}>{error.emailErrorMessage}</span>
                            : <span></span>
                        }
                    </label>

                </div>

                <div className={createAndEditCSS["submit-div"]}>
                    <input
                        className={styles["buttons"]}
                        type="submit"
                        value="Edit Profile"
                    />
                </div>

            </form>
        </section>
    );
}
