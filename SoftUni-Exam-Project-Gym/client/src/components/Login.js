import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import * as userServices from "../services/userServices";


import styles from "../imported-elements/css/global-stayles.module.css";
import loginRegisterCSS from "../imported-elements/css/loginRegisterCSS.module.css"


export const Login = () => {

    const { loginHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));


        userServices.login(email, password)
            .then(data => {
                loginHandler(data);
                navigate('/');
            })
            .catch(() => {
                navigate('/PageNotFound');
            });

        console.log(email);
        console.log(password);
    };

    return (
        <div className={loginRegisterCSS["signUpContainer"]}>
            <h1>Login </h1>

            <form onSubmit={onSubmit}>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input type="email" name="email" size={30} placeholder="Email" />
                        <br />
                        <br />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input type="password" name="password" size={30} placeholder="Password" />
                        <br />
                        <br />
                    </div>
                </div>

                <button type="text">Log In </button>

            </form>
        </div>
    );
};
