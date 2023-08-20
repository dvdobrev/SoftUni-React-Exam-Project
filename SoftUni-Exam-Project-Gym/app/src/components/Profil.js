import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { useNavigate, Link } from 'react-router-dom';

import { getAuth, deleteUser } from "firebase/auth";


import detailsCSS from "../imported-elements/css/details.module.css";
import styles from "../imported-elements/css/global-stayles.module.css";




export const Profile = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log('user: ', user);

    const { userData, logoutHandler } = useContext(UserContext);

    const email = userData.email;

    const [showConfirm, setShowConfirm] = useState(false);


    const navigate = useNavigate();

    const confirmDeleteHandler = () => {
        setShowConfirm(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirm(false);
    };

    const deleteProfileHandler = async () => {

        try {
            await deleteUser(user);
            setShowConfirm(false);
            await logoutHandler();

            navigate(`/`);
        } catch (err) {
            // navigate(`/pageNotFound`);
        }

    };


    return (
        <section>

            <h1>Your Profile</h1>

            <div>
                <p>{email}</p>
            </div>

            <Link to={`/profile/edit`} className={styles["buttons"]}>
                Edit
            </Link>

            <button
                onClick={confirmDeleteHandler}
                className={styles["buttons"]}
            >
                Delete
            </button>

            {showConfirm && (
                <div
                    className={`${detailsCSS["confirm-message"]} ${detailsCSS["h2"]}`}
                >
                    <h2 className={detailsCSS["h2"]}>
                        Are you sure you want to delete your account?
                    </h2>
                    <button onClick={cancelDeleteHandler}>Cancel</button>
                    <button onClick={deleteProfileHandler}>Delete</button>
                </div>
            )}

        </section>
    );
}
