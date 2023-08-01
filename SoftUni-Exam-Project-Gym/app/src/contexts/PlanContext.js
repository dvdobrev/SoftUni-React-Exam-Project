import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as traingPlanService from '../services/trainingPlanService';
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

const navigate = useNavigate();


useEffect(() => {
    const fetchPlans = async () => {
        let list = [];
        try {
            const q = query(collection(db, "Plans"), where("ownerId", "==", "bg2JuhR1y9RNDSevvYoPjKT27mE2"));
            const querySnapshot = await getDocs(q);

            // const plansArray = querySnapshot.docs.map((doc) => doc.data());
            // setTrainingPlans(plansArray);
            // setLoading(false);

            querySnapshot.forEach((doc) => {
                    list.push(doc.data());
            });
            setTrainingPlans(list);


        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    };

    fetchPlans();
}, []);



// useEffect(() => {
//     const getAllOwnPlans = (ownerId) => {
//         traingPlanService.getAll()
//             .then(result => {
//                 const userPlans = result.filter(plan => plan._ownerId === ownerId);
//                 setUserPlans(userPlans)
//             });
//     }

//     getAllOwnPlans(ownerId);
// }, [ownerId, navigate]);


// const fetchUserPlans = (ownerId) => {
//     traingPlanService.getAll()
//         .then(result => {
//             const ownPlans = result.filter(plan => plan._ownerId === ownerId);
//             setUserPlans(ownPlans);
//         });
// }

// const addPlan = (planData) => {
//     setTrainingPlans(state => [
//         ...state,
//         planData,
//     ]);

// };

// const addUserPlan = (planData) => {
//     setUserPlans(state => [
//         ...state,
//         planData,
//     ]);
// };

// const editPlan = (planId, planData) => {
//     setTrainingPlans(state => state.map(plan => plan._id === planId ? planData : plan));
// }


return (
    <PlanContext.Provider value={{
        ownerId,
        trainingPlans,
        userPlans,
        // fetchallPlans,
        // fetchUserPlans,
        // addPlan,
        // addUserPlan,
        // editPlan
    }}>
        {children}
    </PlanContext.Provider>
);
};

