import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as traingPlanService from '../services/trainingPlanService';
import { UserContext } from "./UserContext";

import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


export const PlanContext = createContext();

export const PlanProvider = ({
    children,
}) => {

    const { ownerId } = useContext(UserContext);
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [userPlans, setUserPlans] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        if (ownerId) {
            // Fetch user plans if ownerId is available
            const fetchUserPlans = async () => {
                try {
                    const q = query(collection(db, "Plans"), where("ownerId", "==", ownerId));
                    const querySnapshot = await getDocs(q);
                    const userList = querySnapshot.docs.map((doc) => doc.data());
                    setUserPlans(userList);
                } catch (error) {
                    console.error("Error fetching user plans:", error);
                }
            };

            fetchUserPlans();
        } else {
            // Reset user plans if ownerId is not available (user is logged out)
            setUserPlans([]);
        }
    }, [ownerId]);

    useEffect(() => {
        const fetchAllPlans = async () => {

            let list = [];

            const q = query(collection(db, "Plans"));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setTrainingPlans(list);
        };

        fetchAllPlans();
    }, [trainingPlans]);



    const addPlan = (planData) => {
        setTrainingPlans(state => [
            ...state,
            planData,
        ]);

    };

    const addUserPlan = (planData) => {
        setUserPlans(state => [
            ...state,
            planData,
        ]);
    };

    // const editPlan = (planId, planData) => {
    //     setTrainingPlans(state => state.map(plan => plan._id === planId ? planData : plan));
    // }


    return (
        <PlanContext.Provider value={{
            ownerId,
            trainingPlans,
            userPlans,
            addPlan,
            addUserPlan,
            // editPlan
        }}>
            {children}
        </PlanContext.Provider>
    );
};

