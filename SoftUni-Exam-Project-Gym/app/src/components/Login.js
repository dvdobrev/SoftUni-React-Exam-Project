import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import * as userServices from "../services/userServices";

import styles from '../imported-elements/css/global-stayles.module.css'
import loginRegisterCSS from "../imported-elements/css/loginRegisterCSS.module.css"


export const Login = () => {

    const { userDataHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));


        userServices.login(email, password)
            .then(data => {
                userDataHandler(data);
                navigate('/');
            })
            .catch(() => {
                navigate('/PageNotFound');
            });
    };

    return (
        <div className={loginRegisterCSS["registerContainer"]}>
            <h1>Login </h1>

            <form onSubmit={onSubmit} id={loginRegisterCSS["login-form"]}>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input type="email" name="email" size={30} placeholder="Email" />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input type="password" name="password" size={30} placeholder="Password" />
                    </div>
                </div>

                <button className={styles["buttons"]} type="text">Log In </button>
            </form>
        </div>
    );
};
