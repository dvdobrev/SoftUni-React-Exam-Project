import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

import { UserContext } from "./UserContext";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export const PlanContext = createContext();

export const PlanProvider = ({
    children,
}) => {

    const { ownerId } = useContext(UserContext);
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [userPlans, setUserPlans] = useState([]);



    useEffect(() => {
        if (ownerId) {

            fetchUserPlans();
        } else {
            // Reset user plans if ownerId is not available (user is logged out)
            setUserPlans([]);
        }
    }, [ownerId]);

    useEffect(() => {

        fetchAllPlans();
    }, [trainingPlans]);

    const fetchAllPlans = async () => {

        let list = [];

        const q = query(collection(db, "Plans"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        list.sort((a, b) => a.timeStamp - b.timeStamp);                

        setTrainingPlans(list);
    };

    // Fetch user plans if ownerId is available
    const fetchUserPlans = async () => {
        try {
            const q = query(collection(db, "Plans"), where("ownerId", "==", ownerId));
            const querySnapshot = await getDocs(q);
            let userList = querySnapshot.docs.map((doc) => doc.data());
            userList.sort((a, b) => a.timeStamp - b.timeStamp);               
            setUserPlans(userList);
        } catch (error) {
            console.error("Error fetching user plans:", error);
        }
    };

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
            fetchAllPlans,
            fetchUserPlans,
            addPlan,
            addUserPlan,
            // editPlan
        }}>
            {children}
        </PlanContext.Provider>
    );
};

