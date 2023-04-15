import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Navigate, Outlet } from "react-router-dom";


export const RoutGuard = () => {

    const { userData } = useContext(UserContext);

    if (!userData.email) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />

};
