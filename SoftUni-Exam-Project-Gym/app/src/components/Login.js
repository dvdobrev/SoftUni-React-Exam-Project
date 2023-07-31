import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import * as userServices from "../services/userServices";

import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../firebase";


import styles from '../imported-elements/css/global-stayles.module.css'
import loginRegisterCSS from "../imported-elements/css/loginRegisterCSS.module.css"


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userDataHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                userDataHandler(user);
                navigate("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });



        // const {
        //     email,
        //     password,
        // } = Object.fromEntries(new FormData(e.target));


        // userServices.login(email, password)
        //     .then(data => {
        //         userDataHandler(data);
        //         navigate('/');
        //     })
        //     .catch(() => {
        //         navigate('/PageNotFound');
        //     });
    };

    return (
        <div className={loginRegisterCSS["registerContainer"]}>
            <h1>Login </h1>

            <form onSubmit={onSubmit} id={loginRegisterCSS["login-form"]}>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="email"
                            name="email"
                            size={30}
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="password"
                            name="password"
                            size={30}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button className={styles["buttons"]} type="text">Log In </button>
            </form>
        </div>
    );
};
