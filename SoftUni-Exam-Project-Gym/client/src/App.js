import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { UserContext } from './contexts/UserContext';

import * as traingPlanService from './services/trainingPlanService';

import {useLocalStorage} from './hooks/useLocalStorage';

import { Header } from './components/Header';
import { MainBanner } from './components/MainBanner';
import { CallToAction } from './components/CallToAction';
import { Testimonials } from './components/TestImonials';
import { ContakUsArea } from './components/ContaktUsArea';
import { Classes } from "./components/Classes";
import { Schedules } from "./components/Schedules";
import { Programs } from "./components/Programs";
import { MySchedules } from './components/MySchedules';
import { UsersTrainingCatalog } from './components/UsersTrainingCatalog';
import { SocialMedia } from './components/SocialMedia';
import { PageNotFound } from './components/PageNotFound';
import { Test } from './components/Test';
import { Footer } from './components/Footer';

import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Logout } from './components/Logout';

import { CreatePlan } from "./components/CreatePlan/CreatePlan";

function App() {

    const [trainingPlans, setTrainingPlans] = useState([]);

    const [userData, setUserData] = useLocalStorage('userData', {});
    const navigate = useNavigate();


    const loginHandler = (userData) => {
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

    const addPlan = (planData) => {
        setTrainingPlans(state => [
            ...state,
            planData,
        ]);
        navigate('/usersTrainingCatalog');

    };

    console.log(trainingPlans);


    //TODO: remove the unnecessary code
    return (
        // <div className="App">
        //     <Header
        //         navigationChangeHandler={navigationChangeHandler}
        //     />
        //     {/* <Preloader></Preloader> */}
        //     <div>
        //         {routes[page]}
        //         <Footer />
        //     </div>

        //     {/* <MainBanner />
        //     <CallToAction />
        //     <Testimonials />
        //     <ContakUsArea />
        //     <Footer /> */}
        // </div>

        <UserContext.Provider
            value={{
                userData,
                loginHandler,
                logoutHandler,
                trainingPlans,
                addPlan
            }}
        >

            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <MainBanner />
                            <CallToAction />
                            <Testimonials />
                        </main>}
                    />

                    <Route path="/programs" element={<Programs />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/contact" element={<ContakUsArea />} />
                    <Route path="/mySchedules" element={<MySchedules />} />
                    <Route path="/usersTrainingCatalog" element={<UsersTrainingCatalog trainingPlans={trainingPlans} />} />
                    <Route path="/socialMedia" element={<SocialMedia />} />
                    <Route path="/PageNotFound" element={<PageNotFound />} />
                    <Route path="/TestPage" element={<Test />} />
                    <Route path="/createPlan" element={<CreatePlan />} />



                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* <Route path="/pricing/*" element={<Pricing />} />
                <Route path="/pricing/premium" element={<h2>Premium Pricing</h2>} />
                <Route path="/contacts" element={<Contacts />} />

                <Route path="/starships" element={<StarshipList />} />
                <Route path="/starships/:starshipId/*" element={<Starship />} />
                <Route path="/millennium-falcon" element={<Navigate to="/products/10" replace />} />
                <Route path="*" element={<NotFound />} /> */}
                </Routes>
                <Footer />

            </div>
        </UserContext.Provider>
    );
}

export default App;
