import { createContext } from "react";

import { useLocalStorage } from '../hooks/useLocalStorage';


export const UserContext = createContext();

export const UserProvider = ({
    children,
}) => {

    const [userData, setUserData] = useLocalStorage('userData', {});
    const ownerId = userData.uid;

    const userDataHandler = (userData) => {
        setUserData(userData);
    };

    const logoutHandler = () => {
        setUserData({});
    };


    return (
        <UserContext.Provider value={{
            userData,
            ownerId,
            userDataHandler,
            logoutHandler,
        }}>

            {children}
        </UserContext.Provider>
    );
};

