import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { UserContext } from './contexts/UserContext';

import * as traingPlanService from './services/trainingPlanService';

import { useLocalStorage } from './hooks/useLocalStorage';

import { Header } from './components/Header';
import { MainBanner } from './components/MainBanner';
import { CallToAction } from './components/CallToAction';
import { Trainers } from './components/Trainers';
import { ContakUsArea } from './components/ContaktUsArea';
import { Classes } from "./components/Classes";
// import { Programs } from "./components/Programs";
import { PlansCatalog } from './components/Plans/PlansCatalog';
import { PageNotFound } from './components/PageNotFound';
import { Profil } from './components/Profil';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Logout } from './components/Logout';

import { MyPlans } from './components/Plans/MyPlans';
import { CreatePlan } from "./components/Plans/CreatePlan";
import { EditPlan } from './components/Plans/EditPlan';
import { PlanDetails } from './components/Plans/PlanDetails';

import { Footer } from './components/Footer';
import { RoutGuard } from './routGuards/RoutGuard';


function App() {

    const [trainingPlans, setTrainingPlans] = useState([]);
    const [userPlans, setUserPlans] = useState([]);

    const [userData, setUserData] = useLocalStorage('userData', {});
    const ownerId = userData._id;

    const navigate = useNavigate();


    const userDataHandler = (userData) => {
        setUserData(userData);
    };

    const logoutHandler = () => {
        setUserData({});
    };

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
                const userPlans = result.filter(plan => plan._ownerId === ownerId);
                setUserPlans(userPlans);
            });
    }

    const addPlan = (planData) => {
        setTrainingPlans(state => [
            ...state,
            planData,
        ]);
        navigate('/plansCatalog');

    };

    const addUserPlan = (planData) => {
        setUserPlans(state => [
            ...state,
            planData,
        ]);
        navigate('/plansCatalog');

    };

    const editPlan = (planId, planData) => {
        setTrainingPlans(state => state.map(plan => plan._id === planId ? planData : plan));
    }

    //TODO: Replace the logic above in some provider, and get it from there
    // Video 22.07.2022 , 01.18.00h ili ostavat 02.21.00h

    return (

        <UserContext.Provider
            value={{
                userData,
                userDataHandler: userDataHandler,
                logoutHandler,
                trainingPlans,
                fetchallPlans,
                fetchUserPlans,
                userPlans,
                addPlan,
                addUserPlan,
                editPlan,
            }}
        >

            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <MainBanner />
                            <CallToAction />
                        </main>}
                    />

                    <Route path="/trainers" element={<Trainers />} />
                    {/* <Route path="/programs" element={<Programs />} /> */}
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/contact" element={<ContakUsArea />} />
                    <Route path="/plansCatalog" element={<PlansCatalog trainingPlans={trainingPlans} />} />
                    <Route path="/pageNotFound" element={<PageNotFound />} />
                    {/* <Route path="/profil" element={<Profil userData={userData} />} /> */}

                    <Route element={<RoutGuard />}>
                        <Route path="/myPlans" element={<MyPlans userPlans={userPlans} />} />
                        <Route path="/createPlan" element={<CreatePlan />} />
                        <Route path="/plans/:planId/edit" element={<EditPlan />} />
                    </Route>
                    <Route path="/plans/:planId/details"
                        element={<PlanDetails
                            plans={trainingPlans}
                        />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<RoutGuard />}>
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                </Routes>
                <Footer />

            </div>
        </UserContext.Provider>
    );
}

export default App;
