import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import { UserContext } from './contexts/UserContext';

import { Header } from './components/Header';
import { MainBanner } from './components/MainBanner';
import { CallToAction } from './components/CallToAction';
import { Testimonials } from './components/TestImonials';
import { ContakUsArea } from './components/ContaktUsArea';
import { Footer } from './components/Footer';
import { Classes } from "./components/Classes";
import { Schedules } from "./components/Schedules";
import { Programs } from "./components/Programs";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { MySchedules } from './components/MySchedules';
import { MyTrainingPlan } from './components/MyTrainingPlan';
import { SocialMedia } from './components/SocialMedia';
import { PageNotFound } from './components/PageNotFound';
import { Test } from './components/Test';
import { Logout } from './components/Logout';


const baseUrl = "http://127.0.0.1:3005/";

function App() {

    const [userData, setUserData] = useState({});

    const loginHandler = (userData) => {
        setUserData(userData);
    };

    const logoutHandler = () => {
        setUserData({});
    };

    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetch(`${baseUrl}/users`)
    //     .then(response => response.json())  
    //     .then(result => {
    //         setUsers(result.users);
    //     })
    // }, []);

    // console.log(users);
    // if(users.length > 0){
    //     console.log(users[0].email);
    // }

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

        <UserContext.Provider value={{userData, loginHandler, logoutHandler}}>
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
                    <Route path="/myTrainingPlan" element={<MyTrainingPlan />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/socialMedia" element={<SocialMedia />} />
                    <Route path="/PageNotFound" element={<PageNotFound />} />
                    <Route path="/TestPage" element={<Test />} />
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
