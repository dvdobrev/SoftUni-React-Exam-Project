import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

import { useParams, useNavigate } from 'react-router-dom';

import * as planServices from '../services/trainingPlanService';
import *as userServices from '../services/userServices';
import createPlanCSS from '../imported-elements/css/createPlan.module.css';



export const Profil = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    console.log(userData);

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = Object.fromEntries(new FormData(e.target));

        userServices.editUserData(userData)
            .then(() => {
                navigate(`/profil`)
            });
    };

    console.log(userData.firstName);

    return (
        <section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form id="edit" onSubmit={onSubmit}>
                <div className={createPlanCSS["createPlan"]}>
                    <h1>Edit Profil</h1>
                    <label htmlFor="firstName">FirsName:
                        <input
                            type="text"
                            name="firstName"
                        defaultValue={userData.firstName}
                        />
                    </label>

                    <label htmlFor="lastName">Last Name:
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={userData.lastName}
                        />
                    </label>

                    <label htmlFor="city">City:
                        <input
                            type="text"
                            name="city"
                            defaultValue={userData.city}
                        />
                    </label>

                    

                    <input
                        className={createPlanCSS["submitBtn"]}
                        type="submit"
                        value="Edit Profile"
                    />

                </div>
            </form>
        </section>
    );
}
