import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


import styles from '../imported-elements/css/global-stayles.module.css'
import loginRegisterCSS from "../imported-elements/css/loginRegisterCSS.module.css";


export const Register = () => {

    const { userDataHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const [error, setError] = useState({
        firstnameErrorMessage: '',
        lastnameErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        matchPasswordErrorMessage: '',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(error).some((message) => message !== '');

        if (hasErrors) {
            return;
        }

        // const formData = new FormData(e.target);

        // const email = formData.get('email');
        // const password = formData.get('password');
        // const repeatPassword = formData.get('repeatPassword');
        // const firstName = formData.get('firstName');
        // const lastName = formData.get('lastName');

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                userDataHandler(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle error
            });
    }

    const firstnameValidation = (e) => {
        const name = e.target.value;
        let message = '';

        if (name.length < 2 || name.length > 16) {
            message = 'The firstname must be between 2 and 16 characters'
        }

        setError(state => ({
            ...state,
            firstnameErrorMessage: message,
        }));
    }

    const lastnameValidation = (e) => {
        const name = e.target.value;
        let message = '';

        if (name.length < 2 || name.length > 16) {
            message = 'The lastname must be between 2 and 16 characters'
        }

        setError(state => ({
            ...state,
            lastnameErrorMessage: message,
        }));
    }

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

    const passwordValidation = (e) => {
        const password = e.target.value;
        let errorMessage = '';

        if (password.length < 6 || password.length > 20) {
            errorMessage = 'The passowrd must be between 6 and 20 characters'
        }

        setError(state => ({
            ...state,
            passwordErrorMessage: errorMessage,
        }));

    }

    const repeatPasswordValidation = (e) => {
        const repeatPassword = e.target.value;
        let errorMessage = '';

        if (password !== repeatPassword) {
            errorMessage = 'Passwords don\'t macht';
        }

        setError(state => ({
            ...state,
            matchPasswordErrorMessage: errorMessage,
        }));
    }


    return (

        <div className={loginRegisterCSS["registerContainer"]}>
            <h1>Sign Up</h1>

            <form onSubmit={onSubmit} id={loginRegisterCSS["register-form"]}>

                {/* <div className="form-outline mb-0">
                    <div className="form-outline">

                        <input
                            type="text"
                            name="firstName"
                            size={30}
                            placeholder="First Name (optional)"
                            onBlur={firstnameValidation}
                        />

                        {error.firstnameErrorMessage &&
                            <div style={{ color: 'white' }}>{error.firstnameErrorMessage}</div>
                        }
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="text"
                            name="lastName"
                            size={30}
                            placeholder="Last Name (optional)"
                            onBlur={lastnameValidation}
                        />

                        {error.lastnameErrorMessage &&
                            <div style={{ color: 'white' }}>{error.lastnameErrorMessage}</div>
                        }
                    </div>
                </div> */}

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="email"
                            name="email"
                            size={30}
                            placeholder="Email"
                            onBlur={emailValidation}
                            onChange={e => setEmail(e.target.value)}
                        />

                        {error.emailErrorMessage &&
                            <div style={{ color: 'white' }}>{error.emailErrorMessage}</div>
                        }
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="password"
                            name="password"
                            size={30}
                            placeholder="Password"
                            onBlur={passwordValidation}
                            onChange={e => setPassword(e.target.value)}

                        />

                        {error.passwordErrorMessage &&
                            <div style={{ color: 'white' }}>{error.passwordErrorMessage}</div>
                        }
                    </div>
                </div>

                <div className="form-outline mb-0">
                    <div className="form-outline">
                        <input
                            type="password"
                            name="repeatPassword"
                            size={30}
                            placeholder="Repeat Password"
                            onChange={e => setRepeatPassword(e.target.value)}
                            onBlur={repeatPasswordValidation}
                        />
                        {error.matchPasswordErrorMessage &&
                            <div style={{ color: 'white' }}>{error.matchPasswordErrorMessage}</div>
                        }
                    </div>
                </div>

                <button
                    className={`${styles["buttons"]} ${loginRegisterCSS["button"]}`}
                    type="submit"
                > Sign up
                </button>
            </form>
        </div>
    );
};
