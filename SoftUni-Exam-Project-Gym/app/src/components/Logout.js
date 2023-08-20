import { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(UserContext);


    useEffect(() => {
        logoutHandler()
        // localStorage.clear()
        navigate('/')
    });

    return null;
};
