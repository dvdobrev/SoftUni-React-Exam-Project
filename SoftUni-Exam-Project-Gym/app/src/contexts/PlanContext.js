import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as traingPlanService from '../services/trainingPlanService';
import { UserContext } from "./UserContext";


export const PlanContext = createContext();

export const PlanProvider = ({
    children,
}) => {

    const { ownerId } = useContext(UserContext);
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [userPlans, setUserPlans] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        traingPlanService.getAll()
            .then(result => {
                setTrainingPlans(result);
            });
    }, []);

    useEffect(() => {
        const getAllOwnPlans = (ownerId) => {
            traingPlanService.getAll()
                .then(result => {
                    const userPlans = result.filter(plan => plan._ownerId === ownerId);
                    setUserPlans(userPlans)
                });
        }

        getAllOwnPlans(ownerId);
    }, [ownerId, navigate]);

    const fetchallPlans = () => {
        traingPlanService.getAll()
            .then(result => {
                setTrainingPlans(result);
            });
    }

    const fetchUserPlans = (ownerId) => {
        traingPlanService.getAll()
            .then(result => {
                const ownPlans = result.filter(plan => plan._ownerId === ownerId);
                setUserPlans(ownPlans);
            });
    }

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

    const editPlan = (planId, planData) => {
        setTrainingPlans(state => state.map(plan => plan._id === planId ? planData : plan));
    }


    return (
        <PlanContext.Provider value={{
            ownerId,
            trainingPlans,
            userPlans,
            fetchallPlans,
            fetchUserPlans,
            addPlan,
            addUserPlan,
            editPlan
        }}>
            {children}
        </PlanContext.Provider>
    );
};

