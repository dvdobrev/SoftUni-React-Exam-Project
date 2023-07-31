import { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import * as userServices from '../services/userServices';

export const Logout = () => {
    const navigate = useNavigate();
    const { userData, logoutHandler } = useContext(UserContext);


    useEffect(() => {
        logoutHandler()
        // localStorage.clear()
        navigate('/')
            // userServices.logout(userData.accessToken)
            //     .then(() => {
            //         logoutHandler();
            //         localStorage.clear();
            //         navigate('/');
            //     })
            // .catch(() => {
            //     navigate('/');
            // });
    });

    return null;
};
