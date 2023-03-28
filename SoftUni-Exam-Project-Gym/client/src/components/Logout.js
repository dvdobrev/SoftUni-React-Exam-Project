import { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import * as userServices from '../services/userServices';

export const Logout = () => {
    const navigate = useNavigate();
    const {userData, logoutHandler} = useContext(UserContext);


    useEffect(() => {
        userServices.logout(userData.accessToken)
            .then(() => {
                logoutHandler();
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    });

    return null;

    //TODO: Edit this page
    // return (


    //     <div>
    //         <br></br>
    //         <br></br>

    //         <br></br>

    //         <br></br>

    //         <h1> Logout Page</h1>
    //     </div>
    // );
};
