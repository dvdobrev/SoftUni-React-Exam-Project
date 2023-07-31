import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Navigate, Outlet } from "react-router-dom";


export const LoginGuard = () => {

    const { userData } = useContext(UserContext);
    console.log("From Guard: ");

    if (Object.keys(userData).length > 0) {
        return <Navigate to="/" replace />
    }

    return <Outlet />

};
